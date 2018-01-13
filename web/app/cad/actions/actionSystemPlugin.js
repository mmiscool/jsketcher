import {createToken} from 'bus';

export function activate(context) {
  
  let {bus} = context;
  
  bus.enableState(TOKENS.ACTIONS, {});
  
  function run(id, data) {
    bus.state.actions[id].invoke(context, data);
  }

  function register(action) {
    bus.state.actions[action.id] = action;

    let stateToken = TOKENS.actionState(action.id);
    bus.enableState(stateToken, {
      hint: '',
      enabled: true,
      visible: true
    });
    
    if (action.update && action.listens) {

      const stateUpdater = () => {
        let actionState = bus.state[stateToken];
        actionState.hint = '';
        actionState.enabled = true;
        actionState.visible = true;
        action.update(actionState, context);
        bus.dispatch(stateToken, actionState);
      };

      for (let event of action.listens) {
        bus.subscribe(event, stateUpdater)();
      }
    }
  }
  
  function registerAction(action) {
    register(action);
    bus.dispatch(TOKENS.ACTIONS, bus.state.actions);
  }

  function registerActions(actions) {
    actions.forEach(action => register(action));
    bus.dispatch(TOKENS.ACTIONS, bus.state.actions);
  }

  context.services.action = {run, registerAction, registerActions}
}

export const TOKENS = {
  ACTION_STATE_NS: 'action.state',
  ACTIONS: createToken('actions'),
  actionState: (actionId) => {
    createToken(TOKENS.ACTION_STATE_NS, actionId)
  }
};