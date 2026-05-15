'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { supabase } from '../../lib/supabase'

interface Paciente {

  id: number

  nome: string
}

interface Sessao {

  id?: number

  paciente_id: number

  paciente_nome: string

  data: string

  objetivo: string

  tecnica: string

  resposta: string

  evolucao: string
}

export default function SessoesPage() {

  const [pacientes, setPacientes] =
    useState<Paciente[]>([])

  const [sessoes, setSessoes] =
    useState<Sessao[]>([])

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState<Sessao>({

      paciente_id: 0,

      paciente_nome: '',

      data: '',

      objetivo: '',

      tecnica: '',

      resposta: '',

      evolucao: ''
    })

  useEffect(() => {

    carregarPacientes()

    carregarSessoes()

  }, [])

  async function carregarPacientes() {

    const { data } =
      await supabase
        .from('pacientes')
        .select('*')
        .order('nome')

    setPacientes(data || [])
  }

  async function carregarSessoes() {

    const { data } =
      await supabase
        .from('sessoes')
        .select('*')
        .order('id', {
          ascending: false
        })

    setSessoes(data || [])
  }

  async function salvarSessao() {

    try {

      if (
        !form.paciente_id ||
        !form.data
      ) {

        alert('Preencha os campos obrigatórios')
        return
      }

      setLoading(true)

      const paciente =
        pacientes.find(
          (p) =>
            p.id === form.paciente_id
        )

      const sessao = {

        ...form,

        paciente_nome:
          paciente?.nome || ''
      }

      const { error } =
        await supabase
          .from('sessoes')
          .insert([sessao])

     alert(JSON.stringify(error))

      if (form.evolucao) {

        await supabase
          .from('evolucoes')
          .insert([
            {
              paciente_id:
                String(form.paciente_id),

              objetivo:
                form.objetivo,

              evolucao:
                form.evolucao
            }
          ])
      }

      alert('Sessão registrada')

      setForm({

        paciente_id: 0,

        paciente_nome: '',

        data: '',

        objetivo: '',

        tecnica: '',

        resposta: '',

        evolucao: ''
      })

      carregarSessoes()

    } catch (error) {

      console.error(error)

alert(String(error))

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

          <Link
            href="/sessoes"
            className="bg-green-600 px-5 py-4 rounded-2xl"
          >
            Sessões
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Sessões Clínicas
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Registro terapêutico integrado
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Nova Sessão
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <select
              value={form.paciente_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  paciente_id:
                    Number(e.target.value)
                })
              }
              className="border p-4 rounded-2xl"
            >

              <option value={0}>
                Selecione o paciente
              </option>

              {pacientes.map((paciente) => (

                <option
                  key={paciente.id}
                  value={paciente.id}
                >
                  {paciente.nome}
                </option>

              ))}

            </select>

            <input
              type="datetime-local"
              value={form.data}
              onChange={(e) =>
                setForm({
                  ...form,
                  data: e.target.value
                })
              }
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Objetivo da sessão"
              value={form.objetivo}
              onChange={(e) =>
                setForm({
                  ...form,
                  objetivo:
                    e.target.value
                })
              }
              className="border p-4 rounded-2xl h-32 md:col-span-2"
            />

            <textarea
              placeholder="Técnicas utilizadas"
              value={form.tecnica}
              onChange={(e) =>
                setForm({
                  ...form,
                  tecnica:
                    e.target.value
                })
              }
              className="border p-4 rounded-2xl h-32 md:col-span-2"
            />

            <textarea
              placeholder="Resposta do paciente"
              value={form.resposta}
              onChange={(e) =>
                setForm({
                  ...form,
                  resposta:
                    e.target.value
                })
              }
              className="border p-4 rounded-2xl h-32 md:col-span-2"
            />

            <textarea
              placeholder="Evolução clínica"
              value={form.evolucao}
              onChange={(e) =>
                setForm({
                  ...form,
                  evolucao:
                    e.target.value
                })
              }
              className="border p-4 rounded-2xl h-40 md:col-span-2"
            />

          </div>

          <button
            onClick={salvarSessao}
            disabled={loading}
            className="mt-8 bg-green-700 hover:bg-green-600 transition text-white px-8 py-4 rounded-2xl font-semibold"
          >

            {loading
              ? 'Salvando...'
              : 'Salvar Sessão'}

          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Sessões Registradas
          </h2>

          <div className="flex flex-col gap-5">

            {sessoes.map((sessao) => (

              <div
                key={sessao.id}
                className="border rounded-2xl p-6"
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-xl font-bold text-green-700">
                    {sessao.paciente_nome}
                  </h3>

                  <span className="text-slate-500">
                    {new Date(
                      sessao.data
                    ).toLocaleString()}
                  </span>

                </div>

                <p className="mb-2">
                  <strong>Objetivo:</strong>
                  {' '}
                  {sessao.objetivo}
                </p>

                <p className="mb-2">
                  <strong>Técnica:</strong>
                  {' '}
                  {sessao.tecnica}
                </p>

                <p className="mb-2">
                  <strong>Resposta:</strong>
                  {' '}
                  {sessao.resposta}
                </p>

                <p>
                  <strong>Evolução:</strong>
                  {' '}
                  {sessao.evolucao}
                </p>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}