
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Wand2, FileText, Layout, Palette, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WebsiteConfig } from './WebsiteBuilder';

interface PromptTemplate {
  id: string;
  name: string;
  category: 'structure' | 'content' | 'seo' | 'design';
  description: string;
  template: string;
  outputType: 'layout' | 'content' | 'meta' | 'styles';
}

interface AIPromptTemplatesProps {
  config: WebsiteConfig;
  onApplyResult: (result: any) => void;
}

const promptTemplates: PromptTemplate[] = [
  {
    id: 'blog-structure',
    name: 'Blog Structure Generator',
    category: 'structure',
    description: 'Generates complete blog layout with navigation, content areas, and sidebar',
    template: 'Create a modern blog structure for: {{siteGoals}}. Include header navigation, main content area, sidebar with categories, footer. Focus on readability and SEO.',
    outputType: 'layout'
  },
  {
    id: 'portfolio-layout',
    name: 'Portfolio Layout',
    category: 'structure',
    description: 'Creates professional portfolio structure with project showcase',
    template: 'Design a portfolio layout for: {{siteGoals}}. Include hero section, skills display, project gallery, testimonials, and contact form. Make it visually impressive.',
    outputType: 'layout'
  },
  {
    id: 'shop-structure',
    name: 'E-commerce Structure',
    category: 'structure',
    description: 'Builds complete shop layout with product catalog and checkout flow',
    template: 'Create an e-commerce structure for: {{siteGoals}}. Include product catalog, shopping cart, checkout process, user account area. Focus on conversion optimization.',
    outputType: 'layout'
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    category: 'content',
    description: 'Generates compelling copy and content based on site purpose',
    template: 'Generate engaging content for: {{siteGoals}}. Create headlines, descriptions, call-to-action buttons, and body text that converts visitors into customers.',
    outputType: 'content'
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Meta Generator',
    category: 'seo',
    description: 'Creates SEO-optimized meta tags and structured data',
    template: 'Generate SEO meta tags for: {{siteGoals}}. Include title tags, meta descriptions, Open Graph tags, Twitter cards, and structured data markup.',
    outputType: 'meta'
  },
  {
    id: 'responsive-design',
    name: 'Responsive Design System',
    category: 'design',
    description: 'Creates responsive breakpoints and mobile-first design',
    template: 'Design responsive behavior for: {{siteGoals}}. Create mobile-first approach with tablet and desktop breakpoints. Ensure touch-friendly navigation and optimized layouts.',
    outputType: 'styles'
  }
];

export const AIPromptTemplates: React.FC<AIPromptTemplatesProps> = ({
  config,
  onApplyResult
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [siteGoals, setSiteGoals] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<any[]>([]);
  const { toast } = useToast();

  const getTemplatesByCategory = (category: string) => {
    return promptTemplates.filter(t => t.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'structure': return Layout;
      case 'content': return FileText;
      case 'seo': return Search;
      case 'design': return Palette;
      default: return Brain;
    }
  };

  const generateFromTemplate = async () => {
    if (!selectedTemplate || !siteGoals.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a template and describe your site goals.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    const template = promptTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate mock results based on template type
    const mockResult = generateMockResult(template, siteGoals);
    
    setGeneratedResults(prev => [mockResult, ...prev.slice(0, 4)]);
    setIsGenerating(false);

    toast({
      title: "AI Generation Complete!",
      description: `Generated ${template.name} based on your site goals.`,
    });
  };

  const generateMockResult = (template: PromptTemplate, goals: string) => {
    const baseResult = {
      id: Date.now().toString(),
      templateName: template.name,
      outputType: template.outputType,
      goals: goals,
      timestamp: new Date(),
    };

    switch (template.outputType) {
      case 'layout':
        return {
          ...baseResult,
          result: {
            sections: ['Header with Navigation', 'Hero Section', 'Main Content Area', 'Features/Services', 'Call-to-Action', 'Footer'],
            navigation: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
            responsiveBreakpoints: ['mobile (320px)', 'tablet (768px)', 'desktop (1024px)']
          }
        };
      
      case 'content':
        return {
          ...baseResult,
          result: {
            headline: 'Transform Your Business with Professional Solutions',
            subheadline: 'We help businesses achieve their goals through innovative strategies and expert execution.',
            cta: 'Get Started Today',
            features: ['Professional Service', 'Expert Team', 'Proven Results', 'Customer Support']
          }
        };
      
      case 'meta':
        return {
          ...baseResult,
          result: {
            title: `Professional ${goals} | Your Business Name`,
            description: `Discover professional ${goals.toLowerCase()} services. Expert solutions tailored to your needs.`,
            keywords: goals.split(' ').slice(0, 5).join(', '),
            ogTitle: `Professional ${goals}`,
            ogDescription: `Transform your business with our expert ${goals.toLowerCase()} services.`
          }
        };
      
      case 'styles':
        return {
          ...baseResult,
          result: {
            colorScheme: 'Professional Blue & White',
            typography: 'Modern Sans-serif with hierarchy',
            spacing: 'Consistent 8px grid system',
            mobileFirst: 'Touch-friendly 44px minimum tap targets',
            breakpoints: 'sm: 640px, md: 768px, lg: 1024px, xl: 1280px'
          }
        };
      
      default:
        return baseResult;
    }
  };

  const applyResult = (result: any) => {
    onApplyResult(result);
    toast({
      title: "Applied Successfully!",
      description: `${result.templateName} has been applied to your website.`,
    });
  };

  const categories = ['structure', 'content', 'seo', 'design'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <CardTitle>AI Prompt Templates</CardTitle>
          </div>
          <CardDescription>
            Describe your site goals and let AI generate complete layouts, content, and optimizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Describe Your Site Goals</label>
            <Textarea
              placeholder="e.g., Create a professional photography portfolio to showcase wedding and portrait work, attract new clients, and display pricing packages..."
              value={siteGoals}
              onChange={(e) => setSiteGoals(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Select AI Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an AI template..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <div key={category}>
                    <div className="px-2 py-1 text-xs font-medium text-slate-500 uppercase">
                      {category}
                    </div>
                    {getTemplatesByCategory(category).map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center gap-2">
                          {React.createElement(getCategoryIcon(category), { className: "w-4 h-4" })}
                          <span>{template.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={generateFromTemplate}
            disabled={isGenerating || !selectedTemplate || !siteGoals.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated Results</CardTitle>
            <CardDescription>AI-generated content ready to apply</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedResults.map((result) => (
              <div key={result.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{result.templateName}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {result.outputType}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500">
                    {result.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <div className="text-sm space-y-2">
                    {result.outputType === 'layout' && (
                      <div>
                        <strong>Sections:</strong> {result.result.sections.join(' → ')}
                        <br />
                        <strong>Navigation:</strong> {result.result.navigation.join(', ')}
                      </div>
                    )}
                    {result.outputType === 'content' && (
                      <div>
                        <strong>Headline:</strong> {result.result.headline}
                        <br />
                        <strong>Features:</strong> {result.result.features.join(', ')}
                      </div>
                    )}
                    {result.outputType === 'meta' && (
                      <div>
                        <strong>Title:</strong> {result.result.title}
                        <br />
                        <strong>Description:</strong> {result.result.description}
                      </div>
                    )}
                    {result.outputType === 'styles' && (
                      <div>
                        <strong>Color Scheme:</strong> {result.result.colorScheme}
                        <br />
                        <strong>Typography:</strong> {result.result.typography}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => applyResult(result)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Apply to Website
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
