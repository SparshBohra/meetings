
import styles from "./Seekbar.module.css";
import { useEffect,useState, useRef} from "react";
import {
    profilePic
  } from "@/constants/data";
const Seekbar = ({ data, time}) => {
     const data2= [0,10,20,30,40,50,60,70,80,90,100]
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
    return (
        <>
            <div ref={seekBarRef} className={styles.seekBar}>

                {
                    data2.map((obj)=>(
                        <>
                            <div className={`border  rounded-md shadow-sm ${styles.thumb2}`} style={{marginLeft:`${((width/100)*obj)-10}px`,  backgroundImage:`url(${profilePic})`}}>
                                <div className={"thumb3"}></div>
                            </div>
                            <div className={styles.thumb} style={{marginLeft:`${((width/100)*obj)-10}px`}}><p style={{fontSize:'10px',paddingTop:'15px', textAlign:'center', marginLeft:'-10px'}}>6:40</p></div>
                           

                        </>
                    ))
                    
                }
                 <div className={styles.mainThumb} style={{marginLeft:`${((width * time))}px`}}></div>
                       
            </div>
        </>


    )
}
export default Seekbar