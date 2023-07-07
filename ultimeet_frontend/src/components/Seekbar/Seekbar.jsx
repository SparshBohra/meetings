
import styles from "./Seekbar.module.css";
import { useEffect,useState, useRef} from "react";
import {
    profilePic
  } from "@/constants/data";
import moment from 'moment'
const Seekbar = ({ data, time, avatar}) => {
     //const data2= [0,10,20,30,40,50,60,70,80,90,100]
     const seekBarRef = useRef();

    const [width, setWidth] = useState(694);
     useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
          // Depending on the layout, you may need to swap inlineSize with blockSize
          // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
          setWidth(event[0].contentBoxSize[0].inlineSize);
        });
    
        if (seekBarRef) {
          resizeObserver.observe(seekBarRef.current);
        }
      }, []);

      const msToHMS = ( ms ) =>{
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;
        return `${hours==0?"":hours+':'}${minutes}:${seconds.toFixed(0)}`
    }
    return (
        <>
            <div ref={seekBarRef} className={styles.seekBar}>

                {
                    data.map((obj)=>(
                        <>
                            <div  key={obj.time}className={`border  rounded-md shadow-sm ${styles.thumb2}`} style={{marginLeft:`${(width*obj.fraction)-10}px`,  backgroundImage:`url(${avatar})`}}>
                                <div className={"thumb3"}></div>
                            </div>
                            <div key={obj.fraction} className={styles.thumb} style={{marginLeft:`${(width*obj.fraction)}px`}}><p style={{fontSize:'10px',paddingTop:'15px', textAlign:'center', marginLeft:'-10px'}}>
                           {msToHMS(obj.time)} 
                                </p></div>
                           

                        </>
                    ))
                    
                }
                 <div className={styles.mainThumb} style={{marginLeft:`${((width * time))}px`}}></div>
                       
            </div>
        </>


    )
}
export default Seekbar