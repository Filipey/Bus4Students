import { Alert, AlertTitle, Box } from '@mui/material'

interface WarningFieldProps {
  message: string
  severity: 'success' | 'warning' | 'error' | 'info'
  title?: string
}

export function WarningField({ message, severity, title }: WarningFieldProps) {
  return (
    <Box display="flex" sx={{ pt: '1vh', pb: '1vh', width: '100%' }}>
      <Alert sx={{ width: '100%', mt: '1vh' }} severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  )
}
