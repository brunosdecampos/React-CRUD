// React and Next
import { NextPage } from "next"
import { useState } from 'react'
import { useRouter } from "next/router"

// External Libraries
import { Form, Formik, FormikState } from 'formik'
import * as yup from 'yup'

// Local Components
import { TextField } from '@components/forms'
import { LoadingSpinnerPortal } from '@modules/general/loading'
import { Banner, generalBanner, MessageType } from "@components/Banner"

interface FormData {
  personId: string,
  firstName: string,
  lastName: string,
  email: string
}

type ResetForm = (nextState?: Partial<FormikState<FormData>> | undefined) => void

const SignUpForm: NextPage = () => {
  const router = useRouter()

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

  const [banner, setBanner] = useState(generalBanner)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: FormData, resetForm: ResetForm) => {
    setSubmitting(true)
    setBanner(generalBanner)

    try {
      fetchUser(data, resetForm)
    }
    catch (error) {
      setBanner({ ...banner, visible: true })
      setSubmitting(false)
    }
  }

  const fetchUser = async (data: FormData, resetForm: ResetForm) => {
    const res = await fetch(`http://localhost:3000/api/user/${data.email}`)
    const isUserRegistered = await res.json()

    if (isUserRegistered) {
      setBanner({ ...banner, visible: true, message: 'This email already exists.' })
      setSubmitting(false)
    }
    else {
      createUser(data, resetForm)
    }
  }

  const createUser = async (data: FormData, resetForm: ResetForm) => {
    try {
      fetch('http://localhost:3000/api/create/user', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        setBanner(generalBanner)
        router.push({ pathname: "/" })
        resetForm({ values: initialValues })
        setSubmitting(false)
      })
    } catch (error) {
      setBanner({ ...banner, visible: true })
      setSubmitting(false)
    }
  }

  return <>
    <div className="overflow-y-auto w-full">
      <Formik initialValues={initialValues} validationSchema={validate} onSubmit={(data, { resetForm }) => handleSubmit(data, resetForm)}>
        <Form>
          <div className='space-y-6 text-slate-800 px-[30px] py-[50px] mx-auto lg:w-[500px]'>
            <div className='font-montserrat-800 text-4xl pb-2'>Create user</div>

            <Banner visible={banner.visible} type={banner.type} title={banner.title} message={banner.message} />

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

export { SignUpForm }