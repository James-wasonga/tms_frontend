// import React from 'react'
// import { FiArrowLeft } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
// import styles from "./index.module.css";

// const SmallScreenHeader = () => {
//     const navigate = useNavigate();
//   return (
//     <div 
//     className={styles.small_screen}
//     >
//         <FiArrowLeft
//         className={styles.icon}
//         onClick={()=>{
//            window.history.back(); 
//         }}
//         />
//         <div></div>
//     </div>
//   )
// }

// export default SmallScreenHeader

import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const SmallScreenHeader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', padding: '12px 16px',
    background: 'white', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 10,
  }}>
    <button onClick={() => window.history.back()} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontSize: 14, fontWeight: 600,
    }}>
      <FiArrowLeft size={18}/> Back
    </button>
  </div>
);

export default SmallScreenHeader;
