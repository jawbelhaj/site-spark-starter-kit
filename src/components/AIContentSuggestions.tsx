
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, Brain, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Suggestion {
  id: string;
  type: 'title' | 'description' | 'content' | 'color';
  text: string;
  confidence: number;
}

interface AIContentSuggestionsProps {
  currentContent: any;
  onApplySuggestion: (suggestion: Suggestion) => void;
}

export const AIContentSuggestions: React.FC<AIContentSuggestionsProps> = ({
  currentContent,
  onApplySuggestion
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'title',
      text: 'Transform Your Business with Digital Innovation',
      confidence: 92
    },
    {
      id: '2',
      type: 'description',
      text: 'Leverage cutting-edge technology to streamline your operations and boost productivity.',
      confidence: 88
    },
    {
      id: '3',
      type: 'content',
      text: 'Add a customer testimonials section to build trust and credibility.',
      confidence: 95
    },
    {
      id: '4',
      type: 'color',
      text: 'Consider using a warmer color palette to increase user engagement.',
      confidence: 76
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewSuggestions = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSuggestions: Suggestion[] = [
      {
        id: Date.now().toString(),
        type: 'title',
        text: 'Revolutionize Your Workflow Today',
        confidence: 89
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'content',
        text: 'Include a FAQ section to address common customer concerns.',
        confidence: 91
      }
    ];
    
    setSuggestions(prev => [...newSuggestions, ...prev.slice(0, 4)]);
    setIsGenerating(false);
    
    toast({
      title: "New Suggestions Generated!",
      description: "AI has analyzed your content and provided fresh ideas.",
    });
  };

  const applySuggestion = (suggestion: Suggestion) => {
    onApplySuggestion(suggestion);
    toast({
      title: "Suggestion Applied!",
      description: `${suggestion.type} has been updated with AI suggestion.`,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'title': return Lightbulb;
      case 'description': return Brain;
      case 'content': return Wand2;
      case 'color': return Sparkles;
      default: return Lightbulb;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-base">AI Content Suggestions</CardTitle>
          </div>
          <Button
            onClick={generateNewSuggestions}
            disabled={isGenerating}
            variant="outline"
            size="sm"
          >
            {isGenerating ? 'Generating...' : 'Refresh'}
          </Button>
        </div>
        <CardDescription>
          AI-powered suggestions to improve your content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion) => {
          const IconComponent = getIcon(suggestion.type);
          return (
            <div key={suggestion.id} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {suggestion.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getConfidenceColor(suggestion.confidence)}`} />
                      <span className="text-xs text-slate-500">{suggestion.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                    {suggestion.text}
                  </p>
                  <Button
                    onClick={() => applySuggestion(suggestion)}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
