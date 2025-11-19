import LoginForm from '@/features/auth/components/LoginForm'
import { requireUnAuth } from '@/lib/auth-utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
  await requireUnAuth();
  return <LoginForm />
}

export default page
