import React, { useEffect, useRef, useCallback, Suspense } from 'react';
import * as THREE from 'three'
import { isMobile } from "react-device-detect"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import { Physics, usePlane } from "@react-three/cannon"
import { useLocation, useHistory } from "react-router-dom"

import {
  CanvasWrapper
} from './styles'

import MouseObject from '@/components/MouseObject'
import RouteObject from '@/components/RouteObject'
import Box from '@/components/Box'


const SCENE_DATA = {
  '/': {
    color: '#012a36',
    cameraPos: null,
    cameraRot: [-Math.PI * 0.2, 0, 0]
  },
  '/about': {
    color: '#1d4f3d',
    cameraPos: new THREE.Vector3(4.67, 12.7, -4.51),
    cameraRot: [-0.754, -0.059, -0.056]
  },
  '/projects': {
    color: 'green',
    cameraPos: new THREE.Vector3(-5.83, 15.43, -6.89),
    cameraRot: [-0.7, 0.18, 0.15]
  }
}

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const Ground = ({ groundRef, sceneRef }) => {

  const materialRef = useRef()
  const [planeRef] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))

  useFrame(() => {
    let color = new THREE.Color(sceneRef.current.color)
    materialRef.current.color.lerp(color, 0.05)
  })

  return (
    <>
      <mesh ref={groundRef} position={[0, -0.1, 0]}>
        <cylinderBufferGeometry args={[65, 65, 0.1, 64]} />
        <meshStandardMaterial attach="material" opacity={0} />
      </mesh>
      <mesh ref={planeRef} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[450, 450]} />
        <meshStandardMaterial ref={materialRef} attach="material" color={'#012a36'} />
      </mesh>
    </>
  )
}

const Camera = ({ cameraRef, sceneRef }) => {

  const { size, set } = useThree()

  useEffect(() => {
    set({ camera: cameraRef.current })
  }, [])

  useFrame(() => {
    if (sceneRef.current.cameraPos)
      cameraRef.current.position.lerp(sceneRef.current.cameraPos, 0.03)

    const quaternion = new THREE.Quaternion()
    quaternion.setFromEuler(new THREE.Euler(sceneRef.current.cameraRot[0], sceneRef.current.cameraRot[1], sceneRef.current.cameraRot[2]))
    cameraRef.current.quaternion.slerp(quaternion, 0.05)
  })

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={[0, 13, 15]} 
      rotation={[-Math.PI * 0.2, 0, 0]} 
      fov={60}
      aspect={size.width / size.height}
      radius={(size.width + size.height) / 4}
      onUpdate={self => self.updateProjectionMatrix()}
    />
  )

}

const ThreeCanvas = () => {

  const location = useLocation()

  const canvasRef = useRef()
  const groundRef = useRef()
  const mouseObjectRef = useRef()
  const cameraRef = useRef()

  const sceneRef = useRef(SCENE_DATA['home'])
  const mouseRef = useRef(null)
  const keyRef = useRef({})

  const history = useHistory()

  const preventDefault = useCallback((e) => { e.preventDefault() }, [])
  useEffect(() => {
    canvasRef.current.addEventListener('touchmove',preventDefault, { passive: false })
  }, [])

  const updateMousePosition = useCallback(e => {
    if (cameraRef.current && groundRef.current) {
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current)
      const intersects = raycaster.intersectObject(groundRef.current)

      if (intersects.length > 0) {
        mouseRef.current = intersects[0].point
        mouseRef.current.z += 5
      }
    }
  }, [])

  const onKeyDown = useCallback(e => {
    keyRef.current[e.key] = true
  }, [])

  const onKeyUp = useCallback(e => {
    delete keyRef.current[e.key]
  }, [])

  const onMouseDown = (e) => {
    // console.log(cameraRef.current)
    updateMousePosition(e)
    window.addEventListener("mousemove", updateMousePosition)
  }

  const onMouseUp = () => {
    mouseRef.current = null
    window.removeEventListener("mousemove", updateMousePosition)
  }

  const onTouchMove = (e) => {
    updateMousePosition(e.targetTouches[0])
  }

  const onTouchStart = (e) => {
    updateMousePosition(e.targetTouches[0])
  }

  // useEffect(() => {
  //   sceneRef.current = SCENE_DATA[location.pathname]

  //   if (location.pathname == '/') {
  //     mouseObjectRef.current && mouseObjectRef.current.goBack()
  //     if (!isMobile) {
  //       window.addEventListener("keydown", onKeyDown)
  //       window.addEventListener("keyup", onKeyUp)
  //     }
  //   }
  //   else {
  //     mouseRef.current = null
  //     keyRef.current = []
  //     if (!isMobile) {
  //       window.removeEventListener("mousemove", updateMousePosition)
  //       window.removeEventListener("keydown", onKeyDown)
  //       window.removeEventListener("keyup", onKeyUp)
  //     }
  //   }
  // }, [location])

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
  }, [location])

  useEffect(() => {
    sceneRef.current = SCENE_DATA[location.pathname]

    if (location.pathname == '/') {
      mouseObjectRef.current && mouseObjectRef.current.goBack()
    }

  }, [location])

  const goToRoute = (pathname) => {
    pathname = '/' + pathname
    (location.pathname != pathname) && history.push(pathname)
  }

  return (
    <CanvasWrapper 
      ref={canvasRef}
      onMouseDown={isMobile ? null : onMouseDown} 
      onMouseUp={isMobile ? null : onMouseUp}
      onTouchMove={isMobile ? onTouchMove : null}
      onTouchStart={isMobile ? onTouchStart : null}
    >
      <Canvas shadows>
        <Camera cameraRef={cameraRef} sceneRef={sceneRef}/>
        <color attach="background" args={['white']} />
        <ambientLight intensity={1} />
        <spotLight 
          intensity={0.6} 
          position={[0, 150, 0]} 
          angle={0.6} 
          penumbra={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Suspense fallback={null}>
          <Physics
            // iterations={20}
            // tolerance={0.0001}
            // defaultContactMaterial={{
            //   friction: 0.9,
            //   restitution: 0.7,
            //   contactEquationStiffness: 1e7,
            //   contactEquationRelaxation: 1,
            //   frictionEquationStiffness: 1e7,
            //   frictionEquationRelaxation: 2,
            // }}
            gravity={[0, -10, 0]}
            // allowSleep={false}
          >
            <Ground groundRef={groundRef} sceneRef={sceneRef}/>
            <MouseObject ref={mouseObjectRef} mouseRef={mouseRef} keyRef={keyRef} goToRoute={goToRoute} />
            <group name="routes">
              <RouteObject position={[25, 0, -20]} rotation={[0, -Math.PI * 0.2, 0]} name='about' />
              <RouteObject position={[-25, 0, -20]} rotation={[0, Math.PI * 0.2, 0]} name='projects' />
            </group>
            <Box position={[-15, 0, 10]} rotation={[0, -Math.PI * 0.2, 0]}/>
            <Box position={[20, 0, 20]} />
          </Physics>
        </Suspense>
        {/* <OrbitControls/> */}
      </Canvas>
    </CanvasWrapper>
  )
}

export default ThreeCanvas
