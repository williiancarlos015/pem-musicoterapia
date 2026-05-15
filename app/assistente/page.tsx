'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AssistentePage() {

  const [objetivo, setObjetivo] = useState('')
  const [tecnicas, setTecnicas] = useState('')
  const [comportamento, setComportamento] =
    useState('')

  const [resultado, setResultado] =
    useState('')

  function gerarEvolucao() {

    if (
      !objetivo ||
      !tecnicas ||
      !comportamento
    ) {

      alert('Preencha todos os campos')
      return
    }

    const texto = `
Sessão de musicoterapia realizada com foco em ${objetivo}.

Durante o atendimento foram utilizadas as seguintes estratégias terapêuticas:
${tecnicas}.

O paciente apresentou comportamento ${comportamento} durante a sessão, demonstrando respostas terapêuticas compatíveis com os objetivos propostos.

Observou-se participação ativa nas experiências musicais, favorecendo estímulos cognitivos, emocionais, motores e relacionais.

Recomenda-se continuidade terapêutica para fortalecimento do processo evolutivo e consolidação das habilidades trabalhadas.
`

    setResultado(texto)
  }

  function gerarResumoPais() {

    if (
      !objetivo ||
      !tecnicas ||
      !comportamento
    ) {

      alert('Preencha todos os campos')
      return
    }

    const texto = `
Hoje trabalhamos atividades musicais voltadas para ${objetivo}.

Durante a sessão foram realizadas experiências com ${tecnicas}, buscando estimular desenvolvimento terapêutico de maneira lúdica e acolhedora.

O paciente apresentou comportamento ${comportamento}, participando das propostas terapêuticas de forma positiva.

Seguiremos fortalecendo os objetivos terapêuticos nas próximas sessões.
`

    setResultado(texto)
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
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Dashboard
          </Link>

          <Link
            href="/pacientes"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Pacientes
          </Link>

          <Link
            href="/agenda"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Agenda
          </Link>

          <Link
            href="/sessoes"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Sessões
          </Link>

          <Link
            href="/relatorios"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Relatórios
          </Link>

          <Link
            href="/financeiro"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Financeiro
          </Link>

          <Link
            href="/indicadores"
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Indicadores
          </Link>

          <Link
            href="/assistente"
            className="bg-green-600 hover:bg-green-500 transition px-5 py-4 rounded-2xl font-semibold border border-green-400"
          >
            Assistente IA
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Assistente Clínico IA
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Auxílio inteligente para evolução clínica
            </p>

          </div>

          <Link
            href="/dashboard"
            className="bg-green-700 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition"
          >
            Dashboard
          </Link>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="grid grid-cols-1 gap-5">

            <input
              type="text"
              placeholder="Objetivo terapêutico"
              value={objetivo}
              onChange={(e) =>
                setObjetivo(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Técnicas utilizadas"
              value={tecnicas}
              onChange={(e) =>
                setTecnicas(e.target.value)
              }
              className="border p-4 rounded-2xl h-32"
            />

            <textarea
              placeholder="Comportamento do paciente"
              value={comportamento}
              onChange={(e) =>
                setComportamento(e.target.value)
              }
              className="border p-4 rounded-2xl h-32"
            />

          </div>

          <div className="flex gap-4 mt-6 flex-wrap">

            <button
              onClick={gerarEvolucao}
              className="bg-green-700 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition"
            >
              Gerar Evolução Clínica
            </button>

            <button
              onClick={gerarResumoPais}
              className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition"
            >
              Gerar Resumo para Pais
            </button>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Resultado Gerado
          </h2>

          <textarea
            value={resultado}
            readOnly
            className="w-full border rounded-2xl p-5 h-96"
          />

        </div>

      </main>

    </div>
  )
}