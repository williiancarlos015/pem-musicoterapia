'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function IndicadoresPage() {

  const [sessoes, setSessoes] = useState<any[]>([])

  async function carregarSessoes() {

    const { data } = await supabase
      .from('sessoes')
      .select('*')
      .order('created_at', {
        ascending: true,
      })

    setSessoes(data || [])
  }

  useEffect(() => {

    carregarSessoes()

  }, [])

  const evolucaoData = useMemo(() => {

    return sessoes.map((sessao, index) => ({

      sessao: `S${index + 1}`,

      engajamento:
        sessao.engajamento === 'Alto'
          ? 10
          : sessao.engajamento === 'Médio'
          ? 6
          : 3,

      humor:
        sessao.humor === 'Positivo'
          ? 10
          : sessao.humor === 'Neutro'
          ? 6
          : 3,

    }))

  }, [sessoes])

  const frequenciaData = useMemo(() => {

    return [
      {
        name: 'Sessões',
        total: sessoes.length,
      },
    ]

  }, [sessoes])

  const humorData = useMemo(() => {

    let positivo = 0
    let neutro = 0
    let negativo = 0

    sessoes.forEach((sessao) => {

      if (sessao.humor === 'Positivo') {
        positivo++
      } else if (sessao.humor === 'Neutro') {
        neutro++
      } else {
        negativo++
      }

    })

    return [
      {
        name: 'Positivo',
        value: positivo,
      },
      {
        name: 'Neutro',
        value: neutro,
      },
      {
        name: 'Negativo',
        value: negativo,
      },
    ]

  }, [sessoes])

  const COLORS = [
    '#16a34a',
    '#eab308',
    '#dc2626',
  ]

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
            className="bg-green-600 hover:bg-green-500 transition px-5 py-4 rounded-2xl font-semibold border border-green-400"
          >
            Indicadores
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-green-700">
              Indicadores Clínicos
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Painel evolutivo terapêutico do PEM
            </p>

          </div>

          <Link
            href="/dashboard"
            className="bg-green-700 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition"
          >
            Dashboard
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <p className="text-slate-500">
              Total de Sessões
            </p>

            <h2 className="text-5xl font-bold text-green-700 mt-3">
              {sessoes.length}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <p className="text-slate-500">
              Média Engajamento
            </p>

            <h2 className="text-5xl font-bold text-blue-700 mt-3">

              {
                evolucaoData.length > 0
                  ? (
                      evolucaoData.reduce(
                        (acc, item) =>
                          acc + item.engajamento,
                        0
                      ) / evolucaoData.length
                    ).toFixed(1)
                  : 0
              }

            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <p className="text-slate-500">
              Média Humor
            </p>

            <h2 className="text-5xl font-bold text-yellow-600 mt-3">

              {
                evolucaoData.length > 0
                  ? (
                      evolucaoData.reduce(
                        (acc, item) =>
                          acc + item.humor,
                        0
                      ) / evolucaoData.length
                    ).toFixed(1)
                  : 0
              }

            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8 text-green-700">
              Evolução Terapêutica
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <LineChart data={evolucaoData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="sessao" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="engajamento"
                  stroke="#2563eb"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="humor"
                  stroke="#16a34a"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8 text-green-700">
              Frequência Terapêutica
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={frequenciaData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#16a34a"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 xl:col-span-2">

            <h2 className="text-2xl font-bold mb-8 text-green-700">
              Distribuição Emocional
            </h2>

            <div className="flex justify-center">

              <ResponsiveContainer
                width="100%"
                height={400}
              >

                <PieChart>

                  <Pie
                    data={humorData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={140}
                    label
                  >

                    {humorData.map((entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}