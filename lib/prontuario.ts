import { supabase } from './supabase'

export async function listarEvolucoes(
  pacienteId: string
) {

  const { data, error } =
    await supabase
      .from('evolucoes')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('created_at', {
        ascending: false
      })

  if (error) {

    console.error(
      'ERRO AO LISTAR:',
      error
    )

    return []
  }

  return data || []
}

export async function salvarEvolucao(
  dados: {
    paciente_id: string
    objetivo: string
    evolucao: string
  }
) {

  const { error } =
    await supabase
      .from('evolucoes')
      .insert([
        {
          paciente_id: dados.paciente_id,
          objetivo: dados.objetivo,
          evolucao: dados.evolucao
        }
      ])

  if (error) {

    console.error(
      'ERRO AO SALVAR:',
      error
    )

    throw error
  }
}