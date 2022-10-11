// React and Next
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

// External Libraries
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import useSWR from 'swr'

// Local Components
import { Meta } from '@modules/general'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'
import { Banner, generalBanner, MessageType } from '@components/Banner'
import { User } from '@models/user.model'
import { BASE_URL } from '@constants/index'
import { PageLoading } from '@modules/general/loading'

function UsersTable() {
  const router = useRouter()

  const reloadPage = () => {
    router.replace(router.asPath)
  }

  const handleUpdate = async (userId: string) => {
    router.push(`/edit/user/${userId}`)
  }

  //
  // Service API
  //

  const handleDelete = async (userId: string) => {
    try {
      fetch(`${BASE_URL}/api/delete/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'DELETE'
      }).then(() => {
        reloadPage()
      })
    } catch (error) {
      console.log(error);
    }
  }

  const fetcher = async () => {
    const response = await fetch(`${BASE_URL}/api/users`)
    const data = await response.json()
    return data
  }

  const { data, error } = useSWR('/api/users', fetcher, {
    revalidateOnFocus: false
  })

  if (error) return <Banner visible={true} type={MessageType.Error} title={'Oops!'} message={'Something went wrong. Try again later.'} />
  if (!data) return <PageLoading />

  return <>
    {/* Mobile */}
    <div className='w-full md:hidden'>
      <div className='bg-slate-100 border-y-[1px] border-slate-200 px-3 py-6 font-montserrat-600 text-sm text-slate-500'>Name</div>
      {data.length < 1 && <>
        <div className='border-b-[1px] border-slate-200 space-y-1 px-3 py-6'>
          <div className='font-montserrat-500 text-sm text-slate-600 w-full truncate text-center'>No user created yet</div>
        </div>
      </>}
      {data.map((user: User, index: number) => (
        <div key={user.userId} className='border-b-[1px] border-slate-200 space-y-1 px-3 py-6'>
          <div className='font-montserrat-600 text-sm text-slate-800 w-full truncate'>{index + 1}. {user.firstName} {user.lastName}</div>
          <div className='font-montserrat-500 text-sm text-slate-600 w-full truncate'>{user.email}</div>
          <div className='flex gap-4 pt-3'>
            <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleUpdate(user.userId)} />
            <TrashIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleDelete(user.userId)} />
          </div>
        </div>
      ))}
    </div>

    {/* Desktop */}
    <table className="table-auto w-full hidden md:table" cellPadding={0}>
      <thead>
        <tr className='bg-slate-100 border-y-[1px] border-slate-200'>
          <th className='font-montserrat-600 text-sm text-slate-500 px-3 py-6'>#</th>
          <th className='font-montserrat-600 text-sm text-slate-500 px-3 py-6' align='left'>Name</th>
          <th className='font-montserrat-600 text-sm text-slate-500 px-3 py-6' align='left'>Email</th>
          <th className='font-montserrat-600 text-sm text-slate-500 px-3 py-6'>Edit</th>
          <th className='font-montserrat-600 text-sm text-slate-500 px-3 py-6'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.length < 1 && <>
          <tr className='border-b-[1px] border-slate-200'>
            <td className='px-3 py-6' align='center' colSpan={5}><div className='font-montserrat-500 text-sm text-slate-600'>No user created yet</div></td>
          </tr>
        </>}
        {data.map((user: User, index: number) => (
          <tr key={user.userId} className='border-b-[1px] border-slate-200' >
            <td className='px-3 py-6' align='center'><div className='font-montserrat-600 text-sm text-slate-800'>{index + 1}</div></td>
            <td className='px-3 py-6'><div className='font-montserrat-600 text-sm text-slate-800 md:max-w-[180px] truncate'>{user.firstName} {user.lastName}</div></td>
            <td className='px-3 py-6'><div className='font-montserrat-500 text-sm text-slate-600 md:max-w-[300px] truncate'>{user.email}</div></td>
            <td className='px-3 py-6' align='center'><PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleUpdate(user.userId)} /></td>
            <td className='px-3 py-6' align='center'><TrashIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleDelete(user.userId)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}

const UsersList: NextPage = () => {
  return <>
    <Meta description='List of all users' />
    <TopNavBar rightLinkName='Create user' rightLinkPath='/new/user' />

    <div className={stylesWebsite.listView}>
      <div className="overflow-y-auto w-full pb-10">
        <div className='font-montserrat-800 text-4xl mt-12 pb-12'>Users</div>

        <UsersTable />
      </div>
    </div>
  </>
}

export default UsersList