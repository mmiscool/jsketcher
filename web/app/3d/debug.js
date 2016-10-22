import {checkForSelectedFaces} from './actions/action-helpers'
import {LoadTemplate} from './ui/utils'
import {BindObject} from './ui/bind.js'

export const DEBUG = false;

export function AddDebugSupport(app) {

  //
  //$('body').append($('<div>', {css: {
  //  position: 'absolute',
  //  width: '500px',
  //  height: '500px',
  //  background: '#777',
  //  color: '0f0',
  //  'font-size': '9px',
  //  'z-index': 99999
  //}}).append(dom) );




  if (!DEBUG) return;
  app.actionManager.registerActions(DebugActions);
  app.ui.registerMenuActions(DebugMenuConfig);
  app.controlBar.add('menu.debug', true);
}

const DebugMenuConfig = {
  debug: {
    label: 'debug',
    cssIcons: ['bug'],
    info: 'set of debug actions',
    actions: [ 'DebugPrintAllSolids', 'DebugPrintFace', 'DebugFaceId']
  }
};

const DebugActions = {
  'DebugPrintAllSolids': {
    cssIcons: ['cutlery'],
    label: 'print all solids',
    info: 'print all solids from the proejct as JSON',
    invoke: (app) => {
      app.findAllSolids().map(function (o) {
        console.log("Solid ID: " + o.tCadId);
        console.log(JSON.stringify(o.csg));
      });
    }
  },

  'DebugPrintFace': {
    cssIcons: ['cutlery'],
    label: 'print face',
    info: 'print a face out as JSON',
    listens: ['selection'],
    update: checkForSelectedFaces(1),
    invoke: (app) => {
      var s = app.viewer.selectionMgr.selection[0];
      console.log(JSON.stringify({
        polygons: s.csgGroup.polygons,
        basis: s._basis
      }));
    }
  },

  'DebugFaceId': {
    cssIcons: ['cutlery'],
    label: 'print face id',
    info: 'print a face id',
    listens: ['selection'],
    update: checkForSelectedFaces(1),
    invoke: (app) => {
      console.log(app.viewer.selectionMgr.selection[0].id);
    }
  }
};
