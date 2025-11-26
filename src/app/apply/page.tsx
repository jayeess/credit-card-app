'use client';

import { useState } from 'react';
import { StepTracker } from '@/components/wizard/StepTracker';
import { StartStep } from '@/components/wizard/StartStep';
import { CustomerDetailsStep } from '@/components/wizard/CustomerDetailsStep';
import { DocumentsStep } from '@/components/wizard/DocumentsStep';
import { ConfirmationStep } from '@/components/wizard/ConfirmationStep';
import { StatusStep } from '@/components/wizard/StatusStep';
import { ApplicationData, initialApplicationData } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ApplyPage() {
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
    <main className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-6 animate-fade-in-up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="gradient-text">Credit Card</span>
            <span className="text-gray-900"> Application</span>
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/20 animate-fade-in-up stagger-1">
          <StepTracker currentStep={currentStep} />
          <div className="mt-6">{renderStep()}</div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 animate-fade-in stagger-2">
          Need help? Contact support at{' '}
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </main>
  );
}
