import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useAuth } from 'components/hooks/useAuth';
import { Paper } from '@mui/material';
import { User } from '@firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

interface FormData {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const { login } = useAuth();
  const router = useRouter();
  const onSubmit = handleSubmit(({ email, password }) => {
    login(email, password)?.then((u: User) => {
      if (u) {
        router.push('/#home');
      }
    });
  });
  const buttonStyle = { mt: 3, mb: 2, pb: 1, pt: 1, pl: 6, pr: 6 };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 10,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            variant="filled"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            label="Password"
            type="password"
            id="password"
            {...register('password', { required: true })}
            autoComplete="current-password"
          />
          <Container
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => router.push('/#home')}
              sx={buttonStyle}
            >
              Go back
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={buttonStyle}
            >
              Sign In
            </Button>
          </Container>
        </Box>
      </Paper>
    </Container>
  );
};
export default SignIn;
