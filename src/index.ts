import {
  ACESFilmicToneMapping,
  AnimationMixer,
  Clock,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import boxesGltf from './assets/boxes.gltf'

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, mixer: AnimationMixer, clock: Clock

const render = () => {
  requestAnimationFrame(render)
  mixer.update(clock.getDelta())
  renderer.render(scene, camera)
}

const init = () => {
  scene = new Scene()

  clock = new Clock()

  const loader = new GLTFLoader()
  loader.load(boxesGltf, (gltf) => {
    camera = gltf.cameras[0] as PerspectiveCamera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.fov = 35
    camera.updateProjectionMatrix()

    const gltfScene = gltf.scene
    scene.add(gltfScene)

    const animations = gltf.animations

    mixer = new AnimationMixer(gltfScene)

    animations.forEach(animation => {
      const action = mixer.clipAction(animation)

      action.play()
    })

    render()
  })

  renderer = new WebGLRenderer({
    canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.physicallyCorrectLights = true
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.05
  renderer.outputEncoding = sRGBEncoding

  window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}

init()
