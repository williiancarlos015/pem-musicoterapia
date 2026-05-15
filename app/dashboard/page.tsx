'use client'

import Link from 'next/link'

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <aside className="w-72 bg-green-800 text-white p-8 hidden md:flex flex-col">

        <h1 className="text-3xl font-bold mb-10">
          PEM
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            href="/dashboard"
            className="bg-green-600 hover:bg-green-500 transition px-5 py-4 rounded-2xl font-semibold border border-green-400"
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
            className="bg-green-700 hover:bg-green-600 transition px-5 py-4 rounded-2xl"
          >
            Gerar PDF
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-green-700">
            Dashboard Clínico
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Sistema PEM Musicoterapia
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Link
            href="/pacientes"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Pacientes
            </h2>

            <p className="text-slate-500">
              Cadastro e prontuários clínicos
            </p>

          </Link>

          <Link
            href="/agenda"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Agenda
            </h2>

            <p className="text-slate-500">
              Organização dos atendimentos
            </p>

          </Link>

          <Link
            href="/sessoes"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Sessões
            </h2>

            <p className="text-slate-500">
              Evoluções terapêuticas
            </p>

          </Link>

          <Link
            href="/relatorios"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Relatórios
            </h2>

            <p className="text-slate-500">
              Relatórios clínicos e PDF
            </p>

          </Link>

          <Link
            href="/financeiro"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Financeiro
            </h2>

            <p className="text-slate-500">
              Controle financeiro clínico
            </p>

          </Link>

          <Link
            href="/indicadores"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Indicadores
            </h2>

            <p className="text-slate-500">
              Painel evolutivo terapêutico
            </p>

          </Link>

          <Link
            href="/assistente"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Assistente IA
            </h2>

            <p className="text-slate-500">
              Geração inteligente de evolução clínica
            </p>

          </Link>

          <Link
            href="/pdf"
            className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Gerar PDF
            </h2>

            <p className="text-slate-500">
              Exportação profissional de relatórios
            </p>

          </Link>

        </div>

      </main>

    </div>
  )
}