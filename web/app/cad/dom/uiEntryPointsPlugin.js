import {createToken} from 'bus';


export function activate({bus}) {

  bus.enableState(TOKENS.CONTROL_BAR_LEFT, []);
  bus.enableState(TOKENS.CONTROL_BAR_RIGHT, []);
  
}

const NS = 'ui.config';
  
export const TOKENS = {
  CONTROL_BAR_LEFT: createToken(NS, 'controlBar.left'),
  CONTROL_BAR_RIGHT: createToken(NS, 'controlBar.right')
};

