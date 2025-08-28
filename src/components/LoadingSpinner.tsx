import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <div className="absolute inset-0 w-8 h-8 border-2 border-primary/20 rounded-full animate-pulse-glow"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">Generating your personalized diet plan...</p>
        <p className="text-xs text-muted-foreground">This may take a few moments</p>
      </div>
    </div>
  );
}