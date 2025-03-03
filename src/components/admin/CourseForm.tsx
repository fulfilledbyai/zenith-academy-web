
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

// Course type definition
export interface Course {
  id: number;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get existing courses from localStorage or initialize with empty array
    const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]') as Course[];
    
    // Create new course item
    const newCourse: Course = {
      id: Date.now(), // Simple ID generation based on timestamp
      title,
      type,
      description,
      duration,
      price,
      image: image || '/lovable-uploads/7128a31c-f6a6-4d35-aeb6-fea616052924.png', // Default image if none provided
      language,
      startDate
    };

    // Add to existing courses and save back to localStorage
    const updatedCourses = [...existingCourses, newCourse];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));

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
    setIsSubmitting(false);
  };

  return (
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
            {isSubmitting ? 'Adding...' : 'Add Course'}
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
  );
};
