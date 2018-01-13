import CoreActions from '../actions/coreActions';
import OperationActions from '../actions/operationActions';
import HistoryActions from '../actions/historyActions';

import {CONTROL_BAR_ACTIONS_LEFT, CONTROL_BAR_ACTIONS_RIGHT} from "./uiConfig";

export function activate({bus, services}) {

  services.action.registerActions(CoreActions);
  services.action.registerActions(OperationActions);
  services.action.registerActions(HistoryActions);
  
  bus.dispatch('ui.config.controlBar.left', CONTROL_BAR_ACTIONS_LEFT);
  bus.dispatch('ui.config.controlBar.right', CONTROL_BAR_ACTIONS_RIGHT);
  
  
  
}