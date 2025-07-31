import { RequestOtpForm } from '@/components/auth/request-otp-form';

export default function RequestOtpPage() {
  return (
    <div className='bg-white shadow-2xl rounded-lg p-8'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Request OTP</h1>
        <p className='text-gray-600'>Enter your mobile number to receive an OTP</p>
      </div>
      <RequestOtpForm />
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Remember your password?{' '}
          <a href='/login' className='text-blue-600 hover:text-blue-800 font-medium'>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
