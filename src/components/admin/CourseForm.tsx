
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Course type definition
export interface Course {
  id: string;
  title: string;
  type: 'individual' | 'organization' | 'teachers' | 'students';
  description: string;
  duration: string;
  price: string;
  image: string;
  language: string;
  startDate: string;
}

export const CourseForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'individual' | 'organization' | 'teachers' | 'students'>('individual');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [language, setLanguage] = useState('');
  const [startDate, setStartDate] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the course data
      const newCourse = {
        title,
        type,
        description,
        duration,
        price,
        image: image || '/lovable-uploads/7128a31c-f6a6-4d35-aeb6-fea616052924.png', // Default image if none provided
        language,
        start_date: startDate
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
        ...newCourse,
        id: data[0].id,
        startDate: data[0].start_date
      };

      setCourses([insertedCourse, ...courses]);

      // Show success message
      toast.success('Course added successfully!');
      
      // Reset form
      setTitle('');
      setType('individual');
      setDescription('');
      setDuration('');
      setPrice('');
      setImage('');
      setLanguage('');
      setStartDate('');
    } catch (error) {
      console.error('Error in course add operation:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Add New Course</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter course title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Course Type</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as 'individual' | 'organization' | 'teachers' | 'students')}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select course type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">For Individuals</SelectItem>
                <SelectItem value="organization">For Organizations</SelectItem>
                <SelectItem value="teachers">For Technical College Teachers</SelectItem>
                <SelectItem value="students">For Technical College Students</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Course description"
              className="min-h-[150px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="e.g., 8 weeks"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="e.g., 125,000 AMD"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                placeholder="e.g., Armenian, English"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL to course image (optional)"
            />
            <p className="text-sm text-gray-500">
              Leave empty to use default image. For production, you would upload images via a file upload system.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : 'Add Course'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/courses')}
            >
              View All Courses
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Courses Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Manage Existing Courses</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses have been added yet.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};
