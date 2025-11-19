import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center items-center min-h-svh p-6 gap-6 md:p-10 bg-muted'>
            <div className='w-full max-w-sm gap-6 flex flex-col'>
                <Link href='/' className='flex items-center self-center gap-2 font-medium'>
                    <Image src='/logo/logo.svg' alt='Logo' width={30} height={30} />
                    Nodebase
                </Link>
                {children}
            </div>

        </div>

    )
}

export default AuthLayout
