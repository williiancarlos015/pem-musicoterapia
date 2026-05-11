'use client'

import jsPDF from 'jspdf'

export default function Page() {

  function gerarPDF() {

    const doc = new jsPDF()

    doc.setFontSize(24)

    doc.text(
      'PEM Musicoterapia',
      20,
      20
    )

    doc.setFontSize(16)

    doc.text(
      'Relatório Clínico',
      20,
      40
    )

    doc.setFontSize(12)

    doc.text(
      'Paciente: Nicolas Amorim',
      20,
      60
    )

    doc.text(
      'Diagnóstico: TEA',
      20,
      70
    )

    doc.text(
      'Objetivo Terapêutico:',
      20,
      90
    )

    doc.text(
      'Estimular comunicação, interação social e contato visual.',
      20,
      100,
      {
        maxWidth: 160,
      }
    )

    doc.text(
      'Evolução Clínica:',
      20,
      130
    )

    doc.text(
      'Paciente apresentou melhora significativa durante as sessões de musicoterapia, demonstrando maior resposta aos estímulos musicais e interação terapêutica.',
      20,
      140,
      {
        maxWidth: 160,
      }
    )

    doc.save('relatorio-clinico.pdf')
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Relatórios PDF
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-10">

        <h2 className="text-2xl font-bold mb-6">
          Gerar Relatório Clínico
        </h2>

        <button
          onClick={gerarPDF}
          className="bg-green-700 text-white px-8 py-4 rounded-2xl"
        >
          Gerar PDF
        </button>

      </div>

    </div>
  )
}