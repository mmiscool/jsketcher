import React, {Fragment} from 'react';
import connect from 'ui/connect';
import Fa from 'ui/components/Fa';
import {TOKENS as UI_TOKENS} from '../uiEntryPointsPlugin';
import {TOKENS as ACTION_TOKENS} from '../../actions/actionSystemPlugin';
import actionToProps from "../../actions/actionToProps";
import Toolbar, {ToolbarButton} from "../../../../../modules/ui/components/Toolbar";
import ImgIcon from "../../../../../modules/ui/components/ImgIcon";


function ConfigurableToolbar({actions, small}) {

  return <Toolbar>
    {actions.map(({id, label, cssIcons, icon96, invoke}) => {
      let staticProps = { 
        icon: small ? <Fa fa={cssIcons} fw/> : <ImgIcon url={icon96} size={48} />,
        label: small ? null : label,
        onClick: invoke
      };
      let Comp = connect(ACTION_TOKENS.actionState(id), ActionButton, staticProps);
      return <Comp key={id}/>;
    })}
  </Toolbar>
}

function ActionButton({label, icon, onClick, enabled, visible}) {
  if (!visible) {
    return null;
  }
    
  return <ToolbarButton {...{onClick, disabled: !enabled}}>
    {icon}
    {label && <div>{label}</div>}
  </ToolbarButton>
}

export function createPluggableToolbar(configToken, small) {
  return connect([configToken, ACTION_TOKENS.ACTIONS],
    ConfigurableToolbar, {small}, 
    ([toolbarActions, actionIndex]) => {
      const toActions = (config) => config.map(ref => actionToProps(ref, actionIndex)).filter(action => action !== null);
      return {actions: toActions(toolbarActions)};
    });
}

export const PlugableToolbarLeft = createPluggableToolbar(UI_TOKENS.TOOLBAR_BAR_LEFT);
export const PlugableToolbarLeftSecondary = createPluggableToolbar(UI_TOKENS.TOOLBAR_BAR_LEFT_SECONDARY);
export const PlugableToolbarRight = createPluggableToolbar(UI_TOKENS.TOOLBAR_BAR_RIGHT, true);