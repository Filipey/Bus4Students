import { Grid, Paper } from '@mui/material'
import { ReactNode } from 'react'
import { BreadCrumbStep, TableTitle } from '../Table/Title'

interface ContentContainerProps {
  contentTitle: string
  steps: BreadCrumbStep[]
  children: ReactNode
}

export function ContentContainer({
  contentTitle,
  steps,
  children
}: ContentContainerProps) {
  return (
    <TableTitle title={contentTitle} steps={steps}>
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Paper>{children}</Paper>
      </Grid>
    </TableTitle>
  )
}
