import * as z from 'zod';

export const biodataSchema = z.object({
  profileImage: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  fullName: z.string().min(1, 'Full name is required'),
  dob: z.date({
    required_error: 'Date of birth is required.',
  }),
  height: z.string().min(1, 'Height is required'),
  religion: z.string().min(1, 'Religion is required'),
  caste: z.string().min(1, 'Caste is required'),
  education: z.string().min(1, 'Education is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  siblings: z.string().optional(),
  contact: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
});

export type Biodata = z.infer<typeof biodataSchema>;
