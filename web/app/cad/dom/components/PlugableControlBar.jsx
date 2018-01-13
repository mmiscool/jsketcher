import React, {Fragment} from 'react';
import ControlBar, {ControlBarButton} from './ControlBar';
import connect from 'ui/connect';
import Fa from 'ui/components/Fa';
import {TOKENS as UI_TOKENS} from '../uiEntryPointsPlugin';
import {TOKENS as ACTION_TOKENS} from '../../actions/actionSystemPlugin';


function ConfigurableControlBar({leftGroupActions, rightGroupActions}) {

  return <ControlBar>
    {[
      <Fragment>{toButtons(leftGroupActions)}</Fragment>,
      <Fragment>{toButtons(rightGroupActions)}</Fragment>
    ]}
  </ControlBar>
}

function toButtons(actions) {
  return actions.map(({id, label, cssIcons, invoke}) => {
    let Comp = connect(ACTION_TOKENS.actionState(id), ActionButton, {label, cssIcons, invoke});
    return <Comp key={id} />;
  });
}

function ActionButton({label, cssIcons, onClick, enabled, visible}) {
  if (!visible) {
    return null;
  }
  return <ControlBarButton {...{onClick, enabled}}>
    {cssIcons && <Fa fa={cssIcons} fw/>} {label}
  </ControlBarButton>
}

export default connect([UI_TOKENS.CONTROL_BAR_LEFT, UI_TOKENS.CONTROL_BAR_RIGHT, ACTION_TOKENS.ACTIONS],
  ConfigurableControlBar, undefined, ([leftActions, rightActions, actions]) => {
    const toAction = (ref) => {
      let id, override;
      if (Array.isArray(ref)) {
        [id, override] = ref;
      } else {
        id = ref;
      }
      let action = actions[id];
      if (!action) {
        return null;
      }
      return Object.assign({}, action, override);
    };
    const toActions = (config) => config.map(toAction).filter(action => action !== null);
    return {
      leftGroupActions: toActions(leftActions),
      rightGroupActions: toActions(rightActions)
    };
  }
);