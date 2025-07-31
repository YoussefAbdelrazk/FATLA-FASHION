'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
import { requestOtp } from '@/services/auth/AuthService';
import { toast } from 'sonner';

const formSchema = z.object({
  mobileNumber: z.string().min(10, 'Phone number must be at least 10 characters long'),
});

const defaultValues = {
  mobileNumber: '',
};

type FormValues = z.infer<typeof formSchema>;

export function RequestOtpForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await toast.promise(requestOtp(data.mobileNumber), {
        loading: 'Requesting OTP...',
        success: 'OTP sent successfully! Please check your phone.',
        error: 'Failed to send OTP. Please try again.',
      });

      // Store mobile number in session storage for next step
      sessionStorage.setItem('resetMobileNumber', data.mobileNumber);
      router.push('/verify-otp');
    } catch (error) {
      console.error('Request OTP error:', error);
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
              <FormDescription>We&apos;ll send an OTP to this number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Send OTP
        </Button>
      </form>
    </Form>
  );
}
