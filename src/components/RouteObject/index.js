import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three'
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useBox } from "@react-three/cannon"

export default function RouteObject(props) {

  const { name, position, rotation } = props

  const font = useLoader(THREE.FontLoader, './Roboto_Bold.json')
  const config = useMemo(() => ({ font, size: 3, height: 1 }), [font])
  const textRef = useRef()

  useEffect(() => {
    textRef.current.geometry.computeBoundingBox()
    const offset = (textRef.current.geometry.boundingBox.max.x - textRef.current.geometry.boundingBox.min.x) * 0.5
    textRef.current.position.x -= offset
  }, [])

  return (
    <group {...props} >
      <mesh name={name} position={0, 8, 0}>
        <boxGeometry args={[16, 16, 4]}/>
        <meshBasicMaterial color='red' transparent opacity={0}/>
      </mesh>
      <mesh ref={textRef} position={[0, 2, 0]} castShadow>
        <textGeometry args={[name, config]} />
        <meshPhysicalMaterial color='white' />
      </mesh>
    </group>
  )

}

// export default function Show(props) {

//   const [ref] = usePlane(() => ({ type: "Static", rotation: [-Math.PI * 0.5, 0, 0], args: [1, 1], position: [50, 30, 30] }))

//   return <mesh ref={ref} />
// }


