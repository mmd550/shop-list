'use client'

import { IconButton } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        zIndex: 10,
      }}
      size="medium"
    >
      <ArrowForward />
    </IconButton>
  )
}
