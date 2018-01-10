import React, {Fragment} from 'react';

import 'ui/styles/init/minireset.css';
import 'ui/styles/init/main.less';
import '../../../../css/app3d-legacy.less';

import View3d from "./View3d";

import WindowSystem from 'ui/WindowSystem';
import Window from "ui/components/Window";
import Folder from "ui/components/Folder";
import Field from "ui/components/controls/Field";
import Label from "ui/components/controls/Label";
import NumberControl from "ui/components/controls/NumberControl";
import ButtonGroup from "ui/components/controls/ButtonGroup";
import Button from "ui/components/controls/Button";

import ls from './WebApplication.less';

export default class WebApplication extends React.Component {

  render() {
    return <div className={ls.root}>
      
      <div className={ls.activeContent}>
        <div className='app-tab-view' id='view-3d'>
          {/*<View3d />*/}
        </div>
      </div>
      
      <div className={ls.contentSwitcher}>
        22
        <div id='tab-switcher'/>
      </div>
      <a id='downloader' style={{display: 'none'}}/>
      {/*<WindowSystem />      */}
      {/*<Window initWith={250} >*/}
        {/*<Folder title="Test">*/}
          {/*<Field>*/}
            {/*<Label>Width</Label>*/}
            {/*<NumberControl initValue={5} onChange={val => console.log(val)}/>*/}
          {/*</Field>*/}
          {/*<Field>*/}
            {/*<Label>Width</Label>*/}
            {/*<NumberControl initValue={6} onChange={val => console.log(val)}/>*/}
          {/*</Field>*/}
          {/*<ButtonGroup>*/}
            {/*<Button text='Cancel' />*/}
            {/*<Button text='OK' />*/}
          {/*</ButtonGroup>*/}
        {/*</Folder>*/}
      {/*</Window>*/}
    </div>
  }
}