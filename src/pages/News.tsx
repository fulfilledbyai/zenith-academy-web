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
    
    // Sort news by date (newest first)
    setNewsItems(storedNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  // If we have an ID parameter, show the single news article
  if (id) {
    const newsItem = newsItems.find(item => item.id === parseInt(id));
    
    if (!newsItem) return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">News article not found</h2>
          <Button asChild variant="default">
            <Link to="/news">Back to all news</Link>
          </Button>
        </div>
      </Layout>
    );
    
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
              {t('news.description')}
            </p>
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-16 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          {newsItems.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">{t('news.empty')}</h2>
              <p className="text-gray-600 mb-8">{t('news.comingSoon')}</p>
            </div>
          ) : (
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
                        {t('news.readMore')}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
