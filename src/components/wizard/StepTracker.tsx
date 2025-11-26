'use client';

import { Check } from 'lucide-react';
import { STEP_CONFIG } from '@/lib/types';

interface StepTrackerProps {
  currentStep: number;
}

export function StepTracker({ currentStep }: StepTrackerProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {STEP_CONFIG.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                {/* Step circle with animations */}
                <div className="relative">
                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
                  )}
                  {/* Glow effect for current step */}
                  {isCurrent && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 animate-pulse-soft" />
                  )}
                  <div
                    className={`
                      relative w-11 h-11 rounded-full flex items-center justify-center
                      font-semibold text-sm transition-all duration-500 ease-out
                      ${isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200 scale-100' : ''}
                      ${isCurrent ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200 scale-110' : ''}
                      ${isUpcoming ? 'bg-gray-100 text-gray-400 border-2 border-gray-200' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 animate-scale-in" strokeWidth={3} />
                    ) : (
                      <span className={isCurrent ? 'animate-scale-in' : ''}>{index + 1}</span>
                    )}
                  </div>
                </div>
                {/* Step label */}
                <span
                  className={`
                    mt-2 text-xs font-semibold text-center transition-all duration-300
                    ${isCurrent ? 'text-blue-600 scale-105' : ''}
                    ${isCompleted ? 'text-green-600' : ''}
                    ${isUpcoming ? 'text-gray-400' : ''}
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line with animation */}
              {index < STEP_CONFIG.length - 1 && (
                <div className="flex-1 mx-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-700 ease-out
                      ${index < currentStep
                        ? 'w-full bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'w-0 bg-blue-500'
                      }
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
