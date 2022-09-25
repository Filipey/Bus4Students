import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ActionButtonProps {
  text: string
  href: string
}

export default function ActionButton({ text, href }: ActionButtonProps) {
  const navigate = useNavigate()
  const handleNavigate = () => navigate(href)

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleNavigate}
      sx={{ mt: 1 }}
    >
      <Typography component="span">{text}</Typography>
    </Button>
  )
}
