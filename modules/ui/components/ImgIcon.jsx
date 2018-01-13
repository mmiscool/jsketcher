import React from 'react';

export default function ImgIcon({url, size, style, ...props}) {
  return <div style={{
    backgroundImage: 'url('+url+')',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundPositionY: 'top',
    backgroundSize: `${size}px ${size}px`,
    width: size + 'px',
    height: size + 'px',
    ...style
  }} {...props} />
};