import React from 'react';
import { NextPage } from 'next';
import { ErrorMessage, Field, useField } from 'formik';

export const TextField: NextPage<{ label: string, name: string, type: string, maxLength?: number, placeholder?: string }> = ({ label, ...props }) => {
  const [input, meta] = useField(props);

  return (
    <div className='w-full'>
      <label htmlFor={input.name} className="formLabel">{label}</label>
      <Field className={`input ${meta.touched && meta.error && 'errorField'}`} {...input} {...props} />
      <ErrorMessage className="inlineError" name={input.name} component="div" />
    </div>
  )
}
