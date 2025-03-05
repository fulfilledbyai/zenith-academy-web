
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://duzsujebnuoasjqgybua.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Store submission in database
    const { data: submissionData, error: submissionError } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, subject, message }])
      .select();

    if (submissionError) {
      console.error("Database submission error:", submissionError);
      return new Response(
        JSON.stringify({ error: "Failed to store submission" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create an array to store email sending promises
    const emailPromises = [];
    let emailErrors = [];

    try {
      // Send notification email to admin
      const adminEmailPromise = resend.emails.send({
        from: "Zenith Academy <onboarding@resend.dev>",
        to: "cft.faaralp@gmail.com", // Changed from info@zenithacademy.am to cft.faaralp@gmail.com
        subject: `New Contact Form: ${subject}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
      emailPromises.push(adminEmailPromise);

      // Send confirmation email to the user
      const userEmailPromise = resend.emails.send({
        from: "Zenith Academy <onboarding@resend.dev>",
        to: email,
        subject: "Thank you for contacting Zenith Academy",
        html: `
          <h1>Thank you for contacting Zenith Academy!</h1>
          <p>Dear ${name},</p>
          <p>We have received your message regarding "${subject}". Our team will review it and get back to you as soon as possible.</p>
          <p>Thank you for your interest in Zenith Academy.</p>
          <p>Best Regards,<br>The Zenith Academy Team</p>
        `,
      });
      emailPromises.push(userEmailPromise);

      // Await all email sending promises
      const emailResults = await Promise.allSettled(emailPromises);
      
      // Check for errors in email sending
      emailResults.forEach((result, index) => {
        if (result.status === 'rejected') {
          emailErrors.push(`Email ${index === 0 ? 'to admin' : 'to user'} failed: ${result.reason}`);
        } else {
          console.log(`Email ${index === 0 ? 'to admin' : 'to user'} sent successfully:`, result.value);
        }
      });
      
      // If any emails failed, log the errors but still consider the submission successful
      if (emailErrors.length > 0) {
        console.error("Email sending errors:", emailErrors);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      emailErrors.push(emailError.message || "Unknown email error");
    }

    // Return appropriate response
    if (emailErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: true,
          warning: "Contact form submitted but there were issues with email notifications",
          emailErrors: emailErrors,
          message: "Form submitted successfully but email notification had issues"
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Form submitted successfully and notifications sent"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error in contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
