import { useEffect, useState } from "react";
import Block2 from "./eatherBlock";
import Block from "./blockWeather";
import css from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";




function App(){
    const [val,setVal]=useState("")
    const [background,setBackground]=useState("")
    const [cityBack,setCityBack]=useState(false)
    const [description,setDescription]=useState("")
    const [nameCt,setNameCt]=useState("")
    const [answer,setanswer]=useState(false)
    const [spin,setSpin]=useState(false)
    const [list,setList]=useState("")
    const [min1,setMin1]=useState("")  
    const [max1,setMax1]=useState("")  

    const [min2,setMin2]=useState("")  
    const [max2,setMax2]=useState("") 


    const [min3,setMin3]=useState("")  
    const [max3,setMax3]=useState("")  

    const [min4,setMin4]=useState("")  
    const [max4,setMax4]=useState("")  
    
    const [iconeCurrent,setIconeCurrent]=useState("");
    const [icone,setIcone]=useState("")

    const [idIcone1,setIndexIcone1]=useState("")

     const weatherEmojis = {
    '01d': '☀️',   '01n': '🌙',   
    '02d': '🌤️',   '02n': '☁️',   
    '03d': '⛅',   '03n': '☁️',   
    '04d': '☁️',   '04n': '☁️',   
    '09d': '🌧️',   '09n': '🌧️',   
    '10d': '🌦️',   '10n': '🌧️',   
    '11d': '⛈️',   '11n': '⛈️',   
    '13d': '🌨️',   '13n': '❄️',   
    '50d': '🌫️',   '50n': '🌫️'    
};
const [dailyIcons, setDailyIcons] = useState({
    d1: "", 
    d2: "", 
    d3: "", 
    d4: ""  
});

     
    const ACCESS_KEY="crBpAtEpg5WLmsuwotzEmLACkejDMBaC3_fkz_zxyOw"
    const WEATHER_API_KEY="78b5bde9a8da9c8715659a2225c231ee"
    const [temp,setTemp]=useState({
        actualy:"",
        next1:"",
        next2:"",
        next3:""
    })
    const [time,setTime]=useState({
        time1:"",
        time2:"",
        time3:""
    })

    const handleInput=(e)=>{
        setVal(e.target.value)
    }
    const getTemp=()=>{
        const date=new Date()
        const day = date.getDate()

    }
    useEffect(()=>{
    if(list && list.length > 0){
        const date=new Date()
        const day = date.getDate()
        console.log("aujourd'hui=",list);
        

        
        let minTemp1=Infinity
        let maxTemp1=-Infinity

        let minTemp2=Infinity
        let maxTemp2=-Infinity

        let minTemp3=Infinity
        let maxTemp3=-Infinity

        let minTemp4=Infinity
        let maxTemp4=-Infinity
        list.forEach((item,i) => {
            
            const dateApi=new Date(item.dt * 1000)
            const dayApi = dateApi.getDate()
            const hoursApi=dateApi.getHours()
            if(day + 1===dayApi){
                if (hoursApi >= 11 && hoursApi <= 14){
                    const iconCode = item.weather[0].icon;

                    setDailyIcons(prev => {
                        if (day + 1 === dayApi) return { ...prev, d1: iconCode };
                        if (day + 2 === dayApi) return { ...prev, d2: iconCode };
                        if (day + 3 === dayApi) return { ...prev, d3: iconCode };
                        if (day + 4 === dayApi) return { ...prev, d4: iconCode };
                        return prev;
                    });
                }

                minTemp1=Math.min(minTemp1, item.main.temp_min)
                maxTemp1=Math.max(maxTemp1,item.main.temp_max)
                
                
            }

           


            if(day + 2===dayApi){
                if (hoursApi >= 11 && hoursApi <= 14){
                    const iconCode = item.weather[0].icon;

                    setDailyIcons(prev => {
                        if (day + 1 === dayApi) return { ...prev, d1: iconCode };
                        if (day + 2 === dayApi) return { ...prev, d2: iconCode };
                        if (day + 3 === dayApi) return { ...prev, d3: iconCode };
                        if (day + 4 === dayApi) return { ...prev, d4: iconCode };
                        return prev;
                    });
                }
                minTemp2=Math.min(minTemp2, item.main.temp_min)
                maxTemp2=Math.max(maxTemp2,item.main.temp_max)
                
            }

            if(day + 3===dayApi){
                if (hoursApi >= 11 && hoursApi <= 14){
                    const iconCode = item.weather[0].icon;

                    setDailyIcons(prev => {
                        if (day + 1 === dayApi) return { ...prev, d1: iconCode };
                        if (day + 2 === dayApi) return { ...prev, d2: iconCode };
                        if (day + 3 === dayApi) return { ...prev, d3: iconCode };
                        if (day + 4 === dayApi) return { ...prev, d4: iconCode };
                        return prev;
                    });
                }
                minTemp3=Math.min(minTemp3, item.main.temp_min)
                maxTemp3=Math.max(maxTemp3,item.main.temp_max)
                
            }

            if(day + 4===dayApi){
                if (hoursApi >= 11 && hoursApi <= 14){
                    const iconCode = item.weather[0].icon;

                    setDailyIcons(prev => {
                        if (day + 1 === dayApi) return { ...prev, d1: iconCode };
                        if (day + 2 === dayApi) return { ...prev, d2: iconCode };
                        if (day + 3 === dayApi) return { ...prev, d3: iconCode };
                        if (day + 4 === dayApi) return { ...prev, d4: iconCode };
                        return prev;
                    });
                }
                minTemp4=Math.min(minTemp4, item.main.temp_min)
                maxTemp4=Math.max(maxTemp4,item.main.temp_max)
                
            }


        });
        setMin1(minTemp1)
        setMax1(maxTemp1)


         setMin2(minTemp2)
        setMax2(maxTemp2)
         setMin3(minTemp3)
        setMax3(maxTemp3)
         setMin4(minTemp4)
        setMax4(maxTemp4)

    }
},[list]);

useEffect(()=>{
    if(min1)console.log("minimum==",min1,"maximum==",max1)
},[min1])

    const featureWeather=async()=>{
            try{
                const featurUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`
                const featurRes=await fetch(featurUrl)

                const data = await featurRes.json()

                if(featurRes.ok){
                    console.log(data)
                    console.log("future meteo recu")
                    setTime(prev=>({
                        ...prev,
                        time1:data.list[0].dt,
                        time2:data.list[1].dt,
                        time3:data.list[2].dt
                    }))

                    setTemp(prev=>({
                        ...prev,
                        next1:data.list[0].main.temp,
                        next2:data.list[1].main.temp,
                        next3:data.list[2].main.temp
                    }))
                    setList(data.list)
                    getTemp()
                }else{
                    console.log("erreur ==",data)
                }
            }catch(err){
                console.log("erreur==",err)
            }
    }

    const clickWeather=async()=>{
        try{
            const timestamp = 1738848000;
            

            setSpin(true)
            setanswer(false)

            const curentUrl=`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`
            const curentRes=await fetch(curentUrl)

            const data=await curentRes.json()
            if(curentRes.ok){

                console.log(data)
                setIconeCurrent(data.weather[0].icon)
                setDescription(data.weather[0].description)
                setTemp(prev=>({
                    ...prev,
                    actualy:data.main.temp
                }))
                console.log("meteo recus")
                featureWeather()
                clicSearchCity();
                setNameCt(data.name)
                const date = new Date(timestamp * 1000);
                const hours = date.getHours();
                console.log(hours);


            }else{
                console.log("erreur ==",data)
            }

        }catch(err){
            console.log("erreur==",err)
        }finally{
            setSpin(false)
            setanswer(true)
        }
    }
    const clicSearchCity=async()=>{
        try{
            const url = `https://api.unsplash.com/search/photos?page=1&query=${val} city`;
            const res = await fetch(url,{
                headers:{
                     'Authorization':`Client-ID ${ACCESS_KEY}`
                }
            })
            const data = await res.json();
                

                 if(res.ok){
                    setCityBack(true)
                    
                    setBackground(data.results[0].urls.regular)
                    console.log(data.results[0])
                    console.log("image recue")

                 }else{
                    setCityBack(false)
                    return console.log("erreur",data)
                    
                 }
                 
            
        }catch(err){
            setCityBack(false)
            console.log("erreur dans fetch:",err)
        }
    }
    

    return (
        <>
            <div className={css.body}>
                <div className={css.boxInput}>
                    <input type="text" className={css.input} value={val} onChange={handleInput} placeholder="City's name"/>
                    <div className={css.iconSearch} onClick={clickWeather}></div>
                </div>

                {spin && <div>
                                {!answer &&<Spinner animation="border" variant="primary" />}
                        </div>}

                {answer && <div className={css.box1}>
                    <div className={css.boxDesc1}>

                        <div className={css.city}>
                            {cityBack && <div className={css.iconeCt}style={{backgroundImage: cityBack ? `url(${background})` : "none"}} ></div>}
                            <p className={css.nameCt}>{nameCt}</p>
                        </div>

                        <p style={{fontSize:"20px"}}>Temperature actuelle</p>

                        <div className={css.boxTemp}>
                            <p className={css.temp}>{`${temp.actualy}°C`}</p>
                        </div>

                        <div className={css.iconeWeather}>{weatherEmojis[iconeCurrent]}</div>
                    
                    </div>

                    <div className={css.boxDesc2}>
                        {description && <div className={css.description}>
                                            <div className={css.infIcone}></div>
                                            <p className={css.sentDesc}>{description}</p>

                                        </div>}
                         <p style={{fontSize:"20px"}}>Temperature des prochaine heures</p>
                        

                         <Block 
                            arg1={time.time1}
                            icone1={list && list.length > 0 ? weatherEmojis[list[0].weather[0].icon] : "⌛"}
                            icone2={list && list.length > 0 ? weatherEmojis[list[1].weather[0].icon] : "⌛"} 
                            icone3={list && list.length > 0 ? weatherEmojis[list[2].weather[0].icon] : "⌛"}
                            arg2={time.time2} 
                            arg3={time.time3} 
                            arg4={temp.next1} 
                            arg5={temp.next2} 
                            arg6={temp.next3}/>
                           
                    </div>
                    
                </div>}


                {answer &&<div className={css.box1}>
                    <Block2 
                        icone0={weatherEmojis[dailyIcons.d0] || "⌛"}
                        icone1={weatherEmojis[dailyIcons.d1] || "⌛"}
                        icone2={weatherEmojis[dailyIcons.d2] || "⌛"}
                        icone3={weatherEmojis[dailyIcons.d3] || "⌛"}
                        icone4={weatherEmojis[dailyIcons.d4] || "⌛"}
                        
                        arg1={`${min1}°C → ${max1}°C`} 
                        arg2={`${min2}°C → ${max2}°C`} 
                        arg3={`${min3}°C → ${max3}°C`} 
                        arg4={`${min4}°C → ${max4}°C`}/>
                </div>
                }
            </div>
        </>
    )
}

export default App;