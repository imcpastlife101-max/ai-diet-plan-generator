import React, { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateDietPlan } from '@/services/dietPlanService';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Heart, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface UserData {
  age: string;
  height: string;
  weight: string;
  goal: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (formData: UserData) => {
    setIsLoading(true);
    setDietPlan('');
    
    try {
      const response = await generateDietPlan(formData);
      
      if (response.success) {
        setDietPlan(response.plan);
        setUserData(formData);
        toast({
          title: "Diet plan generated!",
          description: "Your personalized plan is ready.",
        });
      } else {
        throw new Error(response.error || 'Failed to generate diet plan');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate diet plan. Please try again.",
        variant: "destructive",
      });
      console.error('Error generating diet plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Diet Plan Generator
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a personalized daily diet plan tailored to your goals, body metrics, and lifestyle
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Leaf className="w-5 h-5 text-primary" />
                Personalized Nutrition
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Heart className="w-5 h-5 text-primary" />
                Health-Focused
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Zap className="w-5 h-5 text-primary" />
                Instant Results
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="w-full lg:w-auto flex justify-center">
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="w-full lg:flex-1 max-w-2xl flex justify-center">
            <div className="w-full">
              {isLoading && <LoadingSpinner />}
              {dietPlan && userData && !isLoading && (
                <ResultCard dietPlan={dietPlan} userData={userData} />
              )}
              {!isLoading && !dietPlan && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start?</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to generate your personalized diet plan
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool provides general nutritional guidance only. 
              Always consult with a healthcare professional before making significant dietary changes.
            </p>
            <p>
              Built with ❤️ for healthier living
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
