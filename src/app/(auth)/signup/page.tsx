import RegisterForm from '@/features/auth/components/RegisterForm'
import { requireUnAuth } from '@/lib/auth-utils';
import React from 'react'

const page = async () => {
  await requireUnAuth();
  return <RegisterForm />
}

export default page
