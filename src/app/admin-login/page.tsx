'use client'

import { useState } from 'react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.href = '/admin'
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border p-6 rounded-lg">
        <h1 className="text-xl font-bold">Acceso Admin</h1>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button className="w-full bg-black text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  )
}
