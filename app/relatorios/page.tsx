'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import jsPDF from 'jspdf'

import { supabase } from '../../lib/supabase'

interface Paciente {

  id: number

  nome: string

  diagnostico: string

  responsavel: string
}

interface Evolucao {

  id: number

  objetivo: string

  evolucao: string

  created_at: string
}

export default function RelatoriosPage() {

  const [pacientes, setPacientes] =
    useState<Paciente[]>([])

  const [pacienteId, setPacienteId] =
    useState(0)

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

    carregarPacientes()

  }, [])

  async function carregarPacientes() {

    const { data } =
      await supabase
        .from('pacientes')
        .select('*')
        .order('nome')

    setPacientes(data || [])
  }

  async function gerarPDF() {

    try {

      if (!pacienteId) {

        alert('Selecione um paciente')
        return
      }

      setLoading(true)

      const paciente =
        pacientes.find(
          (p) =>
            p.id === pacienteId
        )

      const { data } =
        await supabase
          .from('evolucoes')
          .select('*')
          .eq(
            'paciente_id',
            String(pacienteId)
          )
          .order('created_at', {
            ascending: false
          })

      const evolucoes =
        data as Evolucao[]

      const doc = new jsPDF()

      let y = 20

      doc.setFontSize(22)

      doc.text(
        'PEM Musicoterapia',
        20,
        y
      )

      y += 12

      doc.setFontSize(14)

      doc.text(
        'Relatório Clínico',
        20,
        y
      )

      y += 20

      doc.setFontSize(12)

      doc.text(
        `Paciente: ${paciente?.nome || ''}`,
        20,
        y
      )

      y += 10

      doc.text(
        `Diagnóstico: ${paciente?.diagnostico || ''}`,
        20,
        y
      )

      y += 10

      doc.text(
        `Responsável: ${paciente?.responsavel || ''}`,
        20,
        y
      )

      y += 20

      doc.setFontSize(16)

      doc.text(
        'Histórico Evolutivo',
        20,
        y
      )

      y += 15

      evolucoes.forEach((item) => {

        if (y > 250) {

          doc.addPage()

          y = 20
        }

        doc.setFontSize(13)

        doc.text(
          `Objetivo: ${item.objetivo}`,
          20,
          y
        )

        y += 8

        doc.setFontSize(11)

        const texto =
          doc.splitTextToSize(
            item.evolucao,
            170
          )

        doc.text(
          texto,
          20,
          y
        )

        y += texto.length * 6

        doc.text(
          `Data: ${new Date(
            item.created_at
          ).toLocaleDateString()}`,
          20,
          y
        )

        y += 15
      })

      y += 20

      doc.text(
        '__________________________________',
        20,
        y
      )

      y += 10

      doc.text(
        'Musicoterapeuta Responsável',
        20,
        y
      )

      doc.save(
        `relatorio-${paciente?.nome}.pdf`
      )

    } catch (error) {

      console.error(error)

      alert('Erro ao gerar PDF')

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
            href="/relatorios"
            className="bg-green-600 px-5 py-4 rounded-2xl"
          >
            Relatórios
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-green-700">
            Relatórios Clínicos
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Exportação profissional PDF
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Gerar Relatório
          </h2>

          <div className="flex flex-col gap-5">

            <select
              value={pacienteId}
              onChange={(e) =>
                setPacienteId(
                  Number(e.target.value)
                )
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

            <button
              onClick={gerarPDF}
              disabled={loading}
              className="bg-green-700 hover:bg-green-600 transition text-white px-8 py-4 rounded-2xl font-semibold"
            >

              {loading
                ? 'Gerando PDF...'
                : 'Gerar Relatório PDF'}

            </button>

          </div>

        </div>

      </main>

    </div>
  )
}