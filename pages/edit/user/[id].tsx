// React and Next
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// External Libraries
import useSWR from 'swr'

// Local Components
import { Meta } from '@modules/general'
import { UserForm } from '@modules/website'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'
import { User } from '@models/user.model'
import { BASE_URL } from '@constants/index'
import { PageLoading } from '@modules/general/loading'
import { Banner, MessageType } from '@components/index'

function UserData() {
  const router = useRouter()
  const id = router.query.id

  const fetcher = (url: URL) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(id ? `${BASE_URL}/api/user/${id}` : null, fetcher, {
    revalidateOnFocus: false
  })

  if (error) return <Banner visible={true} type={MessageType.Error} title={'Oops!'} message={'Something went wrong. Try again later.'} />
  if (!data) return <PageLoading />

  return <>
    <div className={stylesWebsite.userForm}>
      <UserForm title='Edit user' data={data} isEditting={true} />
    </div>
  </>
}

const EditUser: NextPage<{ data: User }> = ({ data }) => {
  return <>
    <Meta title='Edit' description='Update your users list' />
    <TopNavBar leftLinkName='Back to users' leftLinkPath='/' />
    <UserData />
  </>
}

export default EditUser