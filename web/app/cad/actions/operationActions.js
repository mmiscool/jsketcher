import * as Operations from '../craft/operations'
import * as ActionHelpers from './action-helpers'

const OPERATION_ACTIONS = [
  {
    id: 'CUT',
    info: 'makes a cut based on 2D sketch',
    ...requiresFaceSelection(1)
  },
  {
    id: 'EXTRUDE',
    info: 'extrudes 2D sketch',
  },
  {
    id: 'REVOLVE',
    info: 'revolve 2D sketch',
    ...requiresFaceSelection(1)
  },
  {
    id: 'SHELL',
    info: 'makes shell using borders',
    ...requiresFaceSelection(1)
  },
  {
    id: 'BOX',
    info: 'creates new object box'
  },
  {
    id: 'PLANE',
    info: 'creates new object plane'
  },
  {
    id: 'SPHERE',
    info: 'creates new object sphere'
  },
  {
    id: 'INTERSECTION',
    info: 'intersection operation on two solids',
    ...requiresSolidSelection(2)
  },
  {
    id: 'DIFFERENCE',
    info: 'difference operation on two solids',
    ...requiresSolidSelection(2)
  },
  {
    id: 'UNION',
    info: 'union operation on two solids',
    ...requiresSolidSelection(2)
  },
  {
    id: 'IMPORT_STL',
    info: 'import stl from external location'
  }
];

function mergeInfo(action) {
  const op = Operations[action.id];
  action.label = op.label;
  action.icon32 = op.icon + '32.png';
  action.icon96 = op.icon + '96.png';
  action.invoke = (app) => app.ui.initOperation(action.id);
}

OPERATION_ACTIONS.forEach(action => mergeInfo(action));

function requiresFaceSelection(amount) {
  return {
    listens: ['selection_face'],
    update: ActionHelpers.checkForSelectedFaces(amount)
  }
}

function requiresSolidSelection(amount) {
  return {
    listens: ['selection_face'],
    update: ActionHelpers.checkForSelectedSolids(amount)
  }
}

export default OPERATION_ACTIONS;