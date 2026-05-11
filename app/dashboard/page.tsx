'use client'

import Link from 'next/link'

export default function Dashboard() {

  const indicadores = [
    {
      titulo: 'Pacientes',
      valor: '12',
    },
    {
      titulo: 'Sessões',
      valor: '84',
    },
    {
      titulo: 'Agenda Hoje',
      valor: '6',
    },
    {
      titulo: 'Sistema',
      valor: 'Online',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold text-green-700">
            PEM Musicoterapia
          </h1>

          <p className="text-slate-600 mt-2">
            Painel Clínico
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        {indicadores.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6"
          >

            <p className="text-slate-500">
              {item.titulo}
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-4">
              {item.valor}
            </h2>

          </div>

        ))}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          href="/pacientes"
          className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
        >

          <h2 className="text-2xl font-bold text-green-700">
            Pacientes
          </h2>

          <p className="text-slate-500 mt-3">
            Cadastro e gerenciamento
          </p>

        </Link>

        <Link
          href="/sessoes"
          className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
        >

          <h2 className="text-2xl font-bold text-green-700">
            Sessões
          </h2>

          <p className="text-slate-500 mt-3">
            Evolução terapêutica
          </p>

        </Link>

        <Link
          href="/agenda"
          className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition"
        >

          <h2 className="text-2xl font-bold text-green-700">
            Agenda
          </h2>

          <p className="text-slate-500 mt-3">
            Agendamentos clínicos
          </p>

        </Link>

      </div>

    </div>
  )
}