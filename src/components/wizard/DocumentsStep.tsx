'use client';

import { FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import { ApplicationData, UploadedFile } from '@/lib/types';

interface DocumentsStepProps {
  data: ApplicationData;
  onUpdate: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DocumentsStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: DocumentsStepProps) {
  const isEmployedWithValidSalary =
    (data.employmentType === 'salaried' || data.employmentType === 'self_employed') &&
    Number(data.salary) >= 10000;

  const canProceed = data.nationalId !== null;

  const handleSubmit = () => {
    if (!canProceed) {
      return;
    }
    onNext();
  };

  return (
    <div className="py-6 page-transition">
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Please upload the required documents to complete your application
        </p>
      </div>

      <div className="space-y-6">
        {isEmployedWithValidSalary && (
          <div className="animate-fade-in-up stagger-1">
            <FileUpload
              label="Salary Certificate"
              value={data.salaryCertificate}
              onChange={(file: UploadedFile | null) =>
                onUpdate({ salaryCertificate: file })
              }
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </div>
        )}

        <div className="animate-fade-in-up stagger-2">
          <FileUpload
            label="National ID (Emirates ID) *"
            value={data.nationalId}
            onChange={(file: UploadedFile | null) => onUpdate({ nationalId: file })}
            accept=".pdf,.png,.jpg,.jpeg"
            error={!data.nationalId ? 'National ID is required' : undefined}
          />
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl text-sm text-gray-600 animate-fade-in-up stagger-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <p>Your documents are encrypted and stored securely. We comply with data protection regulations.</p>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 animate-fade-in-up stagger-4">
        <Button variant="secondary" onClick={onBack} className="group">
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span> Back
        </Button>
        <Button onClick={handleSubmit} disabled={!canProceed} className="group">
          Continue <span className="group-hover:translate-x-0.5 transition-transform inline-block">&rarr;</span>
        </Button>
      </div>
    </div>
  );
}
