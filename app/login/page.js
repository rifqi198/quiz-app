"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    console.log(username)
    console.log(password)

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
        (user) => user.username === username && user.password === password
        );
        if(user){
            router.push('/quiz')
        }else{
            alert("username and/or password doesn't exist")
        }
    }

    return(
        <div className="flex flex-col gap-10 h-dvh items-center justify-center">
            <h1 className="text-5xl font-bold">Login</h1>
            <form action={handleLogin} className="flex flex-col gap-5 bg-slate-100 px-5 py-10 rounded-lg">
                <input onChange={e => setUsername(e.target.value)} aria-label="username" type="text" placeholder="Username" className="border-2 border-blue-300 rounded-md px-2 py-2"></input>
                <input onChange={e => setPassword(e.target.value)} aria-label="password" type="password" placeholder="Password" className="border-2 border-blue-300 rounded-md px-2 py-2"></input>
                <button type="submit" className="bg-blue-300 py-2 rounded-md cursor-pointer font-semibold">Login</button>
            </form>
        </div>
    )
}