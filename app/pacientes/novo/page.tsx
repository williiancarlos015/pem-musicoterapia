'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function NovoPacientePage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] = useState({

    nome: '',
    nascimento: '',
    diagnostico: '',
    cid: '',
    responsavel: '',
    telefone: '',
    endereco: '',
    escola: '',
    medicamentos: '',
    objetivos: '',
    observacoes: ''
  })

  function atualizarCampo(
    campo: string,
    valor: string
  ) {

    setForm((prev) => ({
      ...prev,
      [campo]: valor
    }))
  }

  async function salvarPaciente() {

    try {

      if (!form.nome) {

        alert('Informe o nome do paciente')
        return
      }

      setLoading(true)

      const { error } =
        await supabase
          .from('pacientes')
          .insert([
            {
              nome: form.nome,
              nascimento: form.nascimento,
              diagnostico: form.diagnostico,
              cid: form.cid,
              responsavel: form.responsavel,
              telefone: form.telefone,
              endereco: form.endereco,
              escola: form.escola,
              medicamentos: form.medicamentos,
              objetivos: form.objetivos,
              observacoes: form.observacoes
            }
          ])

     if (error) {

  console.error(error)

  alert(
    JSON.stringify(error)
  )

  return
}

      alert('Paciente cadastrado com sucesso')

      router.push('/pacientes')

    } catch (error) {

      console.error(error)

      alert('Erro inesperado')

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
              Novo Paciente
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Cadastro clínico completo
            </p>

          </div>

          <Link
            href="/pacientes"
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Voltar
          </Link>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Nome do paciente"
              value={form.nome}
              onChange={(e) =>
                atualizarCampo(
                  'nome',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="date"
              value={form.nascimento}
              onChange={(e) =>
                atualizarCampo(
                  'nascimento',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Diagnóstico"
              value={form.diagnostico}
              onChange={(e) =>
                atualizarCampo(
                  'diagnostico',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="CID"
              value={form.cid}
              onChange={(e) =>
                atualizarCampo(
                  'cid',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Responsável"
              value={form.responsavel}
              onChange={(e) =>
                atualizarCampo(
                  'responsavel',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) =>
                atualizarCampo(
                  'telefone',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Endereço"
              value={form.endereco}
              onChange={(e) =>
                atualizarCampo(
                  'endereco',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl md:col-span-2"
            />

            <input
              type="text"
              placeholder="Escola"
              value={form.escola}
              onChange={(e) =>
                atualizarCampo(
                  'escola',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl md:col-span-2"
            />

            <textarea
              placeholder="Medicamentos"
              value={form.medicamentos}
              onChange={(e) =>
                atualizarCampo(
                  'medicamentos',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl h-32 md:col-span-2"
            />

            <textarea
              placeholder="Objetivos terapêuticos"
              value={form.objetivos}
              onChange={(e) =>
                atualizarCampo(
                  'objetivos',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl h-40 md:col-span-2"
            />

            <textarea
              placeholder="Observações clínicas"
              value={form.observacoes}
              onChange={(e) =>
                atualizarCampo(
                  'observacoes',
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl h-40 md:col-span-2"
            />

          </div>

          <button
            onClick={salvarPaciente}
            disabled={loading}
            className="mt-8 bg-green-700 hover:bg-green-600 transition text-white px-8 py-4 rounded-2xl font-semibold"
          >

            {loading
              ? 'Salvando...'
              : 'Salvar Paciente'}

          </button>

        </div>

      </main>

    </div>
  )
}