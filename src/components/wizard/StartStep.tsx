'use client';

import { CreditCard, Shield, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface StartStepProps {
  onNext: () => void;
}

export function StartStep({ onNext }: StartStepProps) {
  return (
    <div className="text-center py-6 page-transition">
      {/* Animated icon */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse-soft opacity-50" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-float">
          <CreditCard className="w-12 h-12 text-white" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-500 animate-bounce-soft" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fade-in-up">
        Apply for Your <span className="gradient-text">Credit Card</span>
      </h2>

      <p className="text-gray-600 mb-8 max-w-md mx-auto animate-fade-in-up stagger-1">
        Complete your application in just a few minutes. We&apos;ll guide you through
        each step of the process.
      </p>

      {/* Feature cards with hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
        <div className="group p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl card-hover cursor-default animate-fade-in-up stagger-1 border border-blue-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">Quick Process</h3>
          <p className="text-xs text-gray-500 mt-1">Takes only 5-10 minutes</p>
        </div>

        <div className="group p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl card-hover cursor-default animate-fade-in-up stagger-2 border border-green-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">Secure</h3>
          <p className="text-xs text-gray-500 mt-1">Your data is protected</p>
        </div>

        <div className="group p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl card-hover cursor-default animate-fade-in-up stagger-3 border border-purple-100">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">Easy Approval</h3>
          <p className="text-xs text-gray-500 mt-1">2-3 working days</p>
        </div>
      </div>

      {/* Requirements box with animated border */}
      <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 mb-8 max-w-md mx-auto text-left animate-fade-in-up stagger-4 border border-amber-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-400" />
        <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs">!</span>
          Requirements
        </h4>
        <ul className="text-sm text-amber-700 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Must be employed (Self-employed or Salaried)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Minimum monthly salary: AED 10,000
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Valid UAE phone number
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Salary certificate &amp; National ID
          </li>
        </ul>
      </div>

      <Button
        onClick={onNext}
        className="px-10 py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all btn-shine animate-fade-in-up stagger-5"
      >
        Start Application
      </Button>
    </div>
  );
}
