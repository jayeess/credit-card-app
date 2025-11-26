import { z } from 'zod';

export const customerDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^05\d{8}$/, 'Phone must be UAE format (05XXXXXXXX)'),
  employmentType: z.enum(['self_employed', 'salaried', 'student', 'unemployed'], {
    message: 'Please select an employment type',
  }),
  companyName: z.string(),
  salary: z.string(),
}).superRefine((data, ctx) => {
  if (data.employmentType === 'self_employed' || data.employmentType === 'salaried') {
    if (!data.companyName || data.companyName.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Company name is required for employed individuals',
        path: ['companyName'],
      });
    }
    if (!data.salary || data.salary.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Salary is required for employed individuals',
        path: ['salary'],
      });
    } else if (isNaN(Number(data.salary)) || Number(data.salary) <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please enter a valid salary amount',
        path: ['salary'],
      });
    }
  }
});

export type CustomerDetailsFormData = z.infer<typeof customerDetailsSchema>;

export const validateCustomerDetails = (data: CustomerDetailsFormData) => {
  const result = customerDetailsSchema.safeParse(data);
  if (result.success) {
    return { success: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  const issues = result.error.issues;
  issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return { success: false, errors };
};
