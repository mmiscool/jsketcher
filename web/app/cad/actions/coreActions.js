import * as ActionHelpers from './action-helpers'

export default [
  {
    id: 'EditFace',
    cssIcons: ['file-picture-o'],
    label: 'sketch',
    icon96: 'img/cad/face-edit96.png',
    info: 'open sketcher for a face/plane',
    listens: ['selection_face'],
    update: ActionHelpers.checkForSelectedFaces(1),
    invoke: (context) => context.services.sketcher.editFace()
  },

  {
    id: 'Save',
    cssIcons: ['floppy-o'],
    label: 'save',
    info: 'save project to storage',
    invoke: (context) => context.services.project.save()
  },

  {
    id: 'StlExport',
    cssIcons: ['upload', 'flip-vertical'],
    label: 'STL Export',
    info: 'export model to STL file',
    invoke: (context) => context.services.project.stlExport()
  },


  {
    id: 'RefreshSketches',
    cssIcons: ['refresh'],
    label: 'Refresh Sketches',
    info: 'refresh all visible sketches',
    invoke: (context) => context.services.sketcher.refreshSketches()
  },

  {
    id: 'DeselectAll',
    cssIcons: ['square-o'],
    label: 'deselect all',
    info: 'deselect everything',
    invoke: (context) => context.services.selection.deselectAll()
  },

  {
    id: 'ToggleCameraMode',
    cssIcons: ['video-camera'],
    label: 'toggle camera',
    info: 'switch camera mode between perspective and orthographic',
    invoke: (app) => {
      let viewer = app.context.services.viewer;
      viewer.toggleCamera();
      viewer.render();
    }
  },

  {
    id: 'Info',
    cssIcons: ['info-circle'],
    label: 'info',
    info: 'opens help dialog',
    invoke: (context) => context.services.help.showInfo()
  },

  {
    id: 'Donate',
    cssIcons: ['paypal'],
    label: 'donate',
    info: 'open paypal donate page',
    invoke: (context) => window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WADW7V7CC32CY&lc=US&item_name=web%2dcad%2eorg&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted', '_blank')
  },

  {
    id: 'GitHub',
    cssIcons: ['github'],
    label: 'GitHub',
    info: 'open GitHub project page',
    invoke: (context) => window.open('https://github.com/xibyte/jsketcher', '_blank')
  },

  {
    id: 'ShowSketches',
    type: 'binary',
    property: 'showSketches',
    cssIcons: ['image'],
    label: 'show sketches',
    info: 'toggle whether to show sketches on a solid face'
  },

  {
    id: 'LookAtSolid',
    cssIcons: ['crosshairs'],
    label: 'look at solid',
    info: 'position camera at the solid at zoom to fit it',
    invoke: (context) => app.lookAtSolid(app.inputManager.context.attr('data-id'))
  },
  
  {
    id: 'noIcon',
    label: 'no icon'
  }
]

