import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'components/hooks/useAuth';
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  paper: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  formName: {
    marginBottom: theme.spacing(3),
  },
}));

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const classes = useStyles();
  const { handleSubmit, register } = useForm<FormData>();
  const { login } = useAuth();
  const history = useHistory();
  const onSubmit = handleSubmit(({ email, password }) => {
    login(email, password)?.then((u) => {
      if (u) {
        history.push('/#home');
      }
    });
  });

  return (
    <Container className={classes.container} maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography className={classes.formName} variant="h4">
          Sign in
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    fullWidth
                    label="Email"
                    name="email"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    fullWidth
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
