// import React from 'react';
// import styles from "./bottom.module.css";
// import { FaBus, FaHome, FaSearch, FaTicketAlt, FaUser } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';
// import { red } from '@mui/material/colors';

// const sections = [
//     {
//         link:"/",
//         name:"Home",
//         icon:<FaHome size={25} />
//     },
//     {
//         link:"/tickets",
//         name:"Tickets",
//         icon:<FaTicketAlt size={25} />
//     },
//     {
//         link:`/search/Starting point/Destination point/${null}`,
//         name:"Search",
//         icon:<FaSearch size={25} />
//     },
//     {
//         link:"/profile",
//         name:"Profile",
//         icon:<FaUser size={25} />
//     },
// ]
// const BottomTabs = () => {
//     const location = useLocation();
    
//   return (
//     <div
//     className={styles.bottom}
//     >
//         {
//             sections.map((section,index)=>{
//                 const isActive = location.pathname.split("/")[1]==section.link.split("/")[1];
//                 return(
//                     <Link
//                         key={index}
//                         to={section.link} 
//                         className={`${styles.item} ${isActive?null:null}`} >
//                         <div
//                         style={{
//                             width:"100%",
//                             height:"70%",
//                             display:"flex",
//                             alignItems:"center",
//                             justifyContent:"center",
//                             borderRadius:20,
//                             backgroundColor:isActive?"rgba(104, 239, 86, 0.12)":null,
//                             color:isActive?"green":"rgba(0,0,0,0.8)",
//                         }}
//                         >
//                         {section.icon}
//                         </div>
                        
//                         <label
//                         style={{
//                             color:isActive?"green":"rgba(0,0,0,0.8)",
//                             display:isActive?"flex":"none",
//                             fontWeight:"bolder",
//                         }}
//                         >{section.name}</label>
//                     </Link>
//                 )
//             })
//         }
//     </div>
//   )
// }

// export default BottomTabs;

import React from 'react';
import { FaBus, FaHome, FaSearch, FaTicketAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import styles from './bottom.module.css';

const sections = [
  { link: '/', name: 'Home', icon: <FaHome size={20}/> },
  { link: '/tickets', name: 'Tickets', icon: <FaTicketAlt size={20}/> },
  { link: '/search/all/all/0', name: 'Search', icon: <FaSearch size={20}/> },
  { link: '/profile', name: 'Profile', icon: <FaUser size={20}/> },
];

const BottomTabs = () => {
  const location = useLocation();
  return (
    <div className={styles.bottom}>
      {sections.map((section, index) => {
        const isActive = '/' + location.pathname.split('/')[1] === section.link.split('/')[0] + '/' + section.link.split('/')[1];
        return (
          <Link key={index} to={section.link} className={styles.item}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%', gap: 3 }}>
            <div style={{ color: isActive ? '#16a34a' : '#94a3b8', transition: 'color 0.2s' }}>
              {section.icon}
            </div>
            <label style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#16a34a' : '#94a3b8', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>
              {section.name}
            </label>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomTabs;
