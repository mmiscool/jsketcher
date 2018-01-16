import React from 'react';
import ControlBar from './ControlBar';

import ls from './View3d.less';

export default function View3d() {
  
  return <div className={ls.root}>
    <div className={ls.sideBar} id='right-panel'/>
    <div className={ls.right}>
      <div className={ls.viewer} id='viewer-container'/>
      <ControlBar />
    </div>
  </div>
}