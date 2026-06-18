// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { FaChevronUp } from 'react-icons/fa';
// import { FiChevronUp } from 'react-icons/fi';

// const FloatingComponent = () => {
//     const [shown,setshown] = useState(true);
//     useEffect(()=>{
//         window.addEventListener("scroll",(e)=>{
//             if(window.scrollY>=100){
//                 setshown(true);
//             }else{
//                 setshown(false);
//             }
//         })
//     },[])
//   return (
//     <div
//     onClick={()=>{
//             window.scrollTo(0,0);
//         }}
//     style={{
//         position:"fixed",
//         bottom:window.innerHeight/3.7,
//         right:20,
//         backgroundColor:"#27ae60",
//         display:"flex",
//         alignItems:"center",
//         justifyContent:"center",
//         borderColor:"transparent",
//         width:40,
//         height:40,
//         borderRadius:5,
//         display:shown?"flex":"none"
//     }}
//     >
//         <FiChevronUp color='#ffffff' size={30} />
//     </div>
//   )
// }

// export default FloatingComponent;

import React, { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const FloatingComponent = () => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const handler = () => setShown(window.scrollY >= 200);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!shown) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 90, right: 20, zIndex: 200,
        width: 44, height: 44, borderRadius: 12,
        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
        border: 'none', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(22,163,74,0.4)',
        transition: 'all 0.2s',
      }}
      title="Back to top"
    >
      <FiChevronUp color="white" size={22}/>
    </button>
  );
};

export default FloatingComponent;
