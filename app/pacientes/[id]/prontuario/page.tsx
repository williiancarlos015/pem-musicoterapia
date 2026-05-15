'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import Link from 'next/link'

import { supabase } from '../../../../lib/supabase'

interface Evolucao {

  id: number

  objetivo: string

  evolucao: string

  created_at: string
}

export default function ProntuarioPage() {

  const params = useParams()

  const [evolucoes, setEvolucoes] =
    useState<Evolucao[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    carregarEvolucoes()

  }, [])

  async function carregarEvolucoes() {

    try {

      const { data, error } =
        await supabase
          .from('evolucoes')
          .select('*')
          .eq(
            'paciente_id',
            String(params.id)
          )
          .order('created_at', {
            ascending: false
          })

      if (error) {

        console.error(error)
        return
      }

      setEvolucoes(data || [])

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <aside className="w-72 bg-green-800 text-white p-8 hidden md:flex flex-col">

        <h1 className="text-3xl font-bold mb-10">
          PEM
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            href="/dashboard"
            className="bg-green-700 px-5 py-4 rounded-2xl"
          >
            Dashboard
          </Link>

          <Link
            href="/pacientes"
            className="bg-green-700 px-5 py-4 rounded-2xl"
          >
            Pacientes
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Prontuário
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Histórico evolutivo do paciente
            </p>

          </div>

          <Link
            href={`/pacientes/${params.id}`}
            className="bg-slate-700 text-white px-6 py-3 rounded-2xl"
          >
            Voltar
          </Link>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          {loading && (

            <div>
              Carregando prontuário...
            </div>

          )}

          {!loading &&
            evolucoes.length === 0 && (

            <div className="text-slate-500">
              Nenhuma evolução registrada.
            </div>

          )}

          <div className="flex flex-col gap-6">

            {evolucoes.map((item) => (

              <div
                key={item.id}
                className="border rounded-2xl p-6"
              >

                <p className="font-bold text-green-700 mb-3">
                  {item.objetivo}
                </p>

                <p className="text-slate-700 whitespace-pre-line mb-4">
                  {item.evolucao}
                </p>

                <span className="text-slate-400 text-sm">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </span>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}