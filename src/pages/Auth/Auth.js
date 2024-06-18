import React, { useState } from 'react';

import './Auth.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';

const AuthPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputChangeHandler = (event, input) => {
    if (input === 'email') {
      setEmail(event.target.value);
    } else if (input === 'password') {
      setPassword(event.target.value);
    }
  };

  let modeButtonText = 'Switch to Signup';
  let submitButtonText = 'Login';
  if (props.mode === 'signup') {
    modeButtonText = 'Switch to Login';
    submitButtonText = 'Signup';
  }

  return (
    <main>
      <section className="auth__mode-control">
        <Button type="button" onClick={props.onAuthModeChange}>
          {modeButtonText}
        </Button>
      </section>
      <form
        className="auth__form"
        onSubmit={(event) =>
          props.onAuth(event, {
            email: email,
            password: password,
          })
        }
      >
        <Input
          label="E-Mail"
          config={{ type: 'email' }}
          onChange={(event) => inputChangeHandler(event, 'email')}
        />
        <Input
          label="Password"
          config={{ type: 'password' }}
          onChange={(event) => inputChangeHandler(event, 'password')}
        />
        <Button type="submit">{submitButtonText}</Button>
      </form>
    </main>
  );
};

export default AuthPage;
