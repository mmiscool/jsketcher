import {AXIS} from '../../math/l3space'
import {createArrow} from 'scene/objects/auxiliary';
import Vector from 'math/vector';
import {OnTopOfAll} from 'scene/materialMixins';
import {moveObject3D, setBasisToObject3D} from 'scene/objects/transform';

import * as SceneGraph from 'scene/sceneGraph';

export default class CadScene {

  constructor(rootGroup) {
    this.workGroup = SceneGraph.createGroup();
    this.auxGroup = SceneGraph.createGroup();
    SceneGraph.addToGroup(rootGroup, this.workGroup);
    SceneGraph.addToGroup(rootGroup, this.auxGroup);

    this.setUpAxises();
    this.setUpBasisGroup();
  }

  setUpAxises() {
    let arrowLength = 1500;
    let createAxisArrow = createArrow.bind(null, arrowLength, 40, 16);
    let addAxis = (axis, color) => {
      let arrow = createAxisArrow(axis, color, 0.2);
      moveObject3D(arrow, axis.scale(-arrowLength * 0.5));
      SceneGraph.addToGroup(this.auxGroup, arrow);
    };

    addAxis(AXIS.X, 0xFF0000);
    addAxis(AXIS.Y, 0x00FF00);
    addAxis(AXIS.Z, 0x0000FF);
  }

  setUpBasisGroup() {
    let length = 200;
    let arrowLength = length * 0.2;
    let arrowHead = arrowLength * 0.4;

    let _createArrow = createArrow.bind(null, length, arrowLength, arrowHead);

    function createBasisArrow(axis, color) {
      return _createArrow(axis, color, 0.4, [OnTopOfAll]);
    }

    this.basisGroup = SceneGraph.createGroup();

    let xAxis = createBasisArrow(new Vector(1, 0, 0), 0xFF0000);
    let yAxis = createBasisArrow(new Vector(0, 1, 0), 0x00FF00);
    SceneGraph.addToGroup(this.basisGroup, xAxis);
    SceneGraph.addToGroup(this.basisGroup, yAxis);
    SceneGraph.addToGroup(this.workGroup, this.basisGroup, yAxis);
  }

  updateBasis(basis, depth) {
    setBasisToObject3D(this.basisGroup, basis, depth);
  }

  showBasis(basis, depth) {
    this.updateBasis(basis, depth);
    this.basisGroup.visible = true;
  }

  hideBasis() {
    this.basisGroup.visible = false;
  }
}