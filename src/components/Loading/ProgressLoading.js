import Lottie from 'lottie-react';
import React from 'react'

const ProgressLoading = ({height=300,width=300}) => {
  return (
    <div 
        style={{
            width:"100%",
            height:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}
        >
            <div
            style={{
                width,
                height
            }}
            >
                <Lottie 
                        style={{
                            height
                        }}
                        loop 
                        animationData={require("../../assets/lottie_animations/progress1.json")}/>
            </div>
            
    </div>
  )
}

export default ProgressLoading;