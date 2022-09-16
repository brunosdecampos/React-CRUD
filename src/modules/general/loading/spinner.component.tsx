import type { NextPage } from 'next';

import ReactLoading from 'react-loading';

const LoadingSpinnerPortal: NextPage<{ visible?: boolean, width?: number, height?: number, colour?: string }> = ({ visible = true, width = 18, height = 18, colour = '#fff' }) => {
  return <>
    {visible && <ReactLoading type="spin" color={colour} height={height} width={width} />}
  </>;
};

export { LoadingSpinnerPortal };
