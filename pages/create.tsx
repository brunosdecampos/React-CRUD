// React and Next
import type { NextPage } from 'next';

// Local Components
import { Meta } from '@modules/general';
import { SignUpForm } from '@modules/website';
import stylesWebsite from '@styles/Website.module.scss';
import { TopNavBar } from '@modules/website/TopNavBar.layout';

const Home: NextPage = () => {
  return <>
    <Meta title='Sign up' description='User registration form' />

    <TopNavBar leftLinkName='Back to users' leftLinkPath='/' />

    <div className={stylesWebsite.signUpForm}>
      <SignUpForm />
    </div >
  </>;
};

export default Home;