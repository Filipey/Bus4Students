import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useContext, useState } from 'react'
import UserContext from '../../../hooks/userContext'

interface PasswordConfirmationModalProps {
  state: boolean
  setState(state: boolean): void
  submitAction(): void
  warning?: JSX.Element
}

export function PasswordConfirmationModal({
  state,
  setState,
  submitAction,
  warning
}: PasswordConfirmationModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { user } = useContext(UserContext)

  const handleCloseDialog = () => {
    setPassword('')
    setState(false)
  }

  const handleSubmitDialog = () => {
    submitAction()
    setState(false)
  }

  return (
    <Dialog open={state} disableEscapeKeyDown onClose={handleCloseDialog}>
      <DialogTitle>Digite sua senha para confirmar a ação</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        {warning ? warning : ''}
      </DialogContent>
      <DialogActions>
        <>
          <Button color="error" variant="contained" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={handleSubmitDialog}
          >
            Confirmar
          </Button>
        </>
      </DialogActions>
    </Dialog>
  )
}
