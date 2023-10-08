var nav = document.querySelector('nav');
nav.innerHTML = `<div class="nav-logo">
<h1>peolove</h1>
</div>
<input type="checkbox" id="check">
<label for="check">
<span class="hamburger"></span>
<span class="hamburger"></span>
<span class="hamburger"></span>
</label>


<div class="nav-links">
<a class="active" href="#"><span>home</span></a>
<a href="#"><span>about</span></a>
<a href="#"><span>cool</span></a>
<a href="#"><span>contract</span></a>
</div>`;





var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });



var starCountiner = document.querySelector('.star-continer');
var Vhight = window.innerHeight;
var vwidth = window.innerWidth;
var starRow = window.innerHeight/25;
var starColumn = window.innerWidth/25;
var stars = starRow * starColumn;
var star = `<div class="star"></div>`;
for(var i = 0; i < stars; i++){
   
   var star = star + `<div class="star"></div>`;
}

starCountiner.innerHTML = star;



//three
let camera, scene, renderer, stats, material;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x556677, 0.001 );

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const sprite = new THREE.TextureLoader().load( './Untitled-2.png' );
  sprite.colorSpace = THREE.SRGBColorSpace;

  for ( let i = 0; i < 10000; i ++ ) {

      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;

      vertices.push( x, y, z );

  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
  material.color.setHSL( 1.0, 0.3, 0.7, THREE.SRGBColorSpace );

  const particles = new THREE.Points( geometry, material );
  scene.add( particles );

  //
  renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
  });
  // renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  




  // document.body.style.touchAction = 'none';
  document.body.addEventListener( 'pointermove', onPointerMove );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove( event ) {

  if ( event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  // stats.update();

}

function render() {

  const time = Date.now() * 0.00005;

  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

  camera.lookAt( scene.position );

  const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
  material.color.setHSL( h, 0.5, 0.5 );

  renderer.render( scene, camera );

}
