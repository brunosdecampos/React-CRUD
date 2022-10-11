import type { NextPage } from 'next'

import { LoadingSpinner } from './spinner.component'

const PageLoading: NextPage = () => {
  return <>
    <div className='loadingWrapper'>
      <LoadingSpinner width={40} height={40} colour={'#4f46e5'} />
    </div>
  </>
}

export { PageLoading }