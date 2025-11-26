'use client';

import { User, Briefcase, FileText, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ApplicationData } from '@/lib/types';

interface ConfirmationStepProps {
  data: ApplicationData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const employmentLabels: Record<string, string> = {
  salaried: 'Salaried Employee',
  self_employed: 'Self Employed',
  student: 'Student',
  unemployed: 'Unemployed',
};

export function ConfirmationStep({
  data,
  onSubmit,
  onBack,
  isSubmitting,
}: ConfirmationStepProps) {
  const isEmployed =
    data.employmentType === 'salaried' || data.employmentType === 'self_employed';

  return (
    <div className="py-6 page-transition">
      <div className="mb-6 animate-fade-in-up">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Review Your Application
        </h2>
        <p className="text-gray-500 text-sm">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Personal Information Card */}
        <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 card-hover animate-fade-in-up stagger-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Personal Information</h3>
            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wide">Full Name</span>
              <p className="font-semibold text-gray-900 mt-1">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wide">Email</span>
              <p className="font-semibold text-gray-900 mt-1">{data.email}</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wide">Phone</span>
              <p className="font-semibold text-gray-900 mt-1">{data.phone}</p>
            </div>
          </div>
        </div>

        {/* Employment Details Card */}
        <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100 card-hover animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Employment Details</h3>
            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wide">Employment Type</span>
              <p className="font-semibold text-gray-900 mt-1">
                {employmentLabels[data.employmentType] || 'Not specified'}
              </p>
            </div>
            {isEmployed && (
              <>
                <div className="bg-white/60 rounded-lg p-3">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Company</span>
                  <p className="font-semibold text-gray-900 mt-1">{data.companyName}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Monthly Salary</span>
                  <p className="font-semibold text-green-600 mt-1">
                    AED {Number(data.salary).toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Documents Card */}
        <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 card-hover animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Uploaded Documents</h3>
            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
          </div>
          <div className="space-y-3 text-sm">
            {data.salaryCertificate && (
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <span className="text-gray-500">Salary Certificate</span>
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {data.salaryCertificate.name}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
              <span className="text-gray-500">National ID</span>
              <span className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {data.nationalId?.name || 'Not uploaded'}
              </span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 animate-fade-in-up stagger-4">
          <Shield className="w-5 h-5 text-gray-400" />
          <p>Your information is encrypted and secure. We never share your data.</p>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 animate-fade-in-up stagger-5">
        <Button variant="secondary" onClick={onBack} disabled={isSubmitting} className="group">
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span> Back
        </Button>
        <Button onClick={onSubmit} loading={isSubmitting} className="px-8">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
}
