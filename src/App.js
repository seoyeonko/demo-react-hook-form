import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';

export default function App() {
  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit시 호출
    formState: { errors }, // validation error
  } = useForm();

  // console.log({ ...register('email') });

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" {...register('email')} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" {...register('password')} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
