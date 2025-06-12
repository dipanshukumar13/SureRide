import React, { useRef } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/confirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';



const Home = () => {

  const [panelOpen, setPanelOpen] = useState(false);
  const [pickup, setpickup] = useState("")
  const [destination, setdestination] = useState("")
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)

  const panelCloseRef = useRef(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  
  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {
        height:'70%',
        padding:24
      })
      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current, {
        height:'0%',
        padding:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  },[panelOpen])

  useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])


  useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])


     useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
          {/* image for temporary use  */}
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />More actions
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input 
            onClick={() => {
              setPanelOpen(true)
            }}
            value={pickup}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
             onChange={(e) => setpickup(e.target.value)}
             placeholder='Pickup Location' 
             type="text" />

             <input
              onClick={() => {
                setPanelOpen(true)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              placeholder='Destination Location'
              type="text" />
          </form>

        </div>
        <div ref={panelRef}  className='bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setvehiclePanel={setvehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} 
      className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
      <VehiclePanel setvehiclePanel={setvehiclePanel} setconfirmRidePanel={setconfirmRidePanel} />
      </div>
      <div ref={confirmRidePanelRef} 
      className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}  />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver  setvehicleFound={setvehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
      </div>    
    </div>
  )
}

export default Home
