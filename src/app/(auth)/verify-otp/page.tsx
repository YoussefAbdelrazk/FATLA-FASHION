import { VerifyOtpForm } from '@/components/auth/verify-otp-form';

export default function VerifyOtpPage() {
  return (
    <div className='bg-white shadow-2xl rounded-lg p-8'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Verify OTP</h1>
        <p className='text-gray-600'>Enter the OTP sent to your mobile number</p>
      </div>
      <VerifyOtpForm />
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Didn&apos;t receive OTP?{' '}
          <a href='/request-otp' className='text-blue-600 hover:text-blue-800 font-medium'>
            Request again
          </a>
        </p>
      </div>
    </div>
  );
}
