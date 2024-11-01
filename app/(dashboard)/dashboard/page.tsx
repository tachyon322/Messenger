import React from 'react'
import { FC } from 'react'
import { getServerSession } from 'next-auth'
import { get } from 'http'
import { authOptions } from '@/lib/auth'

interface pageProps {

}

const page = async ({}) => {

  const session = await getServerSession(authOptions)

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default page 