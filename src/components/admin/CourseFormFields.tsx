
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseFormData } from './types';

interface CourseFormFieldsProps {
  onSubmit: (formData: CourseFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const CourseFormFields: React.FC<CourseFormFieldsProps> = ({ onSubmit, isSubmitting }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'individual' | 'organization' | 'teachers' | 'students'>('individual');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [language, setLanguage] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: CourseFormData = {
      title,
      type,
      description,
      duration,
      price,
      image,
      language,
      startDate
    };

    await onSubmit(formData);
    
    // Reset form
    setTitle('');
    setType('individual');
    setDescription('');
    setDuration('');
    setPrice('');
    setImage('');
    setLanguage('');
    setStartDate('');
  };

  return (
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
  );
};
