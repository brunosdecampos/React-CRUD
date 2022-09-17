import React from 'react'
import { NextPage } from 'next'
import { ErrorMessage, Field, useField } from 'formik'

interface TextFieldForm {
  label: string,
  name: string,
  type: string,
  maxLength?: number,
  placeholder?: string
}

export const TextField: NextPage<TextFieldForm> = ({ label, ...props }) => {
  const [input, meta] = useField(props)

  return (
    <div className='w-full'>
      <label htmlFor={input.name} className="formLabel">{label}</label>
      <Field className={`input ${meta.touched && meta.error && 'errorField'}`} {...input} {...props} />
      <ErrorMessage className="inlineError" name={input.name} component="div" />
    </div>
  )
}
