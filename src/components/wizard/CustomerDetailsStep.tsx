'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ApplicationData, EmploymentType } from '@/lib/types';
import { validateCustomerDetails } from '@/lib/validation';

interface CustomerDetailsStepProps {
  data: ApplicationData;
  onUpdate: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const employmentOptions = [
  { value: 'salaried', label: 'Salaried Employee' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
];

export function CustomerDetailsStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: CustomerDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isEmployed =
    data.employmentType === 'salaried' || data.employmentType === 'self_employed';
  const isUnemployedOrStudent =
    data.employmentType === 'student' || data.employmentType === 'unemployed';
  const hasLowSalary =
    isEmployed && data.salary !== '' && Number(data.salary) < 10000 && Number(data.salary) > 0;

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationData = {
        ...data,
        employmentType: data.employmentType as EmploymentType,
      };
      const result = validateCustomerDetails(validationData);
      const touchedErrors: Record<string, string> = {};
      Object.keys(touched).forEach((key) => {
        if (result.errors[key]) {
          touchedErrors[key] = result.errors[key];
        }
      });
      setErrors(touchedErrors);
    }
  }, [data, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    const validationData = {
      ...data,
      employmentType: data.employmentType as EmploymentType,
    };
    const result = validateCustomerDetails(validationData);

    if (!result.success) {
      setErrors(result.errors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        employmentType: true,
        companyName: true,
        salary: true,
      });
      return;
    }

    onNext();
  };

  return (
    <div className="py-6 page-transition">
      <div className="mb-6 animate-fade-in-up">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Details</h2>
        <p className="text-sm text-gray-500">Please fill in your information accurately</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up stagger-1">
          <Input
            label="First Name"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            onBlur={() => handleBlur('firstName')}
            error={errors.firstName}
            placeholder="Enter your first name"
          />

          <Input
            label="Last Name"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            onBlur={() => handleBlur('lastName')}
            error={errors.lastName}
            placeholder="Enter your last name"
          />
        </div>

        <div className="animate-fade-in-up stagger-2">
        <Input
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          placeholder="you@example.com"
        />
        </div>

        <div className="animate-fade-in-up stagger-2">
        <Input
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          onBlur={() => handleBlur('phone')}
          error={errors.phone}
          placeholder="05XXXXXXXX"
        />
        </div>

        <div className="animate-fade-in-up stagger-3">
        <Select
          label="Employment Type"
          value={data.employmentType}
          onChange={(e) =>
            onUpdate({
              employmentType: e.target.value as EmploymentType | '',
              companyName: '',
              salary: '',
            })
          }
          onBlur={() => handleBlur('employmentType')}
          error={errors.employmentType}
          options={employmentOptions}
          placeholder="Select your employment status"
        />
        </div>

        {isUnemployedOrStudent && (
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl animate-scale-in">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Not Eligible
              </p>
              <p className="text-sm text-amber-700 mt-1">
                Sorry, credit cards can only be issued to employed individuals with a minimum salary requirement.
              </p>
            </div>
          </div>
        )}

        {isEmployed && (
          <div className="space-y-5 animate-fade-in-up">
            <Input
              label="Company Name"
              value={data.companyName}
              onChange={(e) => onUpdate({ companyName: e.target.value })}
              onBlur={() => handleBlur('companyName')}
              error={errors.companyName}
              placeholder="Enter your company name"
            />

            <Input
              label="Monthly Salary (AED)"
              type="number"
              value={data.salary}
              onChange={(e) => onUpdate({ salary: e.target.value })}
              onBlur={() => handleBlur('salary')}
              error={errors.salary}
              placeholder="Enter your monthly salary"
            />

            {hasLowSalary && (
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl animate-scale-in">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Salary Requirement Not Met
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    Sorry, a minimum monthly salary of AED 10,000 is required for credit card eligibility.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 animate-fade-in-up stagger-4">
        <Button variant="secondary" onClick={onBack} className="group">
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span> Back
        </Button>
        <Button onClick={handleSubmit} disabled={isUnemployedOrStudent || hasLowSalary} className="group">
          Continue <span className="group-hover:translate-x-0.5 transition-transform inline-block">&rarr;</span>
        </Button>
      </div>
    </div>
  );
}
