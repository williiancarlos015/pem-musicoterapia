'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AgendaPage() {

  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [pacientes, setPacientes] = useState<any[]>([])

  const [pacienteId, setPacienteId] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [tipo, setTipo] = useState('Musicoterapia Infantil')

  async function carregarPacientes() {

    const { data, error } = await supabase
      .from('pacientes')
      .select('*')
      .order('nome')

    console.log(data)
    console.log(error)

    if (data) {
      setPacientes(data)
    }
  }

  async function carregarAgenda() {

    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .order('id', { ascending: false })

    console.log(data)
    console.log(error)

    if (data) {
      setAgendamentos(data)
    }
  }

  async function salvarAgendamento() {

    const pacienteSelecionado = pacientes.find(
      (p) => p.id == pacienteId
    )

    const { error } = await supabase
      .from('agenda')
      .insert([
        {
          paciente_id: pacienteId,
          paciente: pacienteSelecionado?.nome,
          data,
          hora,
          tipo,
          status: 'Agendado',
        },
      ])

    if (error) {
      alert(error.message)
      return
    }

    alert('Sessão agendada com sucesso')

    setPacienteId('')
    setData('')
    setHora('')

    carregarAgenda()
  }

  useEffect(() => {

    carregarPacientes()
    carregarAgenda()

  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Agenda Clínica
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Novo Agendamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            value={pacienteId}
            onChange={(e) =>
              setPacienteId(e.target.value)
            }
            className="border p-4 rounded-2xl"
          >

            <option value="">
              Selecione um paciente
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

          <select
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value)
            }
            className="border p-4 rounded-2xl"
          >
            <option>Musicoterapia Infantil</option>
            <option>Musicoterapia Adulto</option>
            <option>Reabilitação Neurológica</option>
            <option>Estimulação Cognitiva</option>
          </select>

          <input
            type="date"
            value={data}
            onChange={(e) =>
              setData(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="time"
            value={hora}
            onChange={(e) =>
              setHora(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

        </div>

        <button
          onClick={salvarAgendamento}
          className="bg-green-700 text-white px-6 py-3 rounded-2xl mt-6"
        >
          Agendar Sessão
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Próximos Agendamentos
        </h2>

        <div className="flex flex-col gap-4">

          {agendamentos.map((item) => (

            <div
              key={item.id}
              className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >

              <div>
                <h3 className="text-xl font-bold text-green-700">
                  {item.paciente}
                </h3>

                <p className="text-slate-600 mt-1">
                  {item.tipo}
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">
                  {item.data}
                </p>

                <p className="text-slate-500">
                  {item.hora}
                </p>
              </div>

              <div>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {item.status}
                </span>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}
