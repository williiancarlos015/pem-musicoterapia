'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Page() {

  const [sessoes, setSessoes] = useState<any[]>([])
  const [pacientes, setPacientes] = useState<any[]>([])

  const [pacienteId, setPacienteId] = useState('')
  const [objetivo, setObjetivo] = useState('')

  async function carregarSessoes() {

    const { data, error } = await supabase
      .from('sessoes')
      .select('*')
      .order('id', { ascending: false })

    console.log(data)
    console.log(error)

    if (data) {
      setSessoes(data)
    }
  }

  async function carregarPacientes() {

    const { data, error } = await supabase
      .from('pacientes')
      .select('*')

    console.log(data)
    console.log(error)

    if (data) {
      setPacientes(data)
    }
  }

  async function salvarSessao() {

    const pacienteSelecionado = pacientes.find(
      (p) => p.id == pacienteId
    )

    const { error } = await supabase
      .from('sessoes')
      .insert([
        {
          paciente_id: pacienteId,
          paciente: pacienteSelecionado?.nome,
          objetivo: objetivo,
        },
      ])

    if (error) {
      alert(error.message)
      return
    }

    alert('Sessão salva')

    setPacienteId('')
    setObjetivo('')

    carregarSessoes()
  }

  useEffect(() => {

    carregarSessoes()

    carregarPacientes()

  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Sessões Clínicas
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <div className="flex flex-col gap-4">

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

          <textarea
            placeholder="Objetivo terapêutico"
            value={objetivo}
            onChange={(e) =>
              setObjetivo(e.target.value)
            }
            className="border p-4 rounded-2xl h-32"
          />

          <button
            onClick={salvarSessao}
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Salvar Sessão
          </button>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Histórico de Sessões
        </h2>

        <div className="flex flex-col gap-4">

          {sessoes.map((sessao) => (

            <div
              key={sessao.id}
              className="border rounded-2xl p-4"
            >

              <p className="font-bold text-lg">
                {sessao.paciente}
              </p>

              <p className="text-slate-600 mt-2">
                {sessao.objetivo}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}