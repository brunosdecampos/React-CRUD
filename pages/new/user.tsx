// React and Next
import type { NextPage } from 'next'

// Local Components
import { Meta } from '@modules/general'
import { UserForm } from '@modules/website'
import stylesWebsite from '@styles/Website.module.scss'
import { TopNavBar } from '@modules/website/TopNavBar.layout'

const CreateUser: NextPage = () => {
  return <>
    <Meta title='Create' description='User registration form' />

    <TopNavBar leftLinkName='Back to users' leftLinkPath='/' />

    <div className={stylesWebsite.userForm}>
      <UserForm title='Create user' />
    </div>
  </>
}

export default CreateUser