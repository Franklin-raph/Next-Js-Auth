"use client"

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function UserDashboard() {
  const {data:session} = useSession()

  return (
    <div>
      UserDashboard
      <h1>{session?.user.username}</h1>
      <h1>{session?.user.email}</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}
