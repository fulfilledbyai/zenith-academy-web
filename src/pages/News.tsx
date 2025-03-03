
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight } from 'lucide-react';

const News = () => {
  const { t } = useLanguage();

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'Zenith Academy Opens New Technology Lab',
      date: '2023-09-15',
      excerpt: 'State-of-the-art technology lab opens at Zenith Academy to enhance practical learning experiences.',
      image: '/lovable-uploads/5305dc3b-db2d-4092-94f2-1d130a2fbb6d.png'
    },
    {
      id: 2,
      title: 'Partnership with Leading Tech Companies Announced',
      date: '2023-08-20',
      excerpt: 'Zenith Academy partners with industry leaders to provide students with real-world experience and internship opportunities.',
      image: '/lovable-uploads/4b61e9de-629a-4447-95f2-899612acfe0b.png'
    },
    {
      id: 3,
      title: 'New Courses Launching Next Semester',
      date: '2023-07-10',
      excerpt: 'Exciting new courses in artificial intelligence, cybersecurity, and digital marketing will be available starting next semester.',
      image: '/lovable-uploads/1e472e40-846a-472b-a0b0-f4803003342c.png'
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{t('nav.news')}</h1>
            <p className="text-xl">
              Stay updated with the latest developments, events, and announcements from Zenith Academy.
            </p>
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-16 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {item.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4">
                  <Button asChild variant="link" className="px-0 text-rustyRed">
                    <Link to={`/news/${item.id}`}>
                      Read more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content will be added later */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-lg text-gray-600 mb-8">
            {t('placeholder.content')}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default News;
