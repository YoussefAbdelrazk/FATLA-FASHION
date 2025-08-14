'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

import { requestOtp, verifyOtp } from '@/services/auth/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  otpCode: z.string().min(6, { message: 'Please enter a valid 6-digit code' }),
});

interface Step2Props {
  mobileNumber: string;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({ mobileNumber, onNext, onBack }: Step2Props) {
  const [isResending, setIsResending] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('otpCode', value);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await requestOtp(mobileNumber);
      toast.success('OTP sent again!');
      setTimeLeft(60);
      setCanResend(false);
      setOtpValue('');
      setValue('otpCode', '');
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Failed to resend code'
          : 'Failed to resend code';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (data.otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    console.log(data, 'data');
    console.log(mobileNumber, 'mobileNumber');

    try {
      await verifyOtp(mobileNumber, data.otpCode);
      toast.success('Code verified successfully!');
      onNext();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Invalid verification code'
          : 'Invalid verification code';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='space-y-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <Button variant='outline' className='' onClick={onBack}>
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <h2 className='text-2xl font-bold text-gray-800'>Verify OTP</h2>
        <p className='text-gray-500 mt-2'>
          We&apos;ve sent a 6-digit code to <strong>{mobileNumber}</strong>
        </p>
        <div className='space-y-4'>
          <Label htmlFor='otp' className='text-center block'>
            Enter Verification Code
          </Label>
          <div className='flex justify-center'>
            <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className='text-center mt-4'>
            {!canResend ? (
              <p className='text-sm text-gray-500'>
                You can request another code in: <span className='font-semibold '>{timeLeft}s</span>
              </p>
            ) : (
              <Button
                type='button'
                variant='outline'
                onClick={handleResendCode}
                disabled={isResending}
                className='text-blue-600  hover:bg-blue-50'
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            )}
          </div>
          {errors.otpCode && (
            <p className='text-red-500 text-sm text-center'>{errors.otpCode.message}</p>
          )}
        </div>

        <div className='space-y-3'>
          <Button type='submit' className='w-full    text-white'>
            Verify Code
          </Button>
        </div>
      </form>
    </div>
  );
}
