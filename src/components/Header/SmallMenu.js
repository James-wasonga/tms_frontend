// import React from 'react';
// import "./smallMenu.css";
// import { Link } from 'react-router-dom';

// const SmallMenu = ({smallMenuShown,setSmallMenuShown}) => {
//   return (
//     <div
//     className='small-menu'
//     style={{
//         display:smallMenuShown?'flex':"none"
//     }}
//     >
//         <Link onClick={()=>setSmallMenuShown(false)} to='/'>Home</Link>
//         <Link onClick={()=>setSmallMenuShown(false)} to='/about'>About</Link>
//         <Link onClick={()=>setSmallMenuShown(false)} to='/faqs'>FAQs</Link>
//         <Link onClick={()=>setSmallMenuShown(false)} to='/blogs'>Blog</Link>
//         <Link onClick={()=>setSmallMenuShown(false)} to='/contact'>Contact</Link>
//     </div>
//   )
// }

// export default SmallMenu;

import React from 'react';
import "./smallMenu.css";
import { Link } from 'react-router-dom';

const SmallMenu = ({smallMenuShown,setSmallMenuShown}) => {
  return (
    <div
    className='small-menu'
    style={{
        display:smallMenuShown?'flex':"none"
    }}
    >
        <Link onClick={()=>setSmallMenuShown(false)} to='/'>Home</Link>
        <Link onClick={()=>setSmallMenuShown(false)} to='/about'>About</Link>
        <Link onClick={()=>setSmallMenuShown(false)} to='/faqs'>FAQs</Link>
        <Link onClick={()=>setSmallMenuShown(false)} to='/blogs'>Blog</Link>
        <Link onClick={()=>setSmallMenuShown(false)} to='/contact'>Contact</Link>
    </div>
  )
}

export default SmallMenu;