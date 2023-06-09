import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.css';

const departments = [
  { value: 'Computer-Science', label: 'Computer Science' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Mathematics', label: 'Mathematics' },
];

const initialValues = {
  gender: 'male',
  skills: {
    JavaScript: true,
    react: false,
    nodejs: true,
    angular: false,
  },
};

export default function App() {
  const [successMsg, setSuccessMsg] = useState('');

  const {
    control,
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit시 호출
    formState: { errors }, // validation error
    reset, // clear form
  } = useForm({
    defaultValues: {
      gender: initialValues.gender,
      skills: Object.keys(initialValues.skills).filter(
        (item) => initialValues.skills[item] === true
      ),
      // skills: ['JavaScript', 'nodejs'],
    },
  });

  // console.log({ ...register('email') });

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMsg('User registration is successful.');
    reset();
    // reset({
    //   email: 'hihi@abc.com',
    //   password: 'Happy1234!',
    // });
  };

  return (
    <div className="App">
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Select Department of Interest</label>
          <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} isMulti options={departments} />
            )}
          />
          {errors.department && (
            <p className="errorMsg">This is a required field.</p>
          )}
        </div>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.',
              },
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register('password', {
              required: 'Password is required.',
              // minLength: {
              //   value: 6,
              //   message: 'Password should be at-least 6 characters.',
              // },

              // multiple validations
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Select Gender</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            value="male"
            {...register('gender', {
              required: 'Please select your gender',
            })}
          />
          <Form.Check
            type="radio"
            label="Female"
            value="female"
            {...register('gender')}
          />
          {errors.gender && <p className="errorMsg">{errors.gender.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="skills">
          <Form.Label>Select Your Skills</Form.Label>
          <Form.Check
            type="checkbox"
            label="JavaScript"
            value="JavaScript"
            {...register('skills', {
              required: 'Please select at-least one skill',
            })}
          />
          <Form.Check
            type="checkbox"
            label="React"
            value="react"
            {...register('skills')}
          />
          <Form.Check
            type="checkbox"
            label="Node.js"
            value="nodejs"
            {...register('skills')}
          />
          <Form.Check
            type="checkbox"
            label="Angular"
            value="angular"
            {...register('skills')}
          />
          {errors.skills && <p className="errorMsg">{errors.skills.message}</p>}
        </Form.Group>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
