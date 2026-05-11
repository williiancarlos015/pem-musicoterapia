import Link from 'next/link';

export default function PEMDashboard() {
  const indicadores = [
    {
      titulo: 'Pacientes Ativos',
      valor: 28,
    },
    {
      titulo: 'Sessões no Mês',
      valor: 96,
    },
    {
      titulo: 'Evolução Média',
      valor: '82%',
    },
    {
      titulo: 'Frequência',
      valor: '91%',
    },
  ];

  const pacientes = [
    {
      nome: 'Nicolas Amorim',
      diagnostico: 'TEA',
      evolucao: 'Boa evolução comunicativa',
    },
    {
      nome: 'Maria Eduarda',
      diagnostico: 'Atraso no desenvolvimento',
      evolucao: 'Melhora no contato visual',
    },
    {
      nome: 'João Miguel',
      diagnostico: 'Síndrome de Down',
      evolucao: 'Maior interação social',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-72 bg-green-700 text-white p-6 flex flex-col gap-6 shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold">
            PEM Musicoterapia
          </h1>

          <p className="text-green-100 mt-2 text-sm">
            Prontuário Eletrônico Musicoterapêutico
          </p>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <Link
            href="/"
            className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left"
          >
            Dashboard
          </Link>

          <Link
            href="/pacientes"
            className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left"
          >
            Pacientes
          </Link>

          <Link
            href="/sessoes"
            className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left"
          >
            Sessões
          </Link>

          <button className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left">
            Agenda
          </button>

          <button className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left">
            Relatórios
          </button>

          <button className="bg-white/10 hover:bg-white/20 transition rounded-xl p-3 text-left">
            Financeiro
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Dashboard Clínico
            </h2>

            <p className="text-slate-500 mt-2">
              Visão geral dos atendimentos musicoterapêuticos
            </p>
          </div>

          <button className="bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition">
            Nova Sessão
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {indicadores.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <p className="text-slate-500 text-sm mb-3">
                {item.titulo}
              </p>

              <h3 className="text-4xl font-bold text-green-700">
                {item.valor}
              </h3>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                Evolução Clínica
              </h3>

              <select className="border rounded-xl px-4 py-2">
                <option>Últimos 30 dias</option>
                <option>Últimos 3 meses</option>
                <option>Último ano</option>
              </select>
            </div>

            <div className="h-72 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-lg">
              Área reservada para gráficos clínicos
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Próximas Sessões
            </h3>

            <div className="flex flex-col gap-4">
              <div className="bg-slate-100 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-800">
                  Nicolas Amorim
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Hoje • 14:00
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-800">
                  Maria Eduarda
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Hoje • 15:00
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-800">
                  João Miguel
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Amanhã • 09:00
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-lg mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">
              Pacientes Recentes
            </h3>

            <button className="text-green-700 font-semibold">
              Ver todos
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4">Paciente</th>
                  <th className="pb-4">Diagnóstico</th>
                  <th className="pb-4">Evolução</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {pacientes.map((paciente, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0"
                  >
                    <td className="py-5 font-medium text-slate-800">
                      {paciente.nome}
                    </td>

                    <td className="py-5 text-slate-600">
                      {paciente.diagnostico}
                    </td>

                    <td className="py-5 text-slate-600">
                      {paciente.evolucao}
                    </td>

                    <td className="py-5">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Em acompanhamento
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
