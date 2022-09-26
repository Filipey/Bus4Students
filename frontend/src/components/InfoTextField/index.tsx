import { InputAdornment, TextField } from '@mui/material'

interface InfoTextFieldProps {
  label: string
  icon: JSX.Element
  fullWidth?: boolean
  disabled?: boolean
  defaultValue?: string
}

export function InfoTextField({
  label,
  icon,
  fullWidth,
  disabled,
  defaultValue
}: InfoTextFieldProps) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth={fullWidth}
      label={label}
      disabled={disabled}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
      }}
    />
  )
}
