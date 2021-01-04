import React from 'react'
import { Typography, Box } from '@material-ui/core'

export default () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © Verti App ${currentYear}`}
        </Typography>
      </Box>
    </footer>
  )
}
