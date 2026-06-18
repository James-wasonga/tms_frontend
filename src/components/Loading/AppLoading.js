import Lottie from 'lottie-react'
import React from 'react'

const AppLoading = () => {
  return (
    <div 
        style={{
            width:window.innerWidth,
            height:window.innerHeight,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}
        >
            <div
            style={{
                width:300,
                height:300
            }}
            >
                <Lottie 
                        size={100}
                        loop 
                        animationData={require("../../assets/lottie_animations/moving_bus.json")}/>
            </div>
            
    </div>
  )
}

export default AppLoading