import React from 'react';
import { NextPage } from 'next';

export enum MessageType {
  Error,
  Warning,
  Info,
  Success
}

export const Banner: NextPage<{ type: MessageType, title?: string, message: string }> = ({ type, title, message }) => {
  const getStyleClassName = (type: MessageType): string => {
    switch (type) {
      case 0:
        return 'error';
      case 1:
        return 'warning';
      case 2:
        return 'info';
      default:
        return 'success';
    }
  }

  return (
    <div className='banner'>
      <div className={getStyleClassName(type)}>
        {title && <div className='font-montserrat-700 text-sm'>{title}</div>}
        <div className='font-montserrat-500 text-sm'>{message}</div>
      </div>
    </div>
  )
}
