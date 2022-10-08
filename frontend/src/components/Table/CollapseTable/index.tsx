import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { School } from '../../../schemas'
import { CollapseRow } from './Row'

interface CollapseTableProps {
  schools: School[]
}

export function CollapseTable({ schools }: CollapseTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell>Campus</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell align="left">Período Letivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schools.map(school => (
            <CollapseRow key={school.campus} school={school} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
