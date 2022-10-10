import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useEffect, useState } from 'react'
import { User } from '../../../hooks/userContext'
import { Student, StudentPass } from '../../../schemas'
import { StudentPassService } from '../../../services/StudentPassService'
import { StudentService } from '../../../services/StudentService'
import { formatUserDate } from '../../../utils/formatter'
import { BreadCrumbStep, TableTitle } from '../Title'

export function StudentPasses() {
  const user: User = JSON.parse(window.sessionStorage.getItem('USER'))
  const [student, setStudent] = useState<Student>(undefined)
  const [pass, setPass] = useState<StudentPass>(undefined)

  useEffect(() => {
    StudentService.getStudentByCpf(user.cpf).then(res => setStudent(res.data))
  }, [])

  useEffect(() => {
    StudentPassService.getPassByOwner(user.cpf).then(res => setPass(res.data))
  }, [student])

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/user'
    },
    {
      title: 'Minhas Carteiras de Transporte',
      url: '/user/me/pass'
    }
  ]

  return (
    <TableTitle title="Minhas Carteiras de Transporte" steps={steps}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Instituição de Ensino</TableCell>
                <TableCell align="center">Data de Expiração</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {pass && (
                  <>
                    <TableCell align="center">{pass.id}</TableCell>
                    <TableCell align="center">{pass.schoolName}</TableCell>
                    <TableCell align="center">
                      {formatUserDate(pass.expirationDate)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TableTitle>
  )
}
