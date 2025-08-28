import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Utensils, Target, User } from 'lucide-react';

interface UserData {
  age: string;
  height: string;
  weight: string;
  goal: string;
}

interface ResultCardProps {
  dietPlan: string;
  userData: UserData;
}

const goalLabels = {
  'weight-loss': 'Weight Loss',
  'muscle-gain': 'Muscle Gain',
  'maintenance': 'Maintenance'
};

const goalColors = {
  'weight-loss': 'bg-destructive text-destructive-foreground',
  'muscle-gain': 'bg-success text-success-foreground',
  'maintenance': 'bg-accent text-accent-foreground'
};

export default function ResultCard({ dietPlan, userData }: ResultCardProps) {
  const formatDietPlan = (plan: string) => {
    const sections = plan.split(/(?=\*\*[^*]+\*\*)/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/\*\*/g, '').trim();
      const content = lines.slice(1).filter(line => line.trim());
      
      if (!title) return null;
      
      const isMainSection = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS'].some(meal => 
        title.toUpperCase().includes(meal)
      );
      
      const getIcon = (title: string) => {
        const upperTitle = title.toUpperCase();
        if (upperTitle.includes('BREAKFAST')) return '🌅';
        if (upperTitle.includes('LUNCH')) return '☀️';
        if (upperTitle.includes('DINNER')) return '🌙';
        if (upperTitle.includes('SNACK')) return '🍎';
        return '🍽️';
      };

      return (
        <div key={index} className={`space-y-2 ${isMainSection ? 'p-4 rounded-lg bg-secondary/30 border border-border' : ''}`}>
          <h3 className="font-semibold text-primary flex items-center gap-2">
            {isMainSection && <span className="text-lg">{getIcon(title)}</span>}
            {title}
          </h3>
          <div className="space-y-1">
            {content.map((line, lineIndex) => (
              <p key={lineIndex} className="text-sm text-foreground leading-relaxed pl-4">
                {line.replace(/^[-•]\s*/, '').trim()}
              </p>
            ))}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-card shadow-soft border-0 animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Your Personalized Diet Plan
          </CardTitle>
          <Badge className={goalColors[userData.goal as keyof typeof goalColors]}>
            {goalLabels[userData.goal as keyof typeof goalLabels]}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {userData.age}y
          </span>
          <span>{userData.height}cm</span>
          <span>{userData.weight}kg</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Daily Plan
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <strong>Plan Overview:</strong>
          </p>
          <p className="text-sm text-foreground">
            This diet plan is specifically tailored for your {goalLabels[userData.goal as keyof typeof goalLabels].toLowerCase()} goal. 
            Follow this daily structure and adjust portion sizes based on your activity level and hunger cues.
          </p>
        </div>
        
        <div className="space-y-4">
          {formatDietPlan(dietPlan)}
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Drink plenty of water throughout the day and listen to your body's hunger signals. 
            Consult with a healthcare professional before making significant dietary changes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}