import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Loader } from "../components/loader"
import Island from "../models/Island"
import { Sky } from "../models/Sky"
import { Bird } from "../models/Bird"
import { Plane } from "../models/Plane"
import { HomeInfo } from "../components/HomeInfo"
import { arrow } from "../assets/icons"

//   <section className='w-full h-screen relative'>
//         <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
            
//         </div>
//     </section>
export const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [targetStage, setTargetStage] = useState(null);
  const totalStages = 4;

  const handleStageChange = (direction) => {
    setHasInteracted(true);
    setTargetStage(() => {
      const baseStage = currentStage ?? 1;
      const nextStage = baseStage + direction;
      if (nextStage < 1) return totalStages;
      if (nextStage > totalStages) return 1;
      return nextStage;
    });
  };

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7 , 0];

        if (window.innerWidth < 768) {
           screenScale = [0.9, 0.9, 0.9];
        } else {
              screenScale = [1, 1, 1];
          }
          return {
            islandScale: screenScale,
            islandPosition: screenPosition,
            islandRotation: rotation
          };
    }

     const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
        const rotation = [0, 0, 0];

        if (window.innerWidth < 768) {
           screenScale = [1.5, 1.5, 1.5];
              screenPosition = [0,-1.5, 0];
        } else {
              screenScale = [3, 3, 3];
              screenPosition = [0,-4, -4];
          }
          return [screenScale, screenPosition, rotation];
    }


    const { islandScale, islandPosition, islandRotation } = adjustIslandForScreenSize();
    const { planeScale, planePosition } = adjustPlaneForScreenSize();


  return (
  <section className='w-full h-screen relative'>
    <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {hasInteracted && currentStage && <HomeInfo currentStage={currentStage} />}
    </div>
    <div className='absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-6'>
      <button
        type='button'
        aria-label='Previous stage'
        className='h-12 w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-105 transition'
        onClick={() => handleStageChange(-1)}
      >
        <img src={arrow} alt='' className='h-5 w-5 rotate-180' />
      </button>
      <button
        type='button'
        aria-label='Next stage'
        className='h-12 w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-105 transition'
        onClick={() => handleStageChange(1)}
      >
        <img src={arrow} alt='' className='h-5 w-5' />
      </button>
    </div>
    <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far:1000 }}>
      <Suspense fallback={<Loader/>}>
        <directionalLight position={[1,1,1]} intensity={2}/>
        <ambientLight intensity={0.5}/>
        <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.5}/>
        <Bird/>
        <Sky isRotating={isRotating}/>
        <Island position={islandPosition} scale={islandScale} rotation={islandRotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage} targetStage={targetStage} setTargetStage={setTargetStage}/>
        <Plane planeScale={planeScale} planePosition={planePosition} isRotating={isRotating || Boolean(targetStage)} rotation={[0,20,0]} />
      </Suspense>
    </Canvas>
  </section>
  )
}
