'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
                <p className="mb-4">Something went wrong during authentication:</p>
                <div className="rounded bg-gray-100 p-3">
                    <pre className="whitespace-pre-wrap break-words text-sm">{error}</pre>
                </div>
            </div>
        </div>
    )
}

export default function ErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorContent />
        </Suspense>
    )
}