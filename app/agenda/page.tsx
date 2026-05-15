'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { supabase } from '../../lib/supabase'

interface Paciente {

  id: number

  nome: string
}

interface Agendamento {

  id?: number

  paciente_id: number

  paciente_nome: string

  data: string

  horario: string

  observacoes: string

  status: string
}

export default function AgendaPage() {

  const [pacientes, setPacientes] =
    useState<Paciente[]>([])

  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>([])

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState<Agendamento>({

      paciente_id: 0,

      paciente_nome: '',

      data: '',

      horario: '',

      observacoes: '',

      status: 'Agendado'
    })

  useEffect(() => {

    carregarPacientes()

    carregarAgenda()

  }, [])

  async function carregarPacientes() {

    const { data } =
      await supabase
        .from('pacientes')
        .select('*')
        .order('nome')

    setPacientes(data || [])
  }

  async function carregarAgenda() {

    const { data } =
      await supabase
        .from('agenda')
        .select('*')
        .order('data', {
          ascending: true
        })

    setAgendamentos(data || [])
  }

  async function salvarAgendamento() {

    try {

      if (
        !form.paciente_id ||
        !form.data ||
        !form.horario
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

      const agendamento = {

        ...form,

        paciente_nome:
          paciente?.nome || ''
      }

      const { error } =
        await supabase
          .from('agenda')
          .insert([agendamento])

      if (error) {

        console.error(error)

        alert(JSON.stringify(error))

        return
      }

      alert('Agendamento criado')

      setForm({

        paciente_id: 0,

        paciente_nome: '',

        data: '',

        horario: '',

        observacoes: '',

        status: 'Agendado'
      })

      carregarAgenda()

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  async function atualizarStatus(
    id: number,
    status: string
  ) {

    await supabase
      .from('agenda')
      .update({ status })
      .eq('id', id)

    carregarAgenda()
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
            href="/agenda"
            className="bg-green-600 px-5 py-4 rounded-2xl"
          >
            Agenda
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-green-700">
            Agenda Clínica
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Gestão de sessões terapêuticas
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Novo Agendamento
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
              type="date"
              value={form.data}
              onChange={(e) =>
                setForm({
                  ...form,
                  data: e.target.value
                })
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="time"
              value={form.horario}
              onChange={(e) =>
                setForm({
                  ...form,
                  horario: e.target.value
                })
              }
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Observações"
              value={form.observacoes}
              onChange={(e) =>
                setForm({
                  ...form,
                  observacoes:
                    e.target.value
                })
              }
              className="border p-4 rounded-2xl h-32 md:col-span-2"
            />

          </div>

          <button
            onClick={salvarAgendamento}
            disabled={loading}
            className="mt-8 bg-green-700 hover:bg-green-600 transition text-white px-8 py-4 rounded-2xl font-semibold"
          >

            {loading
              ? 'Salvando...'
              : 'Salvar Agendamento'}

          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Próximas Sessões
          </h2>

          <div className="flex flex-col gap-5">

            {agendamentos.map((item) => (

              <div
                key={item.id}
                className="border rounded-2xl p-6"
              >

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h3 className="text-xl font-bold text-green-700">
                      {item.paciente_nome}
                    </h3>

                    <p className="text-slate-500">
                      {item.data}
                      {' • '}
                      {item.horario}
                    </p>

                  </div>

                  <span className="bg-slate-200 px-4 py-2 rounded-xl">
                    {item.status}
                  </span>

                </div>

                <p className="mb-5">
                  {item.observacoes}
                </p>

                <div className="flex gap-3 flex-wrap">

                  <button
                    onClick={() =>
                      atualizarStatus(
                        item.id!,
                        'Confirmado'
                      )
                    }
                    className="bg-green-700 text-white px-5 py-2 rounded-xl"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={() =>
                      atualizarStatus(
                        item.id!,
                        'Finalizado'
                      )
                    }
                    className="bg-blue-700 text-white px-5 py-2 rounded-xl"
                  >
                    Finalizar
                  </button>

                  <button
                    onClick={() =>
                      atualizarStatus(
                        item.id!,
                        'Falta'
                      )
                    }
                    className="bg-red-700 text-white px-5 py-2 rounded-xl"
                  >
                    Falta
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}