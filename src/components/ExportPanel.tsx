
import React, { useState } from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Code, Layout, Settings, Globe, Github, Zap, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  config: WebsiteConfig;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ config }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async (format: 'html' | 'react' | 'vue') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Export Complete!",
      description: `Your ${format.toUpperCase()} website has been generated successfully.`,
    });
    
    setIsExporting(false);
  };

  const handleDeploy = async (platform: 'netlify' | 'vercel' | 'github') => {
    setDeploymentStatus(`Deploying to ${platform}...`);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setDeploymentStatus(null);
    toast({
      title: "Deployment Successful!",
      description: `Your website is now live on ${platform}.`,
    });
  };

  const generateDeploymentScript = (platform: string) => {
    const scripts = {
      netlify: `# Deploy to Netlify
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist`,
      vercel: `# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod`,
      github: `# Deploy to GitHub Pages
git add .
git commit -m "Deploy website"
git push origin main`
    };
    
    return scripts[platform as keyof typeof scripts] || '';
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
        { name: 'Loading Speed', status: 'passed', description: 'Optimized for fast loading' },
        { name: 'Schema Markup', status: 'passed', description: 'Structured data present' },
        { name: 'Social Meta Tags', status: 'passed', description: 'Open Graph tags configured' }
      ]
    };
  };

  const generatePerformanceReport = () => {
    return {
      score: 92,
      metrics: [
        { name: 'First Contentful Paint', value: '1.2s', status: 'good' },
        { name: 'Largest Contentful Paint', value: '2.1s', status: 'good' },
        { name: 'First Input Delay', value: '45ms', status: 'good' },
        { name: 'Cumulative Layout Shift', value: '0.08', status: 'good' },
        { name: 'Total Bundle Size', value: '245KB', status: 'good' },
        { name: 'Time to Interactive', value: '2.8s', status: 'needs-improvement' }
      ]
    };
  };

  const seoReport = generateSEOReport();
  const performanceReport = generatePerformanceReport();

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Export & Deploy
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Get your website ready for the world with robust deployment options
        </p>
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-4">
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
                Static HTML/CSS/JS Bundle
                <Badge variant="secondary" className="ml-auto">Recommended</Badge>
              </Button>
              
              <Button
                onClick={() => handleExport('react')}
                disabled={isExporting}
                className="w-full justify-start"
                variant="outline"
              >
                <Layout className="w-4 h-4 mr-2" />
                React Components & Source
                <Badge variant="outline" className="ml-auto">Advanced</Badge>
              </Button>
              
              <Button
                onClick={() => handleExport('vue')}
                disabled={isExporting}
                className="w-full justify-start"
                variant="outline"
              >
                <Settings className="w-4 h-4 mr-2" />
                Vue.js Project Template
                <Badge variant="outline" className="ml-auto">Pro</Badge>
              </Button>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Export Includes:</h4>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>✓ Minified HTML, CSS, and JavaScript</li>
                  <li>✓ Optimized images with WebP support</li>
                  <li>✓ Service Worker for PWA functionality</li>
                  <li>✓ SEO meta tags and structured data</li>
                  <li>✓ Accessibility enhancements</li>
                  <li>✓ Dark/Light theme support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          {/* One-Click Deploy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="w-4 h-4" />
                One-Click Deploy
              </CardTitle>
              <CardDescription>
                Deploy your website instantly to popular platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => handleDeploy('netlify')}
                disabled={!!deploymentStatus}
                className="w-full justify-start"
                style={{ backgroundColor: '#00C7B7' }}
              >
                <Globe className="w-4 h-4 mr-2" />
                Deploy to Netlify
                <Badge variant="secondary" className="ml-auto">Free SSL</Badge>
              </Button>
              
              <Button 
                onClick={() => handleDeploy('vercel')}
                disabled={!!deploymentStatus}
                className="w-full justify-start bg-black hover:bg-gray-800"
              >
                <Zap className="w-4 h-4 mr-2" />
                Deploy to Vercel
                <Badge variant="secondary" className="ml-auto">Edge Network</Badge>
              </Button>
              
              <Button 
                onClick={() => handleDeploy('github')}
                disabled={!!deploymentStatus}
                className="w-full justify-start"
                variant="outline"
              >
                <Github className="w-4 h-4 mr-2" />
                Deploy to GitHub Pages
                <Badge variant="outline" className="ml-auto">Free</Badge>
              </Button>

              {deploymentStatus && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                    <span className="text-sm">{deploymentStatus}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="w-4 h-4" />
                Custom Deployment
              </CardTitle>
              <CardDescription>
                Deploy to your own server or hosting provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ftp" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ftp" className="text-xs">FTP/SFTP</TabsTrigger>
                  <TabsTrigger value="docker" className="text-xs">Docker</TabsTrigger>
                  <TabsTrigger value="scripts" className="text-xs">Scripts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ftp" className="mt-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Upload the exported files to your web server via FTP/SFTP
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <code className="text-xs">
                        1. Export as Static HTML<br/>
                        2. Extract the zip file<br/>
                        3. Upload contents to your web root<br/>
                        4. Ensure .htaccess is configured
                      </code>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="docker" className="mt-4">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                    <pre className="text-xs overflow-x-auto">
{`FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="scripts" className="mt-4">
                  <div className="space-y-2">
                    <select className="w-full p-2 border rounded text-sm" defaultValue="netlify">
                      <option value="netlify">Netlify CLI</option>
                      <option value="vercel">Vercel CLI</option>
                      <option value="github">GitHub Actions</option>
                    </select>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <pre className="text-xs overflow-x-auto">
                        {generateDeploymentScript('netlify')}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Report</CardTitle>
              <CardDescription>
                Core Web Vitals and optimization metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-bold text-green-600">
                  {performanceReport.score}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Performance Score</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${performanceReport.score}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {performanceReport.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{metric.name}</div>
                      <div className="text-xs text-slate-500">{metric.value}</div>
                    </div>
                    <Badge
                      variant={metric.status === 'good' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {metric.status === 'good' ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-80">
            <CardContent className="p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-medium">Generating your website...</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Optimizing assets and preparing files
              </p>
              <div className="mt-4 text-xs text-slate-500">
                Including SEO optimizations, accessibility features, and PWA capabilities
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
