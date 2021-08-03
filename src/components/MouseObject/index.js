import React, { useMemo, useRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useBox } from "@react-three/cannon"

const Y_POS = 6

const MouseObject = React.forwardRef( (props, ref) => {

  const { mouseRef, keyRef, goToRoute } = props
  const { camera, scene } = useThree()
  const meshRef = useRef()

  const targetRef = useRef(new THREE.Vector3(0, 0, 0))
  const isHomeRef = useRef(true)

  useImperativeHandle( ref, () => ({
    goBack: () => {
      targetRef.current = new THREE.Vector3(0, 0, 0)
      isHomeRef.current = true
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

  const checkIntersect = (mesh1, meshes) => {

    for (const mesh2 of meshes) {
      const box1 = new THREE.Box3().setFromObject(mesh1);
      const box2 = new THREE.Box3().setFromObject(mesh2)
      if (box2.containsBox(box1))
        return mesh2.name
    }

    return null
  }

  useFrame(() => {

    const isKeyPressed = Object.keys(keyRef.current).length > 0

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

    if (!isKeyPressed && mouseRef.current) {
      targetRef.current = mouseRef.current
    }

    targetRef.current.y = 0 
    if (meshRef.current.position.distanceTo(targetRef.current) > 1) {
      
      meshRef.current.position.lerp(targetRef.current, 0.03)
      if (!isKeyPressed) {
        const rotationY = Math.atan2( (targetRef.current.x - meshRef.current.position.x), (targetRef.current.z - (meshRef.current.position.z) ) )
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(new THREE.Euler(0, rotationY, 0))
        meshRef.current.quaternion.slerp(quaternion, 0.05)
      }

      collider.position.set(meshRef.current.position.x, Y_POS, meshRef.current.position.z)
      collider.rotation.set(meshRef.current.rotation.x, meshRef.current.rotation.y, meshRef.current.rotation.z)

      if (isHomeRef.current)
        camera.position.lerp({ x: targetRef.current.x, y: 13, z: targetRef.current.z + 15 }, 0.03)

      const routeObjects = scene.getObjectByName('routes').children.map(x => x.children[0])
      const intersect = checkIntersect(meshRef.current, routeObjects)
      if (intersect && isHomeRef.current) {
        goToRoute(intersect)
        isHomeRef.current = false
      }
      if (intersect == null && !isHomeRef.current) {
        goToRoute('')
        isHomeRef.current = true
      } 

    }
  })

  return (
    <>
      <mesh ref={colliderRef} name="mouseObject"> 
        <boxGeometry args={[5, 2, 4]}/>
        <meshBasicMaterial color='red' transparent opacity={0.5}/>
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


