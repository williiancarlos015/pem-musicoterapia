'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { supabase } from '../../lib/supabase'

interface Paciente {

  id: number

  nome: string

  diagnostico: string

  responsavel: string
}

export default function PacientesPage() {

  const [pacientes, setPacientes] =
    useState<Paciente[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    carregarPacientes()

  }, [])

  async function carregarPacientes() {

    try {

      const { data, error } =
        await supabase
          .from('pacientes')
          .select('*')
          .order('nome')

      if (error) {

        console.error(error)
        return
      }

      setPacientes(data || [])

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
            className="bg-green-600 px-5 py-4 rounded-2xl"
          >
            Pacientes
          </Link>

          <Link
            href="/sessoes"
            className="bg-green-700 px-5 py-4 rounded-2xl"
          >
            Sessões
          </Link>

          <Link
            href="/relatorios"
            className="bg-green-700 px-5 py-4 rounded-2xl"
          >
            Relatórios
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Pacientes
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Gestão clínica de pacientes
            </p>

          </div>

          <Link
            href="/pacientes/novo"
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Novo Paciente
          </Link>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          {loading && (

            <div>
              Carregando pacientes...
            </div>

          )}

          {!loading && pacientes.length === 0 && (

            <div className="text-slate-500">
              Nenhum paciente cadastrado.
            </div>

          )}

          <div className="flex flex-col gap-5">

            {pacientes.map((paciente) => (

              <div
                key={paciente.id}
                className="border rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
              >

                <div>

                  <h2 className="text-2xl font-bold text-green-700">
                    {paciente.nome}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Diagnóstico:
                    {' '}
                    {paciente.diagnostico || 'Não informado'}
                  </p>

                  <p className="text-slate-500">
                    Responsável:
                    {' '}
                    {paciente.responsavel || 'Não informado'}
                  </p>

                </div>

                <div className="flex gap-3 flex-wrap">

                  <Link
                    href={`/pacientes/${paciente.id}`}
                    className="bg-slate-700 text-white px-5 py-3 rounded-2xl"
                  >
                    Perfil
                  </Link>

                  <Link
                    href={`/pacientes/${paciente.id}/prontuario`}
                    className="bg-green-700 text-white px-5 py-3 rounded-2xl"
                  >
                    Prontuário
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}