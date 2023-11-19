'use client'

import { useState } from "react"
import Link from "next/link";
import ErrorAlert from "./alerts/ErrorAlert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleUserSignIn(e){
        e.preventDefault()
        console.log(username, password)
        if(!username || !password){
            errorValidate("Please fill out all fields")
        }else{
            setIsLoading(true)
            try {
                const response = await signIn("credentials",{
                    username, password, redirect:false
                })
                if(response) setIsLoading(false)
                if(response.error){
                    errorValidate("Invalid login credentials")
                }
                if(response.ok){
                    router.replace("dashboard")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    function errorValidate(errMsg){
        setError(errMsg)
        setTimeout(() => {
            setError("")
        },6000)
    }

  return (
    <main>
        <form className="flex items-center justify-center flex-col bg-[#fff] mt-[5rem] p-5 mx-auto w-[50%] sign-up-form relative" onSubmit={handleUserSignIn}>
            <h2 className="font-bold text-lg mb-6">Sign In</h2>
            <div className="w-full">
                <label>Username</label>
                <input type="text" className="outline-none border border-gray-300" placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="w-full">
                <label>Password</label>
                <input type="password" className="outline-none border border-gray-300" placeholder='****' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {isLoading ?
                <button className="bg-[#7856FF] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                    {/* <i class="fa-solid fa-gear fa-spin"></i> */}
                    Loading...
                </button>
                :
                <button type="submit" onClick={handleUserSignIn} disabled={isLoading} className="bg-[#7856FF] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                    Sign In
                </button>
            }
            <p>Don't have an account? <Link href={'/register'} className="underline cursor-pointer">register</Link> </p>
            {error && <ErrorAlert error={error} /> }
        </form>
    </main>
  )
}
