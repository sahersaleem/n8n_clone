import React from 'react'
import { requireAuth } from '@/lib/auth-utils'

const page = async () => {
  await requireAuth()
  return (
    <div>
      Workflow page
    </div>
  )
}

export default page
