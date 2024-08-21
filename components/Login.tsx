"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"


function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
        <Image
            src="/login.png"
            width={200}
            height={200}
            className="rounded-lg mb-10"
            alt="SIMRIK-login"
        />

        <button onClick={()=> signIn("google")} className="font-normal text-xl animate-pulse bg-neutral-400 dark:bg-neutral-600 p-4 rounded-lg">Sign In To Use SIMRIK</button>
    </div>

  )
}

export default Login