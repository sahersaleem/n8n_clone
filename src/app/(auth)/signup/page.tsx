import RegisterForm from '@/features/auth/components/RegisterForm'
import { requireUnAuth } from '@/lib/auth-utils';
import React from 'react'

const page = async() => {
 
  await requireUnAuth();
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <RegisterForm />
    </div>
  )
}

export default page
