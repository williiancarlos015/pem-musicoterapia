'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function verificarSessao() {

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      router.push('/dashboard')
    }
  }

  async function fazerLogin() {

    if (!email || !senha) {
      alert('Preencha e-mail e senha')
      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password: senha,

      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  useEffect(() => {

    verificarSessao()

  }, [])

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-green-700">
            PEM
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
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 transition text-white py-4 rounded-2xl font-semibold text-lg"
          >

            {loading
              ? 'Entrando...'
              : 'Entrar no Sistema'}

          </button>

        </div>

      </div>

    </div>
  )
}