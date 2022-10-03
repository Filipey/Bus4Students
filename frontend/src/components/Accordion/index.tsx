import { ExpandMore } from '@material-ui/icons'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import { ReactElement } from 'react'

interface InfoAccorionProps {
  title: string
  children: ReactElement | JSX.Element[]
}

export function InfoAccorion({ title, children }: InfoAccorionProps) {
  return (
    <Accordion sx={{ width: '100%', mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
