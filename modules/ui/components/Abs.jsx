import React from 'react';

export default function Abs({left, top, right, bottom, children, style, ...props}) {
  return <div style={{position: 'absolute', left, top, right, bottom, ...style}}  {...props}>
    {children}
  </div>;
}

