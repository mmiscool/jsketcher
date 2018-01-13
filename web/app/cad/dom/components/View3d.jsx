import React from 'react';
import PlugableControlBar from './PlugableControlBar';

import ls from './View3d.less';
import ObjectExplorer from './ObjectExplorer';
import OperationHistory from './OperationHistory';
import Toolbar, {ToolbarButton} from 'ui/components/Toolbar';
import ImgIcon from 'ui/components/ImgIcon';
import Fa from 'ui/components/Fa';
import Abs from 'ui/components/Abs';
import {PlugableToolbarLeft, PlugableToolbarLeftSecondary, PlugableToolbarRight} from "./PlugableToolbar";

export default class View3d extends React.PureComponent {
  
  render() {
    return <div className={ls.root}>
      <div className={ls.sideBar}>
        <ObjectExplorer/>
        <OperationHistory/>
      </div>
      <div className={ls.viewer} id='viewer-container'>
        {/*<div className={ls.viewer} */}
        <div>
        </div>
        <Abs left='2em' top='2em' className={ls.leftToolbarGroup}>
          <PlugableToolbarLeft />
          <PlugableToolbarLeftSecondary />
        </Abs>
        <Abs right='2em' top='2em'>
          <PlugableToolbarRight className={ls.smallToolbar}/>
        </Abs>
        <PlugableControlBar />
      </div>
    </div>
  }
}