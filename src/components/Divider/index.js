import React from 'react'

const Divider = ({width=100,containerWidth="100%"}) => {
  return (
    <div
        style={{
            width:containerWidth,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            gap:5
        }}
        >
            <div
            style={{
                width,
                height:3,
                backgroundColor:"#5045ec"
            }}
            ></div>
            <div
            style={{
                width:width/2,
                height:2,
                backgroundColor:"var(--app-color)"
            }}
            ></div>
        </div>
  )
}

export default Divider;