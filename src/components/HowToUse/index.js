import React from 'react'
import { FiBook, FiBookOpen, FiMap, FiSearch } from 'react-icons/fi';
import styles from "./styles.module.css";


const HowToUse = () => {
    let uses = [
        {
            icon:<FiMap className={styles.icon} />,
            description:"Select a pickup and destination point."
        },
        {
            icon:<FiSearch className={styles.icon} />,
            description:"Search for a bus plying on the route selected."
        },
        {
            icon:<FiBookOpen className={styles.icon} />,
            description:"Select a bus, select seats on that bus, confirm payment and get your ticket and seat reserved."
        },
    ]
  return (
    <div
            className='cards'
            >
                
            {
                uses.map((item,index)=>{
                    return(
                        <div
                            key={index}
                            className={styles.card_info}

                        >
                            
                            <div className={styles.card_icon} >
                                <label className={styles.label} >{index+1}</label>
                                {item.icon}
                            </div>
                            <p>
                            {item.description}
                            </p> 
                        </div>
                    )
                })
            }
            </div>
  )
}

export default HowToUse