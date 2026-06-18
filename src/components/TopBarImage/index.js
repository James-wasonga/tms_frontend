// import React from 'react'

// const TopBarImage = ({heading="TMS",children}) => {
//   return (
//      <div style={{
//         backgroundImage:"url('/assets/images/bus1.jpg')",
//         height:150,
//         width:"100%",
//         backgroundRepeat:"no-repeat",
//         backgroundSize:"cover",
//         marginTop:50
//       }} >
//         <div
//           style={{
//             width:"100%",
//             height:"100%",
//             backgroundColor:"rgba(0,0,0,0.8)",
//             color:"var(--secondary-color)",
//             display:"flex",
//             flexDirection:"row",
//             alignItems:'center',
//             justifyContent:"center",
//             gap:10,
//             fontSize:"var(--normal-fontsize)"
//           }}
//         >
//           {children?children:heading}
//         </div>
//       </div>
//   )
// }

// export default TopBarImage

import React from 'react';

const TopBarImage = ({ children, heading = '' }) => (
  <div style={{
    width: '100%', height: 130, marginTop: 100,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a28 60%, #14532d 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 12, color: 'white', fontSize: 18, fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: -0.3,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(22,163,74,0.15) 0%, transparent 60%)', pointerEvents: 'none' }}/>
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
      {children || heading}
    </div>
  </div>
);

export default TopBarImage;
