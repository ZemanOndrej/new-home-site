import React from 'react';
import { Box, Typography, Button } from '@mui/material';
interface Props {
  message: string;
  handleClose: () => void;
}
const style = {
  width: '400px',
  background: 'white',
  border: '2px solid #000',
  padding: '20px 40px 20px 40px',
} as React.CSSProperties;

export function quote(s: string) {
  return <>&quot;{s}&quot;</>;
}
export function ErrorModal({ message, handleClose }: Props) {
  return (
    <div style={style} className="flex center">
      <Box>
        <Typography variant="h6" component="h2">
          {'Something went wrong :('}
        </Typography>
        <Typography>With message: {quote(message)}</Typography>
        <div className="flex center">
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Box>
    </div>
  );
}
export function SuccessModal({ message, handleClose }: Props) {
  return (
    <div style={style} className="flex center">
      <Box>
        <Typography variant="h6" component="h2">
          {message}
        </Typography>
        <div className="flex center">
          <Button variant="contained" onClick={handleClose} color="success">
            Close
          </Button>
        </div>
      </Box>
    </div>
  );
}
