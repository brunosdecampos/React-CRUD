import type { NextPage } from 'next';

import { LoadingSpinnerPortal } from './spinner.component';

const PageLoading: NextPage = () => {
  return <>
    <div className='loadingWrapper'>
      <LoadingSpinnerPortal width={40} height={40} colour={'#4f46e5'} />
    </div>
  </>;
};

export { PageLoading };