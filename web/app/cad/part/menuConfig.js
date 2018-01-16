export default [
  {
    id: 'file',
    cssIcons: ['file'],
    actions: ['Save', 'StlExport', '-', 'IMPORT_STL']
  },
  {
    id: 'craft',
    cssIcons: ['magic'],
    info: 'set of available craft operations on a solid',
    actions: ['EXTRUDE', 'CUT', 'REVOLVE', 'SHELL']
  },
  {
    id: 'primitives',
    label: 'add',
    cssIcons: ['cube', 'plus'],
    info: 'set of available solid creation operations',
    actions: ['PLANE', 'BOX', 'SPHERE']
  },
  {
    id: 'boolean',
    label: 'bool',
    cssIcons: ['pie-chart'],
    info: 'set of available boolean operations',
    actions: ['INTERSECTION', 'DIFFERENCE', 'UNION']
  },
  {
    id: 'main',
    label: 'start',
    cssIcons: ['rocket'],
    info: 'common set of actions',
    actions: ['EXTRUDE', 'CUT', 'SHELL', '-', 'INTERSECTION', 'DIFFERENCE', 'UNION', '-', 'PLANE', 'BOX', 'SPHERE', '-',
      'EditFace', '-', 'DeselectAll', 'RefreshSketches']
  },
  {
    id: 'SolidContext',
    label: 'solid-context',
    info: 'solid context actions',
    actions: ['LookAtSolid']
  }
];
