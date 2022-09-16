// React and Next
import { NextPage } from "next";
import { useState } from 'react';
import { useRouter } from "next/router";

// External Libraries
import { Form, Formik, FormikState } from 'formik';
import * as yup from 'yup';

// Local Components
import { TextField } from '@components/forms';
import { LoadingSpinnerPortal } from '@modules/general/loading';
import { Banner, MessageType } from "@components/Banner";

interface FormData {
  personId: string,
  firstName: string,
  lastName: string,
  email: string
}

const SignUpForm: NextPage = () => {
  const router = useRouter();

  const initialValues: FormData = {
    personId: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  const validate = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
  })

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = async (email: string) => {
    const res = await fetch(`http://localhost:3000/api/user/${email}`)
    const data = await res.json()
    console.log(data)

    console.log('FIELD EMAIL = ' + email)
    console.log('DATA EMAIL = ' + data.email)

    if (data.email === email)
      console.log('DUPLICATE')
    else
      console.log('YOU ARE GOOD')

    // const req = await fetch(`http://localhost:3000/api/user/${email}`);
    // const req = await fetch('https://randomuser.me/api/?gender=male&results=100');
    // const data = await req.json();
    // let results = data.length;

    // User is already registered
    // if (results > 0) {
    //   setError(true);
    // } else {
    // Continue
    //   setError(false);
    // }
  };

  async function signUp(data: FormData, resetForm: (nextState?: Partial<FormikState<FormData>> | undefined) => void) {
    fetchUser(data.email)

    // try {
    //   fetch('http://localhost:3000/api/create/user', {
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST'
    //   }).then(() => {
    //     fetchUser(data.email);

    // if (data.personId) {
    //   alert('duplicate');
    // } else {
    //   setError(false);
    //   resetForm({
    //     values: initialValues
    //   })
    //   setSubmitting(false);
    //   router.push({ pathname: "/" });
    // }
    //   })
    // } catch (error) {
    //   console.log(error);
    //   setError(true);
    //   setSubmitting(false);
    // }
  }

  const handleSubmit = async (data: FormData, resetForm: (nextState?: Partial<FormikState<FormData>> | undefined) => void) => {
    setSubmitting(true);

    try {
      signUp(data, resetForm);
    }
    catch (error) {
      console.log(error);
      setError(true);
      setSubmitting(false);
    }
  };

  return <>
    <div className="overflow-y-auto w-full">
      <Formik initialValues={initialValues} validationSchema={validate} onSubmit={(data, { resetForm }) => handleSubmit(data, resetForm)}>
        <Form>
          <div className='space-y-6 text-slate-800 px-[30px] py-[50px] mx-auto lg:w-[500px]'>
            <div className='font-montserrat-800 text-4xl pb-2'>Create user</div>

            {error && <Banner type={MessageType.Error} title='Oops!' message='Something went wrong. Please try again.' />}

            <div className='flex gap-6'>
              <TextField label='First name' name='firstName' type='text' maxLength={50} />
              <TextField label='Last name' name='lastName' type='text' maxLength={50} />
            </div>

            <TextField label='Email' name='email' type='email' />

            <div className='flex gap-4 items-center justify-between pt-3'>
              <button className="button primary taller flex gap-3 items-center" type="submit" disabled={submitting}>
                <LoadingSpinnerPortal visible={submitting} />
                Create
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  </>
}

export { SignUpForm };