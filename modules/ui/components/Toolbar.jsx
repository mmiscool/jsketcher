import React from 'react';
import cx from 'classnames';

import ls from './Toolbar.less';

export default function Toolbar({left, top, right, bottom, children, style, ...props}) {
  return <div className={`${ls.root} disable-selection compact-font`}
              style={{position: 'absolute', left, top, right, bottom, ...style}} {...props}>
    {children}
  </div>
}

export function ToolbarButton({label, icon, disabled}) {
  return <div className={cx(ls.button, {disabled})}>
    {icon}
    <div>{label}</div>
  </div>;
}
