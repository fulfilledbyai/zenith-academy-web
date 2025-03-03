import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, Lightbulb, Users, Globe, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const Index = () => {
  const {
    t
  } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  const features = [{
    icon: <Lightbulb className="w-8 h-8 text-selectiveYellow" />,
    title: t('features.innovation.title'),
    description: t('features.innovation.description')
  }, {
    icon: <Users className="w-8 h-8 text-selectiveYellow" />,
    title: t('features.collaboration.title'),
    description: t('features.collaboration.description')
  }, {
    icon: <Globe className="w-8 h-8 text-selectiveYellow" />,
    title: t('features.decentralization.title'),
    description: t('features.decentralization.description')
  }, {
    icon: <GraduationCap className="w-8 h-8 text-selectiveYellow" />,
    title: t('features.excellence.title'),
    description: t('features.excellence.description')
  }];
  const results = [{
    number: '3',
    text: t('results.trainingAreas')
  }, {
    number: '1101',
    text: t('results.sessions')
  }, {
    number: '44',
    text: t('results.trainingWeeks')
  }, {
    number: '120',
    text: t('results.participantStudents')
  }, {
    number: '43',
    text: t('results.participantTeachers')
  }, {
    number: '46',
    text: t('results.participantSpecialists')
  }, {
    number: '10+',
    text: t('results.participatingCities')
  }, {
    number: '12',
    text: t('results.participatingGroups')
  }];
  return <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-jet/80 to-jet/60 z-10" />
          <img src="/lovable-uploads/d994c7b9-8c3e-4dd0-a65d-4f766ddb8bd2.png" alt="Zenith Academy Workshop" className="w-full h-full object-cover" />
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

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-rustyRed">{t('mission.title')}</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-8"></div>
            <h3 className="text-2xl font-bold mb-6">{t('mission.subtitle')}</h3>
            <p className="text-lg text-gray-700">
              {t('mission.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img alt="Zenith Academy Workshop" className="w-full h-auto" src="/lovable-uploads/1831b9bd-c51f-4953-983b-b0d48858eb81.jpg" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('hero.title')}</h2>
              <div className="h-1 w-20 bg-rustyRed mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                {t('foundation.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-rustyRed">{t('results.title')}</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold mb-8">{t('results.subtitle')}</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {results.slice(0, 4).map((result, index) => <div key={index} className="text-center">
                <div className="text-6xl font-bold text-jet mb-4">{result.number}</div>
                <div className="text-gray-600">{result.text}</div>
              </div>)}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {results.slice(4, 8).map((result, index) => <div key={index} className="text-center">
                <div className="text-6xl font-bold text-jet mb-4">{result.number}</div>
                <div className="text-gray-600">{result.text}</div>
              </div>)}
          </div>
          
          <div className="mt-16">
            <img src="/lovable-uploads/c159a039-2cc2-4d5e-bae1-a11a4b9f530e.png" alt="Zenith Academy Workshop" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('features.title')}</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rustyRed to-[#e6453d] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t('features.cta.title')}</h2>
            <p className="text-lg mb-8">
              {t('features.cta.description')}
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
    </Layout>;
};
export default Index;