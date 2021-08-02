import React, { useMemo, useRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useBox } from "@react-three/cannon"

const Y_POS = 6

const raycaster = new THREE.Raycaster()
const RAYS = [
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(1, 0, 1),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(1, 0, -1),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(-1, 0, -1),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(-1, 0, 1)
]

const MouseObject = React.forwardRef( (props, ref) => {

  const { mouseRef, keyRef, goToRoute } = props
  const { camera, scene } = useThree()
  const meshRef = useRef()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))
  const isGoingBackRef = useRef(false)

  useImperativeHandle( ref, () => ({
    goBack: () => {
      isGoingBackRef.current = true
      targetRef.current = new THREE.Vector3(0, 0, 0)
    },
  }) )

  const [colliderRef, collider] = useBox(() => ({ 
    // mass: 1, 
    isKinematic: true,
    args: [5, 2, 4], 
    position: [0, Y_POS, 0], 
    onCollide: (e) => {
    }
  }))

  const object = useGLTF(require('@/assets/glb/plane.glb').default)
  useMemo(() => {
    Object.values(object.nodes).forEach(obj => {
      obj.isMesh && Object.assign(obj, { castShadow: true })
    })
  }, [object.nodes])

  const checkIntersect = (mesh1, mesh2) => {
    for (const ray of RAYS) {
  
      raycaster.set(mesh1.position, ray)
      const intersects = raycaster.intersectObjects(mesh2)
  
      if (intersects.length > 0 && intersects[0].distance < 1) {
        goToRoute(intersects[0].object.name)
      }
    }
  }

  useFrame(() => {
    let rotationY = null

    if (isGoingBackRef.current) {
      rotationY = Math.atan2( (targetRef.current.x - meshRef.current.position.x), (targetRef.current.z - (meshRef.current.position.z) ) )
    }
    else {
      if (keyRef.current['ArrowUp'] || keyRef.current['ArrowDown'] ) {
        const direction = new THREE.Vector3()
        meshRef.current.getWorldDirection(direction)
        targetRef.current.copy(meshRef.current.position)
        targetRef.current.add(direction.multiplyScalar(keyRef.current['ArrowUp'] ? 10 : -10))
      }
      if (keyRef.current['ArrowRight']) {
        meshRef.current.rotateY(-0.05)
      }
      if (keyRef.current['ArrowLeft']) {
        meshRef.current.rotateY(0.05)
      }
      if (Object.keys(keyRef.current).length == 0 && mouseRef.current ) {
        targetRef.current = mouseRef.current
        rotationY = Math.atan2( (targetRef.current.x - meshRef.current.position.x), (targetRef.current.z - (meshRef.current.position.z) ) )
      }
    }
 
    targetRef.current.y = 0 

    if (meshRef.current.position.distanceTo(targetRef.current) > 1) {
      
      meshRef.current.position.lerp(targetRef.current, 0.03)
      if (rotationY) {
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(new THREE.Euler(0, rotationY, 0))
        meshRef.current.quaternion.slerp(quaternion, 0.05)
      }

      collider.position.set(meshRef.current.position.x, Y_POS, meshRef.current.position.z)
      collider.rotation.set(meshRef.current.rotation.x, meshRef.current.rotation.y, meshRef.current.rotation.z)

      camera.position.lerp({ x: targetRef.current.x, y: 13, z: targetRef.current.z + 15 }, 0.03)

      if (!isGoingBackRef.current) {
        const routeObjects = scene.getObjectByName('routes').children.map(x => x.children[0])
        checkIntersect(meshRef.current, routeObjects)
      }
    }
    else if (isGoingBackRef.current == true) {
      isGoingBackRef.current = false
      mouseRef.current = null
    }
  })

  return (
    <>
      <mesh ref={colliderRef} name="mouseObject"> 
        <boxGeometry args={[5, 2, 4]}/>
        <meshBasicMaterial color='red' transparent opacity={0}/>
      </mesh>
      <group ref={meshRef} rotation={[0, Math.PI, 0]}>
        <group position={[0, Y_POS, 0]} rotation={[0, Math.PI * 0.5, 0]}>
          {/* <pointLight castShadow position={[0, 9, 0]} intensity={1}/> */}
          <primitive object={object.scene} dispose={null} />
        </group>
      </group>
    </>
  )

})

export default MouseObject


