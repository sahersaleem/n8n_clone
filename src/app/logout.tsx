"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()
  return (
    <div>
      <Button onClick={() => authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login')
          }
        }
      })}>logout</Button>

    </div>
  )
}

export default Logout
