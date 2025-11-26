'use client';

import { Clock, Mail, PartyPopper, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface StatusStepProps {
  applicationId: string;
  onReset: () => void;
}

export function StatusStep({ applicationId, onReset }: StatusStepProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center py-6 page-transition">
      {/* Animated success icon */}
      <div className="relative mx-auto w-28 h-28 mb-6">
        {/* Ripple effects */}
        <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20" />
        <div className="absolute inset-2 bg-green-300 rounded-full animate-ping opacity-20 stagger-1" />

        {/* Main circle */}
        <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
          {/* Animated checkmark SVG */}
          <svg className="w-14 h-14 text-white" viewBox="0 0 24 24" fill="none">
            <path
              className="checkmark-circle"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              className="checkmark-check"
              d="M8 12l3 3 5-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Floating celebration icons */}
        <PartyPopper className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-bounce-soft" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-yellow-400 rounded-full animate-float stagger-2" />
        <div className="absolute top-0 -left-3 w-4 h-4 bg-pink-400 rounded-full animate-float stagger-3" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fade-in-up stagger-1">
        <span className="gradient-text">Congratulations!</span>
      </h2>

      <p className="text-lg text-gray-600 mb-2 animate-fade-in-up stagger-2">
        Application Submitted Successfully
      </p>

      <p className="text-gray-500 mb-6 max-w-md mx-auto animate-fade-in-up stagger-2">
        Thank you for applying. Your application is now under review.
      </p>

      {/* Application ID card */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 max-w-sm mx-auto mb-8 animate-fade-in-up stagger-3 shadow-xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <p className="text-sm text-blue-100 mb-2 relative">Application Reference</p>
        <div className="flex items-center justify-center gap-3 relative">
          <p className="text-2xl font-bold text-white font-mono tracking-wider">{applicationId}</p>
          <button
            onClick={copyToClipboard}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
        {copied && (
          <p className="text-xs text-blue-100 mt-2 animate-fade-in">Copied to clipboard!</p>
        )}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <div className="group flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 card-hover animate-fade-in-up stagger-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Review Time</p>
            <p className="text-xs text-gray-500">2-3 working days</p>
          </div>
        </div>

        <div className="group flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 card-hover animate-fade-in-up stagger-5">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Notification</p>
            <p className="text-xs text-gray-500">Via email & SMS</p>
          </div>
        </div>
      </div>

      {/* What's next section */}
      <div className="bg-gray-50 rounded-xl p-5 max-w-md mx-auto mb-8 text-left animate-fade-in-up stagger-5">
        <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            Our team will review your application
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            We may contact you for additional info
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            Decision within 2-3 working days
          </li>
        </ol>
      </div>

      <Button
        variant="outline"
        onClick={onReset}
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 animate-fade-in-up stagger-5"
      >
        Start New Application
      </Button>
    </div>
  );
}
