
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Course } from './types';

interface CourseListProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  isLoading: boolean;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, setCourses, isLoading }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting course:', error);
          toast.error('Failed to delete course');
          return;
        }

        // Update state after successful deletion
        const updatedCourses = courses.filter(course => course.id !== id);
        setCourses(updatedCourses);
        toast.success('Course deleted successfully!');
      } catch (error) {
        console.error('Error in course delete operation:', error);
        toast.error('An unexpected error occurred during deletion');
      }
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'individual': return 'For Individuals';
      case 'organization': return 'For Organizations';
      case 'teachers': return 'For Technical College Teachers';
      case 'students': return 'For Technical College Students';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (courses.length === 0) {
    return <p className="text-gray-500">No courses have been added yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full inline-block mt-1">
                  {getTypeLabel(course.type)}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(course.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
              <div>
                <strong>Duration:</strong> {course.duration}
              </div>
              <div>
                <strong>Price:</strong> {course.price}
              </div>
              <div>
                <strong>Language:</strong> {course.language}
              </div>
              <div>
                <strong>Start Date:</strong> {course.startDate}
              </div>
            </div>
            <p className="text-sm line-clamp-2">{course.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
