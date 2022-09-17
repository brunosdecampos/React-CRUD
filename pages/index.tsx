// React and Next
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

// External Libraries
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

// Local Components
import { Meta } from '@modules/general'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'
import { generalBanner } from '@components/Banner'
import { User } from '@models/user.model'

const UsersList: NextPage<{ data: [User] }> = ({ data }) => {
  const router = useRouter()

  const reloadPage = () => {
    router.replace(router.asPath)
  }

  const [banner, setBanner] = useState(generalBanner)

  const handleUpdate = async (userId: string) => {
    router.push(`/edit/user/${userId}`)
  }

  const handleDelete = async (userId: string) => {
    try {
      fetch(`http://localhost:3000/api/delete/user/${userId}`, {
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

  return <>
    <Meta description='List of all users' />

    <TopNavBar rightLinkName='Create user' rightLinkPath='/create/user' />

    <div className={stylesWebsite.listView}>
      <div className="overflow-y-auto w-full">
        <div className='font-montserrat-800 text-4xl pb-12'>Users</div>

        {/* Mobile */}
        <div className='w-full md:hidden'>
          <div className='bg-slate-100 border-y-[1px] border-slate-200 p-5 font-montserrat-600 text-sm text-slate-500'>Name</div>
          {data.length < 1 && <>
            <div className='border-b-[1px] border-slate-200 space-y-1 p-5'>
              <div className='font-montserrat-500 text-sm text-slate-600 w-full truncate text-center'>No user created yet</div>
            </div>
          </>}
          {data.map((user: User) => (
            <div key={user.userId} className='border-b-[1px] border-slate-200 space-y-1 p-5'>
              <div className='font-montserrat-600 text-sm text-slate-800 w-full truncate'>{user.firstName} {user.lastName}</div>
              <div className='font-montserrat-500 text-sm text-slate-600 w-full truncate'>{user.email}</div>
              <div className='flex gap-4 pt-3'>
                <PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleUpdate(user.userId)} />
                <TrashIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleDelete(user.userId)} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <table className="table-auto w-full hidden md:table" cellPadding={20}>
          <thead>
            <tr className='bg-slate-100 border-y-[1px] border-slate-200'>
              <th className='font-montserrat-600 text-sm text-slate-500' align='left'>Name</th>
              <th className='font-montserrat-600 text-sm text-slate-500' align='left'>Email</th>
              <th className='font-montserrat-600 text-sm text-slate-500'>Edit</th>
              <th className='font-montserrat-600 text-sm text-slate-500'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length < 1 && <>
              <tr className='border-b-[1px] border-slate-200'>
                <td align='center' colSpan={4}><div className='font-montserrat-500 text-sm text-slate-600'>No user created yet</div></td>
              </tr>
            </>}
            {data.map((user: User) => (
              <tr key={user.userId} className='border-b-[1px] border-slate-200'>
                <td align='left'><div className='font-montserrat-600 text-sm text-slate-800'>{user.firstName} {user.lastName}</div></td>
                <td align='left'><div className='font-montserrat-500 text-sm text-slate-600'>{user.email}</div></td>
                <td align='center'><PencilSquareIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleUpdate(user.userId)} /></td>
                <td align='center'><TrashIcon className="h-5 w-5 text-blue-700 cursor-pointer" onClick={() => handleDelete(user.userId)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/users')
  const data = await res.json()
  return { props: { data } }
}

export default UsersList