'use client';

import { useState } from 'react';
import { StepTracker } from './StepTracker';
import { StartStep } from './StartStep';
import { CustomerDetailsStep } from './CustomerDetailsStep';
import { DocumentsStep } from './DocumentsStep';
import { ConfirmationStep } from './ConfirmationStep';
import { StatusStep } from './StatusStep';
import { ApplicationData, initialApplicationData } from '@/lib/types';

export function WizardContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationData>(initialApplicationData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleUpdate = (data: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      setApplicationId(result.id);
      setCurrentStep(4);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData(initialApplicationData);
    setApplicationId('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StartStep onNext={handleNext} />;
      case 1:
        return (
          <CustomerDetailsStep
            data={formData}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <DocumentsStep
            data={formData}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            data={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      case 4:
        return <StatusStep applicationId={applicationId} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <StepTracker currentStep={currentStep} />
        <div className="mt-6">{renderStep()}</div>
      </div>
    </div>
  );
}
