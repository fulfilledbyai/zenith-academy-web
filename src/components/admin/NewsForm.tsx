
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// News item type definition
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const NewsForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing news items from Supabase
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching news:', error);
          toast.error('Failed to load news items');
          return;
        }

        // Transform the data to match our NewsItem interface
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          content: item.content,
          image: item.image
        }));

        setNewsItems(transformedData);
      } catch (error) {
        console.error('Error in news fetch operation:', error);
        toast.error('An unexpected error occurred while loading news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the news item data
      const newNewsItem = {
        title,
        excerpt,
        content,
        image: image || '/lovable-uploads/1e472e40-846a-472b-a0b0-f4803003342c.png', // Default image if none provided
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('news')
        .insert([newNewsItem])
        .select();

      if (error) {
        console.error('Error adding news item:', error);
        toast.error('Failed to publish news item');
        return;
      }

      // Add the new item to the state with the returned ID
      const insertedItem = {
        ...newNewsItem,
        id: data[0].id,
      };
      setNewsItems([insertedItem, ...newsItems]);

      // Show success message
      toast.success('News item published successfully!');
      
      // Reset form
      setTitle('');
      setExcerpt('');
      setContent('');
      setImage('');
    } catch (error) {
      console.error('Error in news publish operation:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        const { error } = await supabase
          .from('news')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting news item:', error);
          toast.error('Failed to delete news item');
          return;
        }

        // Update state after successful deletion
        const updatedNews = newsItems.filter(item => item.id !== id);
        setNewsItems(updatedNews);
        toast.success('News item deleted successfully!');
      } catch (error) {
        console.error('Error in news delete operation:', error);
        toast.error('An unexpected error occurred during deletion');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Add New Article</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter news title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              placeholder="A short summary of the news"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Full news content"
              className="min-h-[200px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL to news image (optional)"
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
                  Publishing...
                </>
              ) : (
                'Publish News'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/news')}
            >
              View All News
            </Button>
          </div>
        </form>
      </div>

      {/* Existing News Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Manage Existing News</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : newsItems.length === 0 ? (
          <p className="text-gray-500">No news items have been published yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm line-clamp-2">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
