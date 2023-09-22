import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../type/Type';

const INITAL_STATE_USER = {
  email: '',
  password: '',
};

function Login() {
  const [login, setLogin] = useState<User>(INITAL_STATE_USER);
  const { email, password } = login;
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  }

  const endereco = email;
  const senha = password.length >= 7 && /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(endereco);

  return (
    <>
      <h1>Recipe-APP</h1>
      <form onSubmit={ handleSubmit }>
        <label>
          E-mail:
          {' '}
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            required
            onChange={ handleChange }
          />
        </label>
        <label>
          Senha:
          {' '}
          <input
            data-testid="password-input"
            name="password"
            value={ password }
            type="password"
            required
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          disabled={ !senha }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
