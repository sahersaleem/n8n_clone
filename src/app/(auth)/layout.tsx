
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import AuthLayout from '@/features/auth/components/AuthLayout';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default layout
