import LoginForm from '@/features/auth/components/LoginForm'
import { requireUnAuth } from '@/lib/auth-utils';
import React from 'react'

const page = async () => {
  await requireUnAuth();
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <LoginForm/>
    </div>
  )
}

export default page
