
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Library, School, GraduationCap, ChevronRight } from 'lucide-react';

const Courses = () => {
  const { t } = useLanguage();

  const courseCategories = [
    {
      id: 'individuals',
      title: t('courses.individual'),
      description: 'Courses tailored for individual learners looking to enhance their technological skills.',
      icon: <Users className="w-10 h-10 text-rustyRed" />,
      path: '/courses/individuals'
    },
    {
      id: 'organizations',
      title: t('courses.organization'),
      description: 'Specialized programs for organizations to upskill their workforce and improve technological capabilities.',
      icon: <Library className="w-10 h-10 text-rustyRed" />,
      path: '/courses/organizations'
    },
    {
      id: 'teachers',
      title: t('courses.teachers'),
      description: 'Professional development courses for technical college teachers to enhance teaching methodologies.',
      icon: <School className="w-10 h-10 text-rustyRed" />,
      path: '/courses/teachers'
    },
    {
      id: 'students',
      title: t('courses.students'),
      description: 'Supplementary courses for technical college students to gain practical skills and knowledge.',
      icon: <GraduationCap className="w-10 h-10 text-rustyRed" />,
      path: '/courses/students'
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{t('nav.courses')}</h1>
            <p className="text-xl">
              Discover our comprehensive range of technological education programs designed to meet the needs of different learners.
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-whiteSmoke">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courseCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="bg-jet/5 pb-4">
                  <div className="mb-2">{category.icon}</div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4">
                  <Button asChild variant="outline" className="text-rustyRed border-rustyRed hover:bg-rustyRed/10">
                    <Link to={category.path}>
                      View Courses
                      <ChevronRight className="ml-2 h-4 w-4" />
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

export default Courses;
