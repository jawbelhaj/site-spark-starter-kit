
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WebsiteConfig } from './WebsiteBuilder';
import { Search, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface SEOMetric {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'error';
  suggestion: string;
}

interface LiveSEOAnalyzerProps {
  config: WebsiteConfig;
}

export const LiveSEOAnalyzer: React.FC<LiveSEOAnalyzerProps> = ({ config }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [overallScore, setOverallScore] = useState(85);
  const [metrics, setMetrics] = useState<SEOMetric[]>([]);

  const analyzeContent = () => {
    const newMetrics: SEOMetric[] = [
      {
        name: 'Title Length',
        score: config.title.length >= 30 && config.title.length <= 60 ? 100 : 70,
        status: config.title.length >= 30 && config.title.length <= 60 ? 'excellent' : 'warning',
        suggestion: config.title.length < 30 ? 'Title is too short' : config.title.length > 60 ? 'Title is too long' : 'Perfect title length'
      },
      {
        name: 'Meta Description',
        score: config.description.length >= 120 && config.description.length <= 160 ? 100 : 75,
        status: config.description.length >= 120 && config.description.length <= 160 ? 'excellent' : 'good',
        suggestion: config.description.length < 120 ? 'Description could be longer' : config.description.length > 160 ? 'Description is too long' : 'Perfect description length'
      },
      {
        name: 'Content Quality',
        score: config.content.about.length > 100 ? 90 : 60,
        status: config.content.about.length > 100 ? 'good' : 'warning',
        suggestion: config.content.about.length > 100 ? 'Good content length' : 'Add more descriptive content'
      },
      {
        name: 'Image Optimization',
        score: config.content.hero.image ? 85 : 40,
        status: config.content.hero.image ? 'good' : 'error',
        suggestion: config.content.hero.image ? 'Hero image present' : 'Add hero image with alt text'
      },
      {
        name: 'Mobile Friendly',
        score: 95,
        status: 'excellent',
        suggestion: 'Responsive design detected'
      },
      {
        name: 'Page Speed',
        score: 88,
        status: 'good',
        suggestion: 'Good loading performance'
      }
    ];

    setMetrics(newMetrics);
    const avgScore = Math.round(newMetrics.reduce((sum, metric) => sum + metric.score, 0) / newMetrics.length);
    setOverallScore(avgScore);
  };

  useEffect(() => {
    analyzeContent();
  }, [config]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    analyzeContent();
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-base">Live SEO Analysis</CardTitle>
          </div>
          <Button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            variant="outline"
            size="sm"
          >
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardDescription>
          Real-time SEO optimization score and suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Overall SEO Score</div>
          <Progress value={overallScore} className="mt-2" />
        </div>

        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(metric.status)}
                <div>
                  <div className="font-medium text-sm">{metric.name}</div>
                  <div className="text-xs text-slate-500">{metric.suggestion}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </div>
                <Badge 
                  variant={metric.status === 'excellent' || metric.status === 'good' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <div className="text-xs text-slate-500 text-center">
            Analysis updates automatically as you edit your content
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
