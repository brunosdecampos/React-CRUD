import React from 'react'
import { NextPage } from 'next'

export enum MessageType {
  Error,
  Warning,
  Info,
  Success
}

export interface GeneralBanner {
  visible: boolean,
  type: MessageType,
  title?: string,
  message: string
}

export const generalBanner: GeneralBanner = {
  visible: false,
  type: MessageType.Error,
  title: 'Oops!',
  message: 'Something went wrong. Try again later.'
}

export const Banner: NextPage<GeneralBanner> = ({ visible, type, title, message }) => {
  const getStyleClassName = (type: MessageType): string => {
    switch (type) {
      case 0:
        return 'error'
      case 1:
        return 'warning'
      case 2:
        return 'info'
      default:
        return 'success'
    }
  }

  return <>
    {visible && <>
      <div className='banner'>
        <div className={getStyleClassName(type)}>
          {title && <div className='font-montserrat-700 text-sm'>{title}</div>}
          <div className='font-montserrat-500 text-sm'>{message}</div>
        </div>
      </div>
    </>}
  </>
}
