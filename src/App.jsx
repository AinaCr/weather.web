
import Map from './composant/Map.jsx';


import { useEffect, useState } from 'react';

import { FiSearch } from "react-icons/fi";


function App() {

    const [val,setVal]=useState("")
    const [donne,setDonne]=useState(null)
    const [pos,setpos]=useState(null)

    const search= (e)=>{
      setVal(e.target.value)
    }

    const btn= ()=>{
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&lang=fr&appid=${import.meta.env.VITE_API_KEY2}`)
        
        .then(response => response.json())
        .then(data => {

          console.log(data);

          setDonne(data);
          setpos([data.coord.lat,data.coord.lon])

});
      

    }
    useEffect(()=>{
      if(pos){
        console.log(pos)
      }
    },[pos])

  return (
    <div className='h-screen w-full bg-blue-500  flex items-center justify-around flex-col p-8'>

      <div className='w-full flex flex-row justify-center items-center'>
            <input
            type="text"
            className='h-14 pl-5 rounded-l-lg bg-white text-black placeholder:text-gray-500 outline-none'
            placeholder='Rechercher un lieu...'
            onChange={search}
            
            />

            <button className='bg-white h-14 w-14 rounded-r-lg flex items-center justify-center cursor-pointer'
            onClick={btn}>

              <FiSearch className='text-2xl text-gray-700'  />

            </button>
        </div>

        <div className="h-3/4 w-full rounded-lg overflow-hidden">
            <Map pos={pos} data={donne}/>
        </div>
    </div>
  );
}

export default App;