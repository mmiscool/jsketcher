import DPR from 'dpr';

export default class SceneSetUp{
  
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

  setUpCamerasAndLights() {
    this.camera = new THREE.PerspectiveCamera( 500*75, this.aspect(), 0.1, 10000 );
    this.camera.position.z = 1000;
    this.camera.position.x = -1000;
    this.camera.position.y = 300;

    this.light = new THREE.PointLight( 0xffffff);
    this.light.position.set( 10, 10, 10 );
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(DPR);
    this.renderer.setClearColor(0x808080, 1);
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    this.container.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', () => {
      this.camera.aspect = this.aspect();
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
      this.render();
    }, false );
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