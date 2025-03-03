
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

// News item type definition
export interface NewsItem {
  id: number;
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

  // Load existing news items - but skip placeholder news
  useEffect(() => {
    let loadedNews = JSON.parse(localStorage.getItem('newsItems') || '[]') as NewsItem[];
    
    // Filter out placeholder news items (they have IDs 1, 2, 3)
    loadedNews = loadedNews.filter(item => item.id > 3);
    
    // Save the filtered list back to localStorage
    localStorage.setItem('newsItems', JSON.stringify(loadedNews));
    setNewsItems(loadedNews);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get existing news from localStorage or initialize with empty array
    const existingNews = JSON.parse(localStorage.getItem('newsItems') || '[]') as NewsItem[];
    
    // Create new news item
    const newNewsItem: NewsItem = {
      id: Date.now(), // Simple ID generation based on timestamp
      title,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      excerpt,
      content,
      image: image || '/lovable-uploads/1e472e40-846a-472b-a0b0-f4803003342c.png', // Default image if none provided
    };

    // Add to existing news and save back to localStorage
    const updatedNews = [...existingNews, newNewsItem];
    localStorage.setItem('newsItems', JSON.stringify(updatedNews));
    setNewsItems(updatedNews);

    // Show success message
    toast.success('News item published successfully!');
    
    // Reset form
    setTitle('');
    setExcerpt('');
    setContent('');
    setImage('');
    setIsSubmitting(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      const updatedNews = newsItems.filter(item => item.id !== id);
      localStorage.setItem('newsItems', JSON.stringify(updatedNews));
      setNewsItems(updatedNews);
      toast.success('News item deleted successfully!');
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
              {isSubmitting ? 'Publishing...' : 'Publish News'}
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
        
        {newsItems.length === 0 ? (
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
