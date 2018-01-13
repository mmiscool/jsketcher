import React from 'react';

import ls from './ControlBar.less';
import cx from 'classnames';

export default function ControlBar({children}) {

  return <div className={ls.root}>
    <div className={ls.left}>
      {children[0]}
    </div>
    <div className={ls.right}>
      {children[1]}
    </div>
  </div>
}

export function ControlBarButton({onClick, enabled, children}) {
  return <span className={cx(ls.button, 'disable-selection', {disabled: !enabled})} 
               onClick={enabled ? onClick : undefined}>
    {children}
  </span>
}