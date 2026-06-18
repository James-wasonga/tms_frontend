import React from 'react';
import "./index.css";
import { FiMap } from 'react-icons/fi';
import { useState } from 'react';
import { FaBed, FaCaretUp, FaWifi, FaWineBottle } from 'react-icons/fa';
const allAmenities = [
    {
        id:1,
        name:"WiFi",
        icon:<FaWifi size={30} />
    },
    {
        id:2,
        name:"Soft drinks",
        icon:<FaCaretUp size={30} />
    },
    {
        id:3,
        name:"Water",
        icon:<FaWineBottle size={30} />
    },
    {
        id:4,
        name:"Pillow",
        icon:<FaBed size={30} />
    },
];
const Amenities = () => {
    const [hoveredIndex,setHoveredIndex] = useState(0);
  return (
    <div
            className='amenities-holder'
        >
            <div
            className='amenities'
            >
            {
                allAmenities.map((item,index)=>{
                    return(
                        <div

                            key={index}
                            className='amenity-info'
                            onMouseEnter={()=>setHoveredIndex(index)}
                            style={{
                                borderColor:hoveredIndex==index?"#27ae60":null,
                                borderWidth:hoveredIndex==index?4:null
                            }}
                        >
                            <label style={{color:hoveredIndex==index?"#27ae60":"#c7c3c3"}} >{item.icon}</label>
                            <div
                            style={{
                                width:"60%",
                                height:2,
                                backgroundColor:hoveredIndex==index?"#27ae60":"#c7c3c3",
                                marginTop:10,
                                marginBottom:5
                            }}
                            />
                            <p>{item.name}</p> 
                        </div>
                    )
                })
            }
            </div>
            
        </div>
  )
}

export default Amenities;