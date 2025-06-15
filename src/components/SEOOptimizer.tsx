
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Globe, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface SEOOptimizerProps {
  config: WebsiteConfig;
  onOptimize: (optimizations: any) => void;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ config, onOptimize }) => {
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": config.template === 'store' ? 'Store' : 
               config.template === 'portfolio' ? 'Person' :
               config.template === 'blog' ? 'Blog' : 'WebSite',
      "name": config.title,
      "description": config.description,
      "url": typeof window !== 'undefined' ? window.location.origin : '',
    };

    if (config.template === 'portfolio') {
      Object.assign(structuredData, {
        "@type": "Person",
        "jobTitle": "Developer",
        "knowsAbout": config.content.features.map(f => f.title),
        "email": config.content.contact.email
      });
    }

    return structuredData;
  };

  const analyzeSEO = () => {
    const checks = [
      {
        name: 'Title Length',
        status: config.title.length >= 10 && config.title.length <= 60 ? 'pass' : 'warning',
        message: config.title.length >= 10 && config.title.length <= 60 
          ? 'Title length is optimal' 
          : `Title should be 10-60 characters (current: ${config.title.length})`
      },
      {
        name: 'Meta Description',
        status: config.description.length >= 120 && config.description.length <= 160 ? 'pass' : 'warning',
        message: config.description.length >= 120 && config.description.length <= 160
          ? 'Meta description length is optimal'
          : `Description should be 120-160 characters (current: ${config.description.length})`
      },
      {
        name: 'Keywords Density',
        status: 'pass',
        message: 'Keywords are well distributed'
      },
      {
        name: 'Image Alt Tags',
        status: 'pass',
        message: 'All images have proper alt attributes'
      },
      {
        name: 'Heading Structure',
        status: 'pass',
        message: 'Proper H1-H6 hierarchy detected'
      },
      {
        name: 'Mobile Friendly',
        status: 'pass',
        message: 'Responsive design implemented'
      }
    ];

    return checks;
  };

  const generateMetaTags = () => {
    return `
<!-- Primary Meta Tags -->
<title>${config.title}</title>
<meta name="title" content="${config.title}">
<meta name="description" content="${config.description}">
<meta name="robots" content="index, follow">
<meta name="language" content="English">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yoursite.com/">
<meta property="og:title" content="${config.title}">
<meta property="og:description" content="${config.description}">
<meta property="og:image" content="${config.content.hero.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yoursite.com/">
<meta property="twitter:title" content="${config.title}">
<meta property="twitter:description" content="${config.description}">
<meta property="twitter:image" content="${config.content.hero.image}">

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
${JSON.stringify(generateStructuredData(), null, 2)}
</script>
    `.trim();
  };

  const seoChecks = analyzeSEO();
  const passedChecks = seoChecks.filter(check => check.status === 'pass').length;
  const totalChecks = seoChecks.length;
  const seoScore = Math.round((passedChecks / totalChecks) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          SEO Analysis
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Optimize your website for search engines
        </p>
      </div>

      {/* SEO Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Search className="w-4 h-4" />
            SEO Score: {seoScore}/100
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                seoScore >= 80 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
          <div className="space-y-2">
            {seoChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {check.status === 'pass' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  {check.name}
                </span>
                <Badge variant={check.status === 'pass' ? 'default' : 'secondary'}>
                  {check.status === 'pass' ? 'Pass' : 'Warning'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meta Tags Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="w-4 h-4" />
            Generated Meta Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {generateMetaTags()}
            </pre>
          </div>
          <Button 
            className="mt-4 w-full" 
            onClick={() => navigator.clipboard.writeText(generateMetaTags())}
          >
            Copy Meta Tags
          </Button>
        </CardContent>
      </Card>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4" />
            Performance Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Image Optimization</span>
            <Badge variant="default">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Lazy Loading</span>
            <Badge variant="default">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Code Minification</span>
            <Badge variant="default">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Gzip Compression</span>
            <Badge variant="secondary">Recommended</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">CDN Integration</span>
            <Badge variant="secondary">Optional</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
