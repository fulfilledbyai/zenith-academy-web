import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import { NewsItem } from '@/components/admin/NewsForm';

const News = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  useEffect(() => {
    // Load news from localStorage
    const storedNews = JSON.parse(localStorage.getItem('newsItems') || '[]') as NewsItem[];
    
    // If no stored news, use sample data
    if (storedNews.length === 0) {
      const sampleNews = [
        {
          id: 1,
          title: 'Zenith Academy Opens New Technology Lab',
          date: '2023-09-15',
          excerpt: 'State-of-the-art technology lab opens at Zenith Academy to enhance practical learning experiences.',
          content: 'Zenith Academy is proud to announce the opening of our new state-of-the-art technology lab. This facility will provide students with hands-on experience using the latest industry-standard equipment and software. The lab includes workstations for programming, robotics, and digital design, creating an immersive learning environment that bridges theory and practice.',
          image: '/lovable-uploads/5305dc3b-db2d-4092-94f2-1d130a2fbb6d.png'
        },
        {
          id: 2,
          title: 'Partnership with Leading Tech Companies Announced',
          date: '2023-08-20',
          excerpt: 'Zenith Academy partners with industry leaders to provide students with real-world experience and internship opportunities.',
          content: 'We are excited to announce new partnerships with several leading technology companies. These collaborations will create internship opportunities, mentorship programs, and industry projects for our students. By working directly with professionals in the field, students will gain valuable insights and experience that will prepare them for successful careers.',
          image: '/lovable-uploads/4b61e9de-629a-4447-95f2-899612acfe0b.png'
        },
        {
          id: 3,
          title: 'New Courses Launching Next Semester',
          date: '2023-07-10',
          excerpt: 'Exciting new courses in artificial intelligence, cybersecurity, and digital marketing will be available starting next semester.',
          content: 'Starting next semester, Zenith Academy will offer new courses in artificial intelligence, cybersecurity, and digital marketing. These additions to our curriculum reflect the evolving demands of the technology sector and will equip students with skills that are increasingly sought after by employers. Registration opens next month, and spaces are limited.',
          image: '/lovable-uploads/1e472e40-846a-472b-a0b0-f4803003342c.png'
        }
      ];
      setNewsItems(sampleNews);
    } else {
      // Sort news by date (newest first)
      setNewsItems(storedNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, []);

  // If we have an ID parameter, show the single news article
  if (id) {
    const newsItem = newsItems.find(item => item.id === parseInt(id)) || newsItems[0];
    
    if (!newsItem) return <div>Loading...</div>;
    
    return (
      <Layout>
        <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Button asChild variant="ghost" className="text-white mb-4 hover:bg-white/10">
                <Link to="/news">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all news
                </Link>
              </Button>
              <h1 className="text-4xl font-bold mb-6">{newsItem.title}</h1>
              <div className="flex items-center text-sm mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <time dateTime={newsItem.date}>
                  {new Date(newsItem.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-whiteSmoke">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              <div className="mb-10">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title} 
                  className="w-full h-auto rounded-lg shadow-md mb-8"
                />
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl font-medium mb-6">{newsItem.excerpt}</p>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {newsItem.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Otherwise, show the news listing
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
    </Layout>
  );
};

export default News;
