
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, Lightbulb, Users, Globe, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8 text-selectiveYellow" />,
      title: 'Innovation',
      description: 'Cutting-edge technological education and innovative teaching methods'
    },
    {
      icon: <Users className="w-8 h-8 text-selectiveYellow" />,
      title: 'Collaboration',
      description: 'French-Armenian collaboration bringing international expertise'
    },
    {
      icon: <Globe className="w-8 h-8 text-selectiveYellow" />,
      title: 'Decentralization',
      description: 'Promoting decentralized development of education across Armenia'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-selectiveYellow" />,
      title: 'Excellence',
      description: 'Education aligned with the best international standards'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-jet/80 to-jet/60 z-10" />
          <img 
            src="/lovable-uploads/0217fc63-2f37-4a2e-9ff1-4a2e23908b96.png" 
            alt="Zenith Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-3xl">
            <div className={cn("space-y-6", isVisible ? "animate-slide-up" : "opacity-0")}>
              <div className="inline-block bg-rustyRed text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                {t('hero.subtitle')}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-200 md:pr-12">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-rustyRed hover:bg-rustyRed/90 text-white">
                  <Link to="/about">
                    {t('cta.learn')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Link to="/courses">
                    {t('cta.courses')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('hero.title')}</h2>
              <div className="h-1 w-20 bg-rustyRed mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                {t('foundation.description')}
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/7128a31c-f6a6-4d35-aeb6-fea616052924.png" 
                alt="Zenith Academy Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Zenith Academy</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Established through the collaboration between Armenian and French educational experts,
              our academy provides cutting-edge technological education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rustyRed to-[#e6453d] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg mb-8">
              Explore our courses and take the first step towards a brighter future with Zenith Academy.
            </p>
            <Button asChild size="lg" className="bg-white text-rustyRed hover:bg-gray-100">
              <Link to="/courses">
                {t('cta.courses')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
