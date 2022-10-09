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
import { User } from "@models/user.model"
import { BASE_URL } from "@constants/index"

type ResetForm = (nextState?: Partial<FormikState<User>> | undefined) => void

const UserForm: NextPage<{ title: string, data?: User, isEditting?: boolean }> = ({ title, data, isEditting = false }) => {
  const router = useRouter()
  const [banner, setBanner] = useState(generalBanner)
  const [submitting, setSubmitting] = useState(false)

  //
  // Form
  //

  const initialValues: User = {
    userId: data?.userId || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || ''
  }

  const validate = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
  })

  const handleSubmit = async (data: User, isEditting: boolean, resetForm: ResetForm) => {
    setSubmitting(true)
    setBanner(generalBanner)

    try {
      if (isEditting)
        getUserByEmailExceptCurrent(data, resetForm)
      else
        getUserByEmail(data, resetForm)
    }
    catch (error) {
      setBanner({ ...banner, visible: true })
      setSubmitting(false)
    }
  }

  //
  // Service API
  //

  // Get the user's id by searching for all user's emails but the currenct user
  const getUserByEmailExceptCurrent = async (data: User, resetForm: ResetForm) => {
    const res = await fetch(`${BASE_URL}/api/search/user?email=${data.email}&uid=${data.userId}`)
    const isUserRegistered = await res.json()

    if (isUserRegistered) {
      setBanner({ ...banner, visible: true, message: 'This email already exists.' })
      setSubmitting(false)
    }
    else {
      updateUser(data, resetForm)
    }
  }

  // Get the user's id by search for their email
  const getUserByEmail = async (data: User, resetForm: ResetForm) => {
    const res = await fetch(`${BASE_URL}/api/search/user?email=${data.email}`)
    const isUserRegistered = await res.json()

    if (isUserRegistered) {
      setBanner({ ...banner, visible: true, message: 'This email already exists.' })
      setSubmitting(false)
    }
    else {
      createUser(data, resetForm)
    }
  }

  const createUser = async (data: User, resetForm: ResetForm) => {
    try {
      fetch(`${BASE_URL}/api/create/user`, {
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

  const updateUser = async (data: User, resetForm: ResetForm) => {
    try {
      fetch(`${BASE_URL}/api/update/user/${data.userId}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
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
      <Formik initialValues={initialValues} validationSchema={validate} onSubmit={(data, { resetForm }) => handleSubmit(data, isEditting, resetForm)}>
        <Form>
          <div className='space-y-6 text-slate-800 px-[30px] py-[50px] mx-auto lg:w-[500px]'>
            <div className='font-montserrat-800 text-4xl pb-2'>{title}</div>

            <Banner visible={banner.visible} type={banner.type} title={banner.title} message={banner.message} />

            <div className='flex gap-6'>
              <TextField label='First name' name='firstName' type='text' maxLength={50} />
              <TextField label='Last name' name='lastName' type='text' maxLength={50} />
            </div>

            <TextField label='Email' name='email' type='email' />

            <div className='flex gap-4 items-center justify-between pt-3'>
              <button className="button primary taller flex gap-3 items-center" type="submit" disabled={submitting}>
                <LoadingSpinnerPortal visible={submitting} />
                {isEditting ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  </>
}

export { UserForm }