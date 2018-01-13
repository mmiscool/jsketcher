import React from 'react';
import PlugableControlBar from './PlugableControlBar';

import ls from './View3d.less';
import ObjectExplorer from './ObjectExplorer';
import OperationHistory from './OperationHistory';
import Toolbar, {ToolbarButton} from 'ui/components/Toolbar';
import ImgIcon from 'ui/components/ImgIcon';
import Fa from 'ui/components/Fa';

export default class View3d extends React.PureComponent {
  
  render() {
    return <div className={ls.root}>
      <div className={ls.sideBar}>
        <ObjectExplorer/>
        <OperationHistory/>
      </div>
      <div className={ls.viewer} id='viewer-container'>
        {/*<div className={ls.viewer} */}
        <Toolbar left='2em' top='2em'>
          <ToolbarButton label='Cut' icon={ <ImgIcon url='img/cad/intersection96.png' size={48} /> } />
          <ToolbarButton label='Cut' icon={ <ImgIcon url='img/cad/cut96.png' size={48} /> } />
        </Toolbar>
        <Toolbar right='2em' top='2em'>
          <ToolbarButton icon={ <Fa fw icon='floppy-o' style={{fontSize: '2em'}}/> } />
          <ToolbarButton icon={ <Fa fw fa={['upload', 'flip-vertical']} style={{fontSize: '2em'}}/> } />
        </Toolbar>
        <PlugableControlBar />
      </div>
    </div>
  }
}