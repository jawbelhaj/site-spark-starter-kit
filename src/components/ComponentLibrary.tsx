
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Layout, 
  Type, 
  Image, 
  Video, 
  MapPin, 
  Star, 
  Users, 
  Calendar,
  Search,
  Plus,
  Grid3X3
} from 'lucide-react';

interface Component {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  preview: string;
  code: string;
}

const componentLibrary: Component[] = [
  {
    id: 'hero-banner',
    name: 'Hero Banner',
    category: 'Headers',
    icon: Layout,
    description: 'Eye-catching header with title and CTA',
    preview: 'Large banner with headline and button',
    code: '<section class="hero">...</section>'
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    category: 'Content',
    icon: Grid3X3,
    description: 'Grid layout for showcasing features',
    preview: '3-column feature showcase',
    code: '<div class="feature-grid">...</div>'
  },
  {
    id: 'testimonial-card',
    name: 'Testimonial',
    category: 'Social',
    icon: Star,
    description: 'Customer testimonial with rating',
    preview: 'Quote with customer photo and stars',
    code: '<div class="testimonial">...</div>'
  },
  {
    id: 'team-member',
    name: 'Team Member',
    category: 'About',
    icon: Users,
    description: 'Team member profile card',
    preview: 'Photo with name and role',
    code: '<div class="team-member">...</div>'
  },
  {
    id: 'blog-card',
    name: 'Blog Card',
    category: 'Content',
    icon: Type,
    description: 'Article preview with image',
    preview: 'Image, title, excerpt, and date',
    code: '<article class="blog-card">...</article>'
  },
  {
    id: 'gallery-item',
    name: 'Gallery Item',
    category: 'Media',
    icon: Image,
    description: 'Image with overlay and caption',
    preview: 'Image with hover overlay',
    code: '<div class="gallery-item">...</div>'
  },
  {
    id: 'video-embed',
    name: 'Video Player',
    category: 'Media',
    icon: Video,
    description: 'Responsive video embed',
    preview: 'Video player with controls',
    code: '<div class="video-container">...</div>'
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    category: 'Forms',
    icon: MapPin,
    description: 'Contact form with validation',
    preview: 'Form with name, email, message fields',
    code: '<form class="contact-form">...</form>'
  },
  {
    id: 'event-card',
    name: 'Event Card',
    category: 'Content',
    icon: Calendar,
    description: 'Event listing with date and details',
    preview: 'Date, title, location, and RSVP',
    code: '<div class="event-card">...</div>'
  }
];

const categories = ['All', 'Headers', 'Content', 'Social', 'About', 'Media', 'Forms'];

export const ComponentLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);

  const filteredComponents = componentLibrary.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDragStart = (component: Component) => {
    setDraggedComponent(component);
  };

  const handleDragEnd = () => {
    setDraggedComponent(null);
  };

  const addComponent = (component: Component) => {
    console.log('Adding component:', component.name);
    // This would integrate with the main builder to add the component
  };

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Component Library
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Drag and drop components to build your website
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Components Grid */}
      <div className="space-y-3">
        {filteredComponents.map((component) => {
          const IconComponent = component.icon;
          return (
            <Card
              key={component.id}
              className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
              draggable
              onDragStart={() => handleDragStart(component)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{component.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {component.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addComponent(component)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs mb-2">
                  {component.description}
                </CardDescription>
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-xs text-slate-600 dark:text-slate-400">
                  Preview: {component.preview}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No components found</p>
          <p className="text-sm text-slate-500">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Drag Indicator */}
      {draggedComponent && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 pointer-events-none">
          Dragging: {draggedComponent.name}
        </div>
      )}
    </div>
  );
};
