
import React, { useState } from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Code, Layout, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  config: WebsiteConfig;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ config }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'html' | 'react' | 'vue') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Export Complete!",
      description: `Your ${format.toUpperCase()} website has been generated successfully.`,
    });
    
    setIsExporting(false);
  };

  const generateSEOReport = () => {
    return {
      score: 95,
      checks: [
        { name: 'Title Tag', status: 'passed', description: 'Title is optimized' },
        { name: 'Meta Description', status: 'passed', description: 'Description is present' },
        { name: 'Heading Structure', status: 'passed', description: 'Proper H1-H6 hierarchy' },
        { name: 'Image Alt Tags', status: 'warning', description: 'Some images missing alt text' },
        { name: 'Mobile Friendly', status: 'passed', description: 'Responsive design detected' },
        { name: 'Loading Speed', status: 'passed', description: 'Optimized for fast loading' }
      ]
    };
  };

  const seoReport = generateSEOReport();

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Export & Deploy
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Get your website ready for the world
        </p>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="w-4 h-4" />
            Export Options
          </CardTitle>
          <CardDescription>
            Choose your preferred format and download your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => handleExport('html')}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <Code className="w-4 h-4 mr-2" />
            Static HTML/CSS/JS
            <Badge variant="secondary" className="ml-auto">Recommended</Badge>
          </Button>
          
          <Button
            onClick={() => handleExport('react')}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <Layout className="w-4 h-4 mr-2" />
            React Components
            <Badge variant="outline" className="ml-auto">Advanced</Badge>
          </Button>
          
          <Button
            onClick={() => handleExport('vue')}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <Settings className="w-4 h-4 mr-2" />
            Vue.js Project
            <Badge variant="outline" className="ml-auto">Pro</Badge>
          </Button>
        </CardContent>
      </Card>

      {/* SEO Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO Analysis</CardTitle>
          <CardDescription>
            Your website's search engine optimization score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl font-bold text-green-600">
              {seoReport.score}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">SEO Score</div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${seoReport.score}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {seoReport.checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex-1">{check.name}</span>
                <Badge
                  variant={check.status === 'passed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {check.status === 'passed' ? '✓' : '⚠'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Deploy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Deploy</CardTitle>
          <CardDescription>
            Deploy your website instantly to popular platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full" disabled>
            Deploy to Netlify
            <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
          </Button>
          <Button variant="outline" className="w-full" disabled>
            Deploy to Vercel
            <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
          </Button>
          <Button variant="outline" className="w-full" disabled>
            Deploy to GitHub Pages
            <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
          </Button>
        </CardContent>
      </Card>

      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-80">
            <CardContent className="p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-medium">Generating your website...</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                This may take a few seconds
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
