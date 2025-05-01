'use client'


import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function UserContent() {
    const params = useSearchParams()
    const name = params.get('name')
    const avatar = params.get('avatar_url')
    const login = params.get('login')

    return (
        <div className="flex items-center justify-center min-h-screen bg-center" style={{ backgroundImage: "url('/egg.png')" }}>
            <div className="text-center p-8 bg-white bg-opacity-75 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {name || login}!</h1>
                {avatar && (
                    <div className="flex justify-center mb-4">
                        <img src={avatar} alt="Avatar" className="rounded-full w-32 h-32" />
                    </div>
                )}
                <p className="mt-2">@{login}</p>
            </div>
        </div>
    )
}

export default function UserPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserContent />
        </Suspense>
    )
}