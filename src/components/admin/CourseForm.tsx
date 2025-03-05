import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { CourseFormFields } from './CourseFormFields';
import { CourseList } from './CourseList';
import { Course, CourseFormData } from './types';

export const CourseForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching courses:', error);
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
        toast.error('An unexpected error occurred while loading courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (formData: CourseFormData) => {
    setIsSubmitting(true);

    try {
      // Prepare the course data
      const newCourse = {
        title: formData.title,
        type: formData.type,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        image: formData.image || '/lovable-uploads/7128a31c-f6a6-4d35-aeb6-fea616052924.png', // Default image if none provided
        language: formData.language,
        start_date: formData.startDate
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('courses')
        .insert([newCourse])
        .select();

      if (error) {
        console.error('Error adding course:', error);
        toast.error('Failed to add course');
        return;
      }

      // Add the new item to the state with the returned ID
      const insertedCourse = {
        ...formData,
        id: data[0].id,
        image: data[0].image,
        startDate: data[0].start_date
      };

      setCourses([insertedCourse, ...courses]);

      // Show success message
      toast.success('Course added successfully!');
    } catch (error) {
      console.error('Error in course add operation:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Add New Course</h2>
        <CourseFormFields onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      {/* Existing Courses Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Manage Existing Courses</h2>
        <CourseList courses={courses} setCourses={setCourses} isLoading={isLoading} />
      </div>
    </div>
  );
};
