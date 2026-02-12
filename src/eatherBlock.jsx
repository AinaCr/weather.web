import React, { useState } from "react"
import css from "./style.module.css"
import { useEffect } from "react"

function Block2({arg1,arg2,arg3,arg4,icone1,icone2,icone3,icone4}){
    const week=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]
    const [next1Day,setNext1]=useState("")
    const [next2Day,setNext2]=useState("")
    const [next3Day,setNext3]=useState("")
    const [next4Day,setNext4]=useState("")
    const [next0Day,setNext0]=useState("")



    useEffect(() => {
        const date = new Date()
        const nowDay = date.getDay()
        

        setNext1(week[(nowDay) % 7])
        setNext2(week[(nowDay + 1) % 7])
        setNext3(week[(nowDay + 2) % 7])
        setNext4(week[(nowDay + 3) % 7])
        
        console.log("Current day index:", nowDay)
        console.log("Current day name:", week[nowDay])
    }, [])
    return (
        <>
            <div className={css.boxWeather1}>

               

                <div className={css.box2}>
                    <div className={css.boxIconeDesc}>
                        <p className={css.day}>{next1Day}</p>
                    </div>
                    <div className={css.boxIconeDesc}>
                        <p className={css.tempN}>{arg1}</p>
                    </div>
                    <div className={css.iconeBox2}>{icone1}</div>
                </div>

                <div className={css.box2}>
                    <div className={css.boxIconeDesc}>
                        <p className={css.day}>{next2Day}</p>
                    </div>
                    <div className={css.boxIconeDesc}>
                        <p className={css.tempN}>{arg2}</p>
                    </div>
                    <div className={css.iconeBox2}>{icone2}</div>
                </div>

                <div className={css.box2}>
                    <div className={css.boxIconeDesc}>
                        <p className={css.day}>{next3Day}</p>
                    </div>
                    <div className={css.boxIconeDesc}>
                        <p className={css.tempN}>{arg3}</p>
                    </div>
                    <div className={css.iconeBox2}>{icone3}</div>
                </div>

                <div className={css.box2}>
                    <div className={css.boxIconeDesc}>
                        <p className={css.day}>{next4Day}</p>
                    </div>
                    <div className={css.boxIconeDesc}>
                        <p className={css.tempN}>{arg4}</p>
                    </div>
                    <div className={css.iconeBox2}>{icone4}</div>
                </div>

                
            </div>
        </>

    )
}
export default Block2
