'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { verifyOtp } from '@/services/auth/AuthService';
import { toast } from 'sonner';

const formSchema = z.object({
  mobileNumber: z.string().min(10, 'Phone number must be at least 10 characters long'),
  otpCode: z
    .string()
    .min(4, 'OTP must be at least 4 characters')
    .max(6, 'OTP must be at most 6 characters'),
});

const defaultValues = {
  mobileNumber: '',
  otp: '',
};

type FormValues = z.infer<typeof formSchema>;

export function VerifyOtpForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Load mobile number from session storage
  useEffect(() => {
    const storedMobileNumber = sessionStorage.getItem('resetMobileNumber');
    if (storedMobileNumber) {
      form.setValue('mobileNumber', storedMobileNumber);
    }
  }, [form]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await toast.promise(verifyOtp(data.mobileNumber, data.otpCode), {
        loading: 'Verifying OTP...',
        success: 'OTP verified successfully!',
        error: 'Invalid OTP. Please try again.',
      });

      router.push('/reset-password');
    } catch (error) {
      console.error('Verify OTP error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method='POST' className='space-y-6'>
        <FormField
          control={form.control}
          name='mobileNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input placeholder='Enter your mobile number' {...field} />
              </FormControl>
              <FormDescription>This is the number you used to request OTP</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='otpCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP Code</FormLabel>
              <FormControl>
                <Input placeholder='Enter OTP code' {...field} />
              </FormControl>
              <FormDescription>Enter the 4-6 digit code sent to your phone</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Verify OTP
        </Button>
      </form>
    </Form>
  );
}
