// React and Next
import type { NextPage } from 'next'

// Local Components
import { Meta } from '@modules/general'
import { UserForm } from '@modules/website'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'
import { User } from '@models/user.model'
import { BASE_URL } from '@constants/index'

const EditUser: NextPage<{ data: User }> = ({ data }) => {
  return <>
    <Meta title='Edit' description='Update your users list' />

    <TopNavBar leftLinkName='Back to users' leftLinkPath='/' />
    <div className={stylesWebsite.userForm}>
      <UserForm title='Edit user' data={data} isEditting={true} />
    </div>
  </>
}

export async function getServerSideProps(context: any) {
  const id = context.params.id
  const res = await fetch(`${BASE_URL}/api/user/${id}`)
  const data = await res.json()
  return { props: { data, userId: id } }
}

export default EditUser