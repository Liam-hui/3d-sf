import React from 'react';
import { useBox } from "@react-three/cannon"

export default function Box(props) {

  const { name, position, rotation, color } = props

  const [physicsRef, api] = useBox(() => ({  
    position: [position[0], 4, position[2]],
    rotation: rotation,
    mass: 100,
    args: [8, 8, 8], 
  }))

  return (
    <>
      <mesh name={name} ref={physicsRef} castShadow>
        <boxGeometry args={[8, 8, 8]}/>
        <meshBasicMaterial color={color}/>
      </mesh>
    </>
  )

}



