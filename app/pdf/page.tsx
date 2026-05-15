'use client'

import { useState } from 'react'
import Link from 'next/link'
import jsPDF from 'jspdf'

export default function PdfPage() {

  const [nome, setNome] = useState('')
  const [conteudo, setConteudo] = useState('')

  function gerarPDF() {

    if (!nome || !conteudo) {
      alert('Preencha todos os campos')
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(22)

    doc.text(
      'PEM Musicoterapia',
      20,
      20
    )

    doc.setFontSize(12)

    doc.text(
      `Paciente: ${nome}`,
      20,
      40
    )

    const linhas =
      doc.splitTextToSize(
        conteudo,
        170
      )

    doc.text(
      linhas,
      20,
      60
    )

    doc.save(
      `relatorio-${nome}.pdf`
    )
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
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Assistente IA
          </Link>

          <Link
            href="/pdf"
            className="bg-green-600 hover:bg-green-500 transition px-5 py-4 rounded-2xl font-semibold border border-green-400"
          >
            Gerar PDF
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Gerador de PDF
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Relatórios clínicos profissionais
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

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Nome do paciente"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Conteúdo do relatório"
              value={conteudo}
              onChange={(e) =>
                setConteudo(e.target.value)
              }
              className="border p-4 rounded-2xl h-80"
            />

            <button
              onClick={gerarPDF}
              className="bg-green-700 text-white px-6 py-4 rounded-2xl hover:bg-green-600 transition font-semibold"
            >
              Gerar PDF
            </button>

          </div>

        </div>

      </main>

    </div>
  )
}