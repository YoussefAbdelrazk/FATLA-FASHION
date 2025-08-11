'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Step1 } from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function StepsGroup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const router = useRouter();

  const handleStep1Next = (mobileNumber: string) => {
    setMobileNumber(mobileNumber);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleStep3Success = () => {
    router.push('/login');
  };

  //   return (
  //     <div className='mb-8'>
  //       <div className='flex items-center justify-between mb-2'>
  //         <span className='text-sm font-medium text-gray-700'>Step {currentStep} of 3</span>
  //         <span className='text-sm text-gray-500'>
  //           {currentStep === 1 && 'Email'}
  //           {currentStep === 2 && 'Verification'}
  //           {currentStep === 3 && 'Reset Password'}
  //         </span>
  //       </div>
  //       <div className='w-full bg-gray-200 rounded-full h-2'>
  //         <div
  //           className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out'
  //           style={{ width: `${(currentStep / 3) * 100}%` }}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className='max-w-xl mx-auto'>
      <div className=''>
        {currentStep === 1 && <Step1 onNext={handleStep1Next} />}

        {currentStep === 2 && (
          <Step2 mobileNumber={mobileNumber} onNext={handleStep2Next} onBack={handleStep2Back} />
        )}

        {currentStep === 3 && (
          <Step3
            mobileNumber={mobileNumber}
            onSuccess={handleStep3Success}
            onBack={handleStep3Back}
          />
        )}
      </div>
      {/* <p className='text-center text-gray-500 text-sm mt-4'>
        Don&apos;t have an account?{' '}
        <Link href='/signup' className='text-blue-600'>
          create account
        </Link>
      </p> */}
    </div>
  );
}
