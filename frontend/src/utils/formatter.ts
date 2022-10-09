export function formatSubmitDate(date: string) {
  const [day, month, year] = date.split('/')
  const formattedDate = `${year}-${month}-${day}`
  return new Date(formattedDate)
}

export function formatUserDate(date: Date) {
  const dt = date as unknown as string
  const [year, month, day] = dt.split('-')

  return `${day}/${month}/${year}`
}

export function formatCpf(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
