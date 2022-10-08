import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { School, StudentResponseDTO } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { WarningField } from '../../WarningField'

interface CollapseRowProps {
  school: School
}

export function CollapseRow({ school }: CollapseRowProps) {
  const [collapse, setCollapse] = useState(false)
  const [students, setStudents] = useState<StudentResponseDTO[]>([])

  function fetchData() {
    SchoolService.getStudentsByCampusLike(school.campus).then(res =>
      setStudents(res.data)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setCollapse(!collapse)}>
            {collapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {school.name}
        </TableCell>
        <TableCell>{school.campus}</TableCell>
        <TableCell>{school.location}</TableCell>
        <TableCell align="left">{school.active ? 'Sim' : 'Não'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Estudantes
              </Typography>
              {students.length !== 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>CPF</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Endereço</TableCell>
                      <TableCell>Matrícula</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.cpf}>
                        <TableCell>{student.cpf}</TableCell>
                        <TableCell>{student.nome}</TableCell>
                        <TableCell>{student.endereco}</TableCell>
                        <TableCell>
                          {student.comprovante_de_matricula}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <WarningField
                  title="Ausência de dados"
                  message="Não há estudantes nesta Instituição de Ensino"
                  severity="warning"
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
