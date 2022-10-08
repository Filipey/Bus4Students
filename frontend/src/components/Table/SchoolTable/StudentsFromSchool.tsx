import { useEffect, useState } from 'react'
import { School } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { WarningField } from '../../WarningField'
import { CollapseTable } from '../CollapseTable'
import { BreadCrumbStep, TableTitle } from '../Title'

export function StudentsFromSchool() {
  const [allSchools, setAllSchools] = useState<School[]>([])
  const [atualSchools, setAtualSchools] = useState<School[]>([])

  function fetchData() {
    SchoolService.getAllSchools().then(res => setAllSchools(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualSchools(allSchools)
  }, [allSchools])

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Instituições de Ensino',
      url: '/admin/school'
    },
    {
      title: 'Estudantes por Instituição de Ensino',
      url: '/admin/school/students'
    }
  ]

  return (
    <TableTitle steps={steps} title="Estudantes por Instituição de Ensino">
      {atualSchools.length !== 0 ? (
        <CollapseTable schools={atualSchools} />
      ) : (
        <WarningField
          title="Ausência de dados"
          message="Não há Instituições de Ensino cadastradas."
          severity="warning"
        />
      )}
    </TableTitle>
  )
}
