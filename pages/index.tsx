// React and Next
import type { NextPage } from 'next'

// External Libraries
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Local Components
import { Meta } from '@modules/general'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'

interface User {
  personId: string,
  firstName: string,
  lastName: string,
  email: string
}

const UsersList: NextPage<{ data: [User] }> = ({ data }) => {
  return <>
    <Meta title='Sign up' description='User registration form' />

    <TopNavBar rightLinkName='Create user' rightLinkPath='/create' />

    <div className={stylesWebsite.listView}>
      <div className="overflow-y-auto w-full">
        <div className='font-montserrat-800 text-4xl pb-12'>Users</div>

        {/* Mobile */}
        <div className='w-full md:hidden'>
          <div className='bg-slate-100 p-5 font-montserrat-600 text-sm text-slate-500'>Name</div>
          {data.map((user: User) => (
            <div className='border-b-[1px] border-slate-200 space-y-1 p-5'>
              <div className='font-montserrat-600 text-sm text-slate-800 w-full truncate'>{user.firstName} {user.lastName}</div>
              <div className='font-montserrat-500 text-sm text-slate-600 w-full truncate'>{user.email}</div>
              <div className='flex gap-4 pt-3'>
                <PencilSquareIcon className="h-5 w-5 text-blue-700" />
                <TrashIcon className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <table className="table-auto w-full hidden md:table" cellPadding={20}>
          <thead>
            <tr className='bg-slate-100'>
              <th className='font-montserrat-600 text-sm text-slate-500' align='left'>Name</th>
              <th className='font-montserrat-600 text-sm text-slate-500' align='left'>Email</th>
              <th className='font-montserrat-600 text-sm text-slate-500'>Edit</th>
              <th className='font-montserrat-600 text-sm text-slate-500'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: User) => (
              <tr key={user.personId} className='border-b-[1px] border-slate-200'>
                <td align='left'><div className='font-montserrat-600 text-sm text-slate-800'>{user.firstName} {user.lastName}</div></td>
                <td align='left'><div className='font-montserrat-500 text-sm text-slate-600'>{user.email}</div></td>
                <td align='center'><PencilSquareIcon className="h-5 w-5 text-blue-700" /></td>
                <td align='center'><TrashIcon className="h-5 w-5 text-blue-700" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/list/users')
  const data = await res.json()
  return { props: { data } }
}

export default UsersList