import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.toast.success'),
      description: t('contact.toast.description'),
      duration: 5000,
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{t('contact.header.title')}</h1>
            <p className="text-xl">
              {t('contact.header.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-whiteSmoke p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-rustyRed rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contact.visit')}</h3>
              <p className="text-gray-600">
                Yerevan, Armenia<br />
                {t('contact.mainCampus')}
              </p>
            </div>
            
            <div className="bg-whiteSmoke p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-rustyRed rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contact.call')}</h3>
              <p className="text-gray-600">
                +374 10 123456<br />
                {t('contact.workingHours')}
              </p>
            </div>
            
            <div className="bg-whiteSmoke p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-rustyRed rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contact.email')}</h3>
              <p className="text-gray-600">
                info@zenith.am<br />
                support@zenith.am
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('contact.form.title')}</h2>
              <div className="h-1 w-20 bg-rustyRed mb-6"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input id="name" placeholder={t('contact.form.namePlaceholder')} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input id="email" type="email" placeholder={t('contact.form.emailPlaceholder')} required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                  <Input id="subject" placeholder={t('contact.form.subjectPlaceholder')} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={t('contact.form.messagePlaceholder')} 
                    className="min-h-[150px]" 
                    required 
                  />
                </div>
                
                <Button type="submit" className="bg-rustyRed hover:bg-rustyRed/90 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  {t('contact.form.send')}
                </Button>
              </form>
            </div>
            
            {/* Map */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194725.59666369032!2d44.359036268845694!3d40.15319331982346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2sus!4v1654321234567!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Zenith Academy Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
