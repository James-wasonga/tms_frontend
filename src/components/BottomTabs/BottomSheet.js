import React, { useState } from 'react'
import styles from "./index.module.css";
import { FiChevronDown, FiChevronUp, FiChevronsUp } from 'react-icons/fi';

const BottomSheet = ({propheight=50,heading,children}) => {
    const [height,setHeight] = useState(propheight);
    const addHeight = ()=>{
        setHeight(window.innerHeight-70);
    }
    const reduceHeight = ()=>{
        setHeight(50);
    }
  return (
    <div
    className={styles.bottom_sheet}
    style={{
        height
    }}
    >
        <div className={styles.top} >
            <label className={styles.label}>{heading}</label>
            <div>
                {
                    height>50?
                    <FiChevronDown className={styles.icon} onClick={reduceHeight}/>:
                    <FiChevronUp className={styles.icon} onClick={addHeight}/>
                }
                
            </div>
        </div>
        
        <div className={styles.children} >
            {children}
        </div>
    
    </div>
  )
}

export default BottomSheet;