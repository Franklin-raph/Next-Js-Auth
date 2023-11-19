'use client'

import { useState } from "react"
import Link from "next/link";
import ErrorAlert from "./alerts/ErrorAlert";

export default function RegisterForm() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleUserSignUp(e){
        e.preventDefault()
        console.log(username, password)
        if(!username || !password || !email){
            setError("Please fill out all fields")
            setTimeout(() => {
                setError("")
            },6000)
        }else{
            setIsLoading(true)
            try {
                const response = await fetch("api/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({username, email, password})
                })
                console.log(response)
                if(response) {
                    setIsLoading(false)
                    setTimeout(() => {
                        setError("")
                    },5000)
                }
                const data = await response.json()
                if(!response.ok) setError(data.message)
                if(response.ok){
                    setEmail("")
                    setUsername("")
                    setPassword("")
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <main>
        <form className="flex items-center justify-center flex-col bg-[#fff] mt-[4rem] p-5 mx-auto w-[50%] sign-up-form relative" onSubmit={handleUserSignUp}>
            <h2 className="font-bold text-lg mb-6">Sign Up</h2>
            <div className="w-full">
                <label>Username</label>
                <input type="text" className="outline-none border border-gray-300" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="w-full">
                <label>Email</label>
                <input type="email" className="outline-none border border-gray-300" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="w-full">
                <label>Password</label>
                <input type="password" className="outline-none border border-gray-300" placeholder='****' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {isLoading ?
                <button className="bg-[#7856FF] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                    <i class="fa-solid fa-gear fa-spin"></i>
                </button>
                :
                <button type="submit" onClick={handleUserSignUp} disabled={isLoading} className="bg-[#7856FF] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                    Sign Up
                </button>
            }
            <p>Already have an account? <Link href={'/login'} className="underline cursor-pointer">login</Link> </p>
            {error && <ErrorAlert error={error} /> }
        </form>
    </main>
  )
}
