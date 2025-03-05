
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
    console.log("Contact form request received");
    const { name, email, subject, message }: ContactFormData = await req.json();
    console.log("Form data received:", { name, email, subject, messageLength: message?.length });
    console.log("User email for confirmation:", email);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name, email, subject, messagePresent: !!message });
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

    console.log("Form data saved to database successfully");
    
    // First, attempt to send the admin email
    console.log("Attempting to send admin email notification");
    let adminEmailResult;
    try {
      adminEmailResult = await resend.emails.send({
        from: "Zenith Academy <onboarding@resend.dev>",
        to: "cft.faaralp@gmail.com",
        subject: `New Contact Form: ${subject}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
      console.log("Admin email sent successfully:", adminEmailResult);
    } catch (adminError) {
      console.error("Admin email sending failed:", adminError);
      adminEmailResult = { error: adminError };
    }
    
    // Now, attempt to send the user confirmation email
    // Adding a small delay to ensure rate limits aren't hit
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log(`Attempting to send confirmation email to user: ${email}`);
    let userEmailResult;
    try {
      userEmailResult = await resend.emails.send({
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
      console.log("User confirmation email sent successfully:", userEmailResult);
    } catch (userError) {
      console.error("User email sending failed with error:", userError);
      console.error("Error details:", JSON.stringify(userError, null, 2));
      userEmailResult = { error: userError };
    }

    // Form was successfully submitted to database, determine email status
    const response = {
      success: true,
      database: { success: true },
      adminEmail: adminEmailResult?.error ? { success: false, error: adminEmailResult.error } : { success: true },
      userEmail: userEmailResult?.error ? { success: false, error: userEmailResult.error } : { success: true },
      message: "Form submitted successfully"
    };

    // Add warnings if any emails failed
    if (adminEmailResult?.error || userEmailResult?.error) {
      response.message += ", but there were issues with email delivery";
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Unexpected error in contact-form function:", error);
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
