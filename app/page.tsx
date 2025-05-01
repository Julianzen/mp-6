'use client'

export default function Home() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI
        const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user%20user:email`
        window.location.href = githubAuthURL
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/egg.png')" }}>
            <div className="text-center p-8 bg-white bg-opacity-75 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">OAuth Demo</h1>
                <button
                    onClick={handleLogin}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Sign in with GitHub
                </button>
            </div>
        </div>
    )
}