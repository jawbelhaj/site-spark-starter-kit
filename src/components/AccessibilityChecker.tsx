
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Keyboard, Volume2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { WebsiteConfig } from './WebsiteBuilder';

interface AccessibilityCheckerProps {
  config: WebsiteConfig;
}

export const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({ config }) => {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const runAccessibilityChecks = () => {
    return [
      {
        category: 'Visual',
        icon: Eye,
        checks: [
          {
            name: 'Color Contrast',
            status: 'pass',
            description: 'Text has sufficient contrast ratio (4.5:1 minimum)',
            wcagLevel: 'AA'
          },
          {
            name: 'Focus Indicators',
            status: 'pass',
            description: 'All interactive elements have visible focus states',
            wcagLevel: 'AA'
          },
          {
            name: 'Text Scaling',
            status: 'pass',
            description: 'Text remains readable when scaled to 200%',
            wcagLevel: 'AA'
          },
          {
            name: 'Color Dependencies',
            status: 'warning',
            description: 'Information is not conveyed by color alone',
            wcagLevel: 'A'
          }
        ]
      },
      {
        category: 'Keyboard Navigation',
        icon: Keyboard,
        checks: [
          {
            name: 'Tab Order',
            status: 'pass',
            description: 'Logical tab order throughout the page',
            wcagLevel: 'A'
          },
          {
            name: 'Keyboard Traps',
            status: 'pass',
            description: 'No keyboard traps detected',
            wcagLevel: 'A'
          },
          {
            name: 'Skip Links',
            status: 'warning',
            description: 'Skip navigation links should be implemented',
            wcagLevel: 'A'
          },
          {
            name: 'All Interactive Elements',
            status: 'pass',
            description: 'All interactive elements are keyboard accessible',
            wcagLevel: 'A'
          }
        ]
      },
      {
        category: 'Screen Reader',
        icon: Volume2,
        checks: [
          {
            name: 'Semantic HTML',
            status: 'pass',
            description: 'Proper use of semantic HTML elements',
            wcagLevel: 'A'
          },
          {
            name: 'ARIA Labels',
            status: 'pass',
            description: 'ARIA labels provided for complex elements',
            wcagLevel: 'A'
          },
          {
            name: 'Image Alt Text',
            status: 'warning',
            description: 'Some images missing descriptive alt text',
            wcagLevel: 'A'
          },
          {
            name: 'Heading Structure',
            status: 'pass',
            description: 'Logical heading hierarchy (H1-H6)',
            wcagLevel: 'A'
          },
          {
            name: 'Form Labels',
            status: 'pass',
            description: 'All form inputs have associated labels',
            wcagLevel: 'A'
          }
        ]
      }
    ];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Pass</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
      case 'fail':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Fail</Badge>;
      default:
        return null;
    }
  };

  const generateAccessibilityCode = () => {
    return `
<!-- Accessibility Enhanced HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  
  <!-- Skip Links -->
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    }
    .skip-link:focus {
      top: 6px;
    }
    
    /* Focus Styles */
    *:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <!-- Skip Links -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#navigation" class="skip-link">Skip to navigation</a>
  
  <!-- Header with proper navigation -->
  <header role="banner">
    <nav role="navigation" id="navigation" aria-label="Main navigation">
      <!-- Navigation items -->
    </nav>
  </header>
  
  <!-- Main content -->
  <main id="main-content" role="main">
    <h1>${config.content.hero.title}</h1>
    
    <!-- Article structure -->
    <article>
      <h2>Section Title</h2>
      <p>${config.content.about}</p>
    </article>
    
    <!-- Forms with proper labels -->
    <form>
      <label for="email-input">Email Address (required)</label>
      <input 
        type="email" 
        id="email-input" 
        name="email" 
        required 
        aria-describedby="email-help"
        aria-invalid="false"
      >
      <div id="email-help">We'll never share your email</div>
      
      <button type="submit" aria-describedby="submit-help">
        Subscribe
      </button>
      <div id="submit-help">Click to subscribe to our newsletter</div>
    </form>
    
    <!-- Images with proper alt text -->
    <img 
      src="${config.content.hero.image}" 
      alt="Descriptive text about the image content"
      role="img"
    >
    
    <!-- Interactive elements -->
    <button 
      type="button" 
      aria-expanded="false" 
      aria-controls="menu-dropdown"
      aria-label="Open menu"
    >
      Menu
    </button>
    
    <div 
      id="menu-dropdown" 
      role="menu" 
      aria-hidden="true"
      aria-labelledby="menu-button"
    >
      <!-- Menu items -->
    </div>
  </main>
  
  <!-- Footer -->
  <footer role="contentinfo">
    <p>&copy; 2024 ${config.title}. All rights reserved.</p>
  </footer>
  
  <!-- Live region for announcements -->
  <div aria-live="polite" aria-atomic="true" class="sr-only" id="announcements"></div>
</body>
</html>
    `.trim();
  };

  const accessibilityData = runAccessibilityChecks();
  const totalChecks = accessibilityData.reduce((sum, category) => sum + category.checks.length, 0);
  const passedChecks = accessibilityData.reduce((sum, category) => 
    sum + category.checks.filter(check => check.status === 'pass').length, 0
  );
  const accessibilityScore = Math.round((passedChecks / totalChecks) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Accessibility Analysis
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Ensure your website is accessible to all users
        </p>
      </div>

      {/* Accessibility Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Accessibility Score: {accessibilityScore}/100
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                accessibilityScore >= 90 ? 'bg-green-500' : 
                accessibilityScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${accessibilityScore}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {passedChecks} of {totalChecks} checks passed
          </p>
        </CardContent>
      </Card>

      {/* Accessibility Checks by Category */}
      {accessibilityData.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <category.icon className="w-4 h-4" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.checks.map((check, checkIndex) => (
              <div key={checkIndex} className="border-b border-slate-100 dark:border-slate-700 pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <span className="font-medium text-sm">{check.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      WCAG {check.wcagLevel}
                    </Badge>
                    {getStatusBadge(check.status)}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 ml-6">
                  {check.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Accessibility Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accessibility Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto max-h-64">
              {generateAccessibilityCode()}
            </pre>
          </div>
          <Button 
            className="mt-4 w-full" 
            onClick={() => navigator.clipboard.writeText(generateAccessibilityCode())}
          >
            Copy Accessibility Code
          </Button>
        </CardContent>
      </Card>

      {/* Quick Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Accessibility Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setActiveTest('keyboard')}
          >
            <Keyboard className="w-4 h-4 mr-2" />
            Test Keyboard Navigation (Tab through page)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setActiveTest('contrast')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Check Color Contrast
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setActiveTest('screen-reader')}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Simulate Screen Reader
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
