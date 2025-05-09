import { useMutation } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginUser = async (vars: { email: string; password: string }) => {
  const { error } = await supabase.auth.signInWithPassword(vars);
  if (error) throw new Error(error.message);
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {
    mutate,
    isPending, //  <-- v5
    isError,
    error,
  } = useMutation<void, Error, { email: string; password: string }>({
    mutationFn: loginUser,
    onSuccess: () => navigate('/dashboard'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 320, margin: '2rem auto' }}
    >
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: 12 }}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: 12 }}
      />

      <button type='submit' disabled={isPending} style={{ width: '100%' }}>
        {isPending ? 'Logging in…' : 'Login'}
      </button>

      {isError && <p style={{ color: 'red' }}>{error?.message}</p>}
    </form>
  );
}

export default Login;
