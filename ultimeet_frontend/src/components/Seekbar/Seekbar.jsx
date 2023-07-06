
import styles from "./Seekbar.module.css";
import {
    profilePic
  } from "@/constants/data";
const Seekbar = ({ }) => {
     const data= [0,10,20,30,40,50,60,70,80,90,100]
    return (
        <>
            <div className={styles.seekBar}>

                {
                    data.map((obj)=>(
                        <>
                            <div className={`border  rounded-md shadow-sm ${styles.thumb2}`} style={{marginLeft:`${(obj/2)-3.2 < 0 ? 0 :(obj/2)-3.2 }%`,  backgroundImage:`url(${profilePic})`}}>
                                <div className={"thumb3"}></div>
                            </div>
                            <div className={styles.thumb} style={{marginLeft:`${(obj/2)-2.5 > 0 ? (obj/2)-2.5 : 0 }%`}}><p style={{fontSize:'10px',paddingTop:'15px', textAlign:'center', marginLeft:'-5px'}}>6:40</p></div>
                        </>
                    ))
                }
            </div>
        </>


    )
}
export default Seekbar