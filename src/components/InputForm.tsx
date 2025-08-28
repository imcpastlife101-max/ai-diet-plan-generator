import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Target, User, Ruler, Scale } from 'lucide-react';

interface UserData {
  age: string;
  height: string;
  weight: string;
  goal: string;
}

interface InputFormProps {
  onGenerate: (data: UserData) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<UserData>({
    age: '',
    height: '',
    weight: '',
    goal: ''
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserData> = {};
    
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    
    if (!formData.height || parseInt(formData.height) < 50 || parseInt(formData.height) > 300) {
      newErrors.height = 'Please enter a valid height (50-300 cm)';
    }
    
    if (!formData.weight || parseInt(formData.weight) < 20 || parseInt(formData.weight) > 500) {
      newErrors.weight = 'Please enter a valid weight (20-500 kg)';
    }
    
    if (!formData.goal) {
      newErrors.goal = 'Please select a goal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(formData);
    }
  };

  const fillExample = (age: string, height: string, weight: string, goal: string) => {
    setFormData({ age, height, weight, goal });
    setErrors({});
  };

  return (
    <Card className="w-full max-w-md bg-gradient-card shadow-soft border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Diet Plan Generator
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Get a personalized daily diet plan based on your goals
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Example Chips */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Quick examples:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="chip"
              size="sm"
              type="button"
              onClick={() => fillExample('25', '175', '70', 'weight-loss')}
              className="text-xs"
            >
              25y · 175cm · 70kg · weight loss
            </Button>
            <Button
              variant="chip"
              size="sm"
              type="button"
              onClick={() => fillExample('19', '170', '60', 'muscle-gain')}
              className="text-xs"
            >
              19y · 170cm · 60kg · muscle gain
            </Button>
            <Button
              variant="chip"
              size="sm"
              type="button"
              onClick={() => fillExample('35', '165', '80', 'maintenance')}
              className="text-xs"
            >
              35y · 165cm · 80kg · maintenance
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Age Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Age (years)
            </label>
            <Input
              type="number"
              placeholder="e.g., 25"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              className={`transition-all duration-200 ${errors.age ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
            />
            {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
          </div>

          {/* Height Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              Height (cm)
            </label>
            <Input
              type="number"
              placeholder="e.g., 175"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              className={`transition-all duration-200 ${errors.height ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
            />
            {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              Weight (kg)
            </label>
            <Input
              type="number"
              placeholder="e.g., 70"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              className={`transition-all duration-200 ${errors.weight ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
            />
            {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
          </div>

          {/* Goal Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Goal
            </label>
            <Select 
              value={formData.goal} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
            >
              <SelectTrigger className={`transition-all duration-200 ${errors.goal ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            {errors.goal && <p className="text-xs text-destructive">{errors.goal}</p>}
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              'Generate Diet Plan'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}