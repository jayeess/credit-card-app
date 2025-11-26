export type EmploymentType = 'self_employed' | 'salaried' | 'student' | 'unemployed';

export type WizardStep = 'start' | 'details' | 'documents' | 'confirmation' | 'status';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentType: EmploymentType | '';
  companyName: string;
  salary: string;
  salaryCertificate: UploadedFile | null;
  nationalId: UploadedFile | null;
}

export interface ApplicationSubmission extends ApplicationData {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const initialApplicationData: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employmentType: '',
  companyName: '',
  salary: '',
  salaryCertificate: null,
  nationalId: null,
};

export const STEP_CONFIG = [
  { id: 'start', title: 'Start', description: 'Begin application' },
  { id: 'details', title: 'Details', description: 'Personal information' },
  { id: 'documents', title: 'Documents', description: 'Upload documents' },
  { id: 'confirmation', title: 'Confirm', description: 'Review details' },
  { id: 'status', title: 'Status', description: 'Application status' },
] as const;
