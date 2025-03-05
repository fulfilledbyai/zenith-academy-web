
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Library, School, GraduationCap, ChevronRight, Calendar, Clock, CreditCard, Languages, Loader2 } from 'lucide-react';
import { Course } from '@/components/admin/CourseForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Courses = () => {
  const { t } = useLanguage();
  const { type } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define course categories
  const courseCategories = [
    {
      id: 'individual',
      title: t('courses.individual'),
      description: t('courses.individuals.description'),
      icon: <Users className="w-10 h-10 text-rustyRed" />,
      path: '/courses/individual'
    },
    {
      id: 'organization',
      title: t('courses.organization'),
      description: t('courses.organizations.description'),
      icon: <Library className="w-10 h-10 text-rustyRed" />,
      path: '/courses/organization'
    },
    {
      id: 'teachers',
      title: t('courses.teachers'),
      description: t('courses.teachers.description'),
      icon: <School className="w-10 h-10 text-rustyRed" />,
      path: '/courses/teachers'
    },
    {
      id: 'students',
      title: t('courses.students'),
      description: t('courses.students.description'),
      icon: <GraduationCap className="w-10 h-10 text-rustyRed" />,
      path: '/courses/students'
    }
  ];

  // Load courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let query = supabase.from('courses').select('*');
        
        // If type parameter is present, filter by course type
        if (type) {
          query = query.eq('type', type);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching courses:', error);
          setError('Failed to load courses');
          toast.error('Failed to load courses');
          return;
        }
        
        // Transform the data to match our Course interface
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type as 'individual' | 'organization' | 'teachers' | 'students',
          description: item.description,
          duration: item.duration,
          price: item.price,
          image: item.image,
          language: item.language,
          startDate: item.start_date
        }));
        
        setCourses(transformedData);
      } catch (error) {
        console.error('Error in courses fetch operation:', error);
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred while loading courses');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [type]);

  // Get type label for display
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'individual': return t('courses.individual');
      case 'organization': return t('courses.organization');
      case 'teachers': return t('courses.teachers');
      case 'students': return t('courses.students');
      default: return type;
    }
  };

  // Get icon for course type
  const getTypeIcon = (courseType: string) => {
    switch(courseType) {
      case 'individual': return <Users className="w-6 h-6 text-rustyRed" />;
      case 'organization': return <Library className="w-6 h-6 text-rustyRed" />;
      case 'teachers': return <School className="w-6 h-6 text-rustyRed" />;
      case 'students': return <GraduationCap className="w-6 h-6 text-rustyRed" />;
      default: return <Users className="w-6 h-6 text-rustyRed" />;
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-rustyRed to-[#e6453d] py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">
              {type ? getTypeLabel(type) : t('courses.header.title')}
            </h1>
            <p className="text-xl">
              {t('courses.header.description')}
            </p>
          </div>
        </div>
      </section>

      {!type ? (
        // Display course categories if no type is selected
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
                        {t('courses.viewCourses')}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // Display courses for the selected type
        <section className="py-16 bg-whiteSmoke">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Button asChild variant="outline">
                <Link to="/courses">
                  {t('courses.backToCategories')}
                </Link>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Courses</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">{t('courses.noCourses')}</h2>
                <p className="text-gray-600 mb-8">{t('courses.comingSoon')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start mb-2">
                        {getTypeIcon(course.type)}
                        <CardTitle className="text-xl ml-2">{course.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grow">
                      <CardDescription className="text-base text-gray-600 mb-4">
                        {course.description.length > 150 
                          ? `${course.description.substring(0, 150)}...` 
                          : course.description}
                      </CardDescription>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-rustyRed" />
                          <span><strong>{t('courses.duration')}:</strong> {course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2 text-rustyRed" />
                          <span><strong>{t('courses.price')}:</strong> {course.price}</span>
                        </div>
                        <div className="flex items-center">
                          <Languages className="w-4 h-4 mr-2 text-rustyRed" />
                          <span><strong>{t('courses.language')}:</strong> {course.language}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-rustyRed" />
                          <span><strong>{t('courses.startDate')}:</strong> {new Date(course.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4 mt-auto">
                      <Button className="w-full">
                        {t('courses.applyNow')}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Courses;
