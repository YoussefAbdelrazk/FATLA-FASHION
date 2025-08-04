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
import { resetPassword } from '@/services/auth/AuthService';
import { toast } from 'sonner';

const formSchema = z
  .object({
    mobileNumber: z.string().nonempty('Phone number is required'),
    newPassword: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm password is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const defaultValues = {
  mobileNumber: '',
  newPassword: '',
  confirmPassword: '',
};

type FormValues = z.infer<typeof formSchema>;

export function ResetPasswordForm() {
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
      await toast.promise(
        resetPassword(data.mobileNumber, data.newPassword, data.confirmPassword),
        {
          loading: 'Resetting password...',
          success: 'Password reset successfully! You can now login.',
          error: 'Failed to reset password. Please try again.',
        },
      );

      // Clear session storage
      sessionStorage.removeItem('resetMobileNumber');
      router.push('/login');
    } catch (error) {
      console.error('Reset password error:', error);
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
              <FormDescription>This is the number you used for OTP verification</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter new password' {...field} />
              </FormControl>
              <FormDescription>Enter your new password (at least 6 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Confirm new password' {...field} />
              </FormControl>
              <FormDescription>Re-enter your new password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
