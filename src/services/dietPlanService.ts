interface UserData {
  age: string;
  height: string;
  weight: string;
  goal: string;
}

interface DietPlanResponse {
  plan: string;
  success: boolean;
  error?: string;
}

// Mock service that simulates the backend API call
export const generateDietPlan = async (userData: UserData): Promise<DietPlanResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock response based on user data
  const bmr = calculateBMR(parseInt(userData.age), parseInt(userData.height), parseInt(userData.weight));
  const calories = adjustCaloriesForGoal(bmr, userData.goal);
  
  const plan = generateMockPlan(userData, calories);

  return {
    plan,
    success: true
  };
};

function calculateBMR(age: number, height: number, weight: number): number {
  // Simplified BMR calculation (Mifflin-St Jeor equation for males, approximation)
  return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
}

function adjustCaloriesForGoal(bmr: number, goal: string): number {
  const activityMultiplier = 1.5; // Moderate activity level
  const tdee = bmr * activityMultiplier;

  switch (goal) {
    case 'weight-loss':
      return Math.round(tdee - 500); // 500 calorie deficit
    case 'muscle-gain':
      return Math.round(tdee + 300); // 300 calorie surplus
    case 'maintenance':
    default:
      return Math.round(tdee);
  }
}

function generateMockPlan(userData: UserData, targetCalories: number): string {
  const goalMap = {
    'weight-loss': 'weight loss',
    'muscle-gain': 'muscle gain',
    'maintenance': 'weight maintenance'
  };

  return `**DAILY DIET PLAN**

**Target Calories:** ${targetCalories} calories/day
**Goal:** ${goalMap[userData.goal as keyof typeof goalMap]}

**BREAKFAST** (${Math.round(targetCalories * 0.25)} calories)
- 1 cup oatmeal with sliced banana and berries
- 1 tablespoon ground flaxseed
- 1 cup low-fat milk or plant-based alternative
- 1 boiled egg (if muscle gain goal)

**LUNCH** (${Math.round(targetCalories * 0.35)} calories)
- Grilled chicken breast (150g) or tofu for vegetarians
- 1 cup quinoa or brown rice
- Mixed green salad with olive oil dressing
- Steamed broccoli and carrots
- 1 medium apple

**DINNER** (${Math.round(targetCalories * 0.30)} calories)
- Baked salmon (120g) or lentils for vegetarians
- Sweet potato (1 medium)
- Roasted vegetables (zucchini, bell peppers, onions)
- Small portion of leafy greens

**SNACKS** (${Math.round(targetCalories * 0.10)} calories)
- Greek yogurt with a handful of nuts
- Or: 1 banana with 2 tablespoons almond butter
- Herbal tea throughout the day

**HYDRATION**
- 8-10 glasses of water daily
- Green tea (optional)
- Limit sugary drinks

**NOTES**
- Adjust portion sizes based on hunger and energy levels
- Include a variety of colorful vegetables
- ${userData.goal === 'muscle-gain' ? 'Focus on protein-rich foods and consider post-workout nutrition' : ''}
- ${userData.goal === 'weight-loss' ? 'Practice mindful eating and avoid late-night snacking' : ''}
- ${userData.goal === 'maintenance' ? 'Maintain consistent meal timing and balanced nutrition' : ''}`;
}