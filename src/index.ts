import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import menuGltf from './assets/menu-baked.gltf'

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer

const render = () => {
  renderer.render(scene, camera)
}

const init = () => {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10
  camera.position.y = 10

  scene = new Scene()

  const loader = new GLTFLoader()
  loader.load(menuGltf, (gltf) => {
    scene.add(gltf.scene)

    render()
  })

  renderer = new WebGLRenderer({
    canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.physicallyCorrectLights = true
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 2
  renderer.outputEncoding = sRGBEncoding

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render)
  controls.minDistance = 10
  controls.maxDistance = 50
  controls.enablePan = false

  window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
render()
