import DPR from 'dpr';
import './utils/threeLoader'

export default class SceneSetUp {
  
  constructor(container) {
    
    this.container = container;
    this.scene = new THREE.Scene();
    this.rootGroup = this.scene;

    this.setUpCamerasAndLights();
    this.setUpControls();

    this.animate();
  }

  aspect() {
    return this.container.clientWidth / this.container.clientHeight;
  }
  
  createOrthographicCamera() {
    let width = this.container.clientWidth;
    let height = this.container.clientHeight;
    let factor = ORTHOGRAPHIC_CAMERA_FACTOR;
    this.oCamera = new THREE.OrthographicCamera(-width / factor,
      width / factor,
      height / factor,
      -height / factor, 0.1, 10000);
    this.oCamera.position.z = 1000;
    this.oCamera.position.x = -1000;
    this.oCamera.position.y = 300;
  }

  createPerspectiveCamera() {
    this.pCamera = new THREE.PerspectiveCamera( 500*75, this.aspect(), 0.1, 10000 );
    this.pCamera.position.z = 1000;
    this.pCamera.position.x = -1000;
    this.pCamera.position.y = 300;
  }

  setUpCamerasAndLights() {
    this.createOrthographicCamera();
    this.createPerspectiveCamera();

    this.camera = this.pCamera;
    
    this.light = new THREE.PointLight( 0xffffff);
    this.light.position.set( 10, 10, 10 );
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(DPR);
    this.renderer.setClearColor(0x808080, 1);
    this.renderer.setSize( this.container.clientWidth,  this.container.clientHeight );
    this.container.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', () => {
      this.updatePerspectiveCameraViewport();
      this.updateOrthographicCameraViewport();
      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
      this.render();
    }, false );
  }

  updatePerspectiveCameraViewport() {
    this.pCamera.aspect = this.aspect();
    this.pCamera.updateProjectionMatrix();
  }

  updateOrthographicCameraViewport() {
    let width = this.container.clientWidth;
    let height = this.container.clientHeight;
    let factor = ORTHOGRAPHIC_CAMERA_FACTOR;
    this.oCamera.left = - width / factor;
    this.oCamera.right = width / factor;
    this.oCamera.top = height / factor;
    this.oCamera.bottom = - height / factor;
    this.oCamera.updateProjectionMatrix();
  }
  
  setCamera(camera) {
    let camPosition = new THREE.Vector3();
    let camRotation = new THREE.Euler();
    let tempMatrix = new THREE.Matrix4();

    camPosition.setFromMatrixPosition( this.camera.matrixWorld );
    camRotation.setFromRotationMatrix( tempMatrix.extractRotation( this.camera.matrixWorld ) );
    let camDistance = camera.position.length();

    camera.up.copy(this.camera.up);
    camera.position.copy(camPosition);
    camera.quaternion.copy(camPosition);
    this.trackballControls.setCameraMode(camera.isOrthographicCamera);
    camera.position.normalize();
    camera.position.multiplyScalar(camDistance);
    
    this.camera = camera;
    this.trackballControls.object = camera;
    this.transformControls.camera = camera;
    this.updateControlsAndHelpers();
  }

  setUpControls() {
    //  controls = new THREE.OrbitControls( camera , renderer.domElement);
    let trackballControls = new THREE.TrackballControls(this.camera , this.renderer.domElement);

    // document.addEventListener( 'mousemove', function(){

    //   controls.update();

    // }, false );
    trackballControls.rotateSpeed = 3.8;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;

    trackballControls.noZoom = false;
    trackballControls.noPan = false;

    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;

    trackballControls.keys = [ 65, 83, 68 ];
    trackballControls.addEventListener( 'change', () => this.render());

    let transformControls = new THREE.TransformControls( this.camera, this.renderer.domElement );
    transformControls.addEventListener( 'change', () => this.render() );
    this.scene.add( transformControls );
    
    this.trackballControls = trackballControls;
    this.transformControls = transformControls;

    let updateTransformControls = () => {
      if (transformControls.object !== undefined) {
        if (transformControls.object.parent === undefined) {
          transformControls.detach();
          this.render();
        }
        transformControls.update();
      }
    };

    this.updateControlsAndHelpers = function() {
      trackballControls.update();
      updateTransformControls();
    };
  }

  raycast(event, group) {
    let raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 12 * (this._zoomMeasure() * 0.8);
    let x = ( event.offsetX / this.container.clientWidth ) * 2 - 1;
    let y = - ( event.offsetY / this.container.clientHeight ) * 2 + 1;

    let mouse = new THREE.Vector3( x, y, 1 );
    raycaster.setFromCamera( mouse, this.camera );
    return raycaster.intersectObjects( group.children, true );
  }

  lookAt(obj) {
    let box = new THREE.Box3();
    box.setFromObject(obj);
    let size = box.size();
    //this.camera.position.set(0,0,0);
    box.center(this.camera.position);
    const maxSize = Math.max(size.x, size.z);
    const dist = maxSize / 2 / Math.tan(Math.PI * this.camera.fov / 360);
    this.camera.position.addScaledVector(this.camera.position.normalize(), 5000);
    //this.camera.position.sub(new THREE.Vector3(0, 0, dist));
    this.camera.up = new THREE.Vector3(0, 1, 0);
  }

  _zoomMeasure() {
    return this.trackballControls.object.position.length() / 1e3;
  }
  
  animate() {
    requestAnimationFrame( () => this.animate() );
    this.updateControlsAndHelpers();
  };

  render() {
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  };

  domElement() {
    return this.renderer.domElement;   
  }
}

const ORTHOGRAPHIC_CAMERA_FACTOR = 1;