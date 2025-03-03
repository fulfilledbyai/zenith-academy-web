import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
const About = () => {
  const {
    t
  } = useLanguage();
  const {
    section
  } = useParams();
  if (section === 'foundation') {
    return <Layout>
        <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">{t('about.foundation')}</h1>
              <p className="text-xl">
                Learn about the TOUK-FAARALP Educational Foundation and its mission.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="/lovable-uploads/7128a31c-f6a6-4d35-aeb6-fea616052924.png" alt="Foundation Team" className="w-full h-auto" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">ՏՈՒԿ-ՖԱԱՌԱԼՊ</h2>
                <div className="h-1 w-20 bg-rustyRed mb-6"></div>
                <p className="text-lg text-gray-700 mb-6">
                  {t('foundation.description')}
                </p>
                <Button asChild className="mt-4 bg-rustyRed hover:bg-rustyRed/90 text-white">
                  <Link to="/about">
                    Back to About
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>;
  }
  if (section === 'sevan-center') {
    return <Layout>
        <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">{t('about.sevan')}</h1>
              <p className="text-xl">
                Learn about our educational center in Sevan, Armenia.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-lg text-gray-600 mb-8">
              {t('placeholder.content')}
            </p>
            <Button asChild className="mt-4 bg-rustyRed hover:bg-rustyRed/90 text-white">
              <Link to="/about">
                Back to About
              </Link>
            </Button>
          </div>
        </section>
      </Layout>;
  }
  return <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{t('nav.about')}</h1>
            <p className="text-xl">
              Learn about Zenith Academy, our mission, vision, and the values that drive our educational approach.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="h-1 w-20 bg-rustyRed mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                {t('hero.description')}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {t('foundation.description')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-rustyRed hover:bg-rustyRed/90 text-white">
                  <Link to="/about/foundation">
                    {t('about.foundation')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-rustyRed text-rustyRed hover:bg-rustyRed/10">
                  <Link to="/about/sevan-center">
                    {t('about.sevan')}
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/lovable-uploads/497177b0-e165-4f19-b583-d86e735ac178.png" alt="Zenith Academy Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  
                  <p className="text-white text-lg">Մեր պատմությունը</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              The core principles that guide our educational approach and institutional development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-selectiveYellow/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-selectiveYellow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" fill="currentColor" />
                  <path d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="currentColor" />
                  <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Embracing new technologies and teaching methodologies to provide cutting-edge education.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-rustyRed/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-rustyRed" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z" fill="currentColor" />
                  <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="white" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Committing to the highest standards of education and institutional performance.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-jet/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-jet" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" fill="currentColor" />
                  <path d="M21 12C21 13.6569 19.6569 15 18 15C16.3431 15 15 13.6569 15 12C15 10.3431 16.3431 9 18 9C19.6569 9 21 10.3431 21 12Z" fill="currentColor" />
                  <path d="M9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Working together across borders and disciplines to achieve educational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-rustyRed">{t('team.title')}</h2>
            <div className="h-1 w-20 bg-rustyRed mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.hayk')} className="w-full h-full object-cover" src="/lovable-uploads/5c72cd4e-edbc-4fe4-97ed-9ecf3dcd038a.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.hayk')}</h3>
              <p className="text-gray-600">{t('team.haykRole')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.hasmik')} src="/lovable-uploads/8c22979c-31db-48b2-82d2-368083d08ad6.jpg" className="w-full h-full object-cover object-top transform " />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.hasmik')}</h3>
              <p className="text-gray-600">{t('team.hasmikRole')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.hagop')} className="w-full h-full object-cover" src="/lovable-uploads/3a48826d-51eb-4a54-9afd-c9010f31f38c.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.hagop')}</h3>
              <p className="text-gray-600">{t('team.hagopRole')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.varadzak')} className="w-full h-full object-cover" src="/lovable-uploads/d537dbe2-c852-435b-9dc1-e92241ee247f.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.varadzak')}</h3>
              <p className="text-gray-600">{t('team.varadzakRole')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.anna')} className="w-full h-full object-cover" src="/lovable-uploads/f6d70ce0-f3d1-4815-b61c-a2adde97cd74.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.anna')}</h3>
              <p className="text-gray-600">{t('team.annaRole')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.mariam')} className="w-full h-full object-cover" src="/lovable-uploads/5781803c-4f60-46fa-99af-d0baead98059.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.mariam')}</h3>
              <p className="text-gray-600">{t('team.mariamRole')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-white shadow-md">
                <img alt={t('team.ashot')} className="w-full h-full object-cover" src="/lovable-uploads/2aa4cbe0-74bb-4dd0-a3b2-af2e6b361c60.jpg" />
              </div>
              <h3 className="text-xl font-bold mb-1">{t('team.ashot')}</h3>
              <p className="text-gray-600">{t('team.ashotRole')}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default About;