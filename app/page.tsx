'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-green-700">
            PEM Musicoterapia
          </h1>

          <p className="text-slate-500 mt-3">
            Prontuário Eletrônico Musicoterapêutico
          </p>

        </div>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-slate-300 rounded-2xl p-4"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            className="border border-slate-300 rounded-2xl p-4"
          />

          <button
            onClick={fazerLogin}
            className="bg-green-700 hover:bg-green-800 transition text-white py-4 rounded-2xl font-semibold"
          >
            Entrar no Sistema
          </button>

        </div>

      </div>

    </div>
  )
}