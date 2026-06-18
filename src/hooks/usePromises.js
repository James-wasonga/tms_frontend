import React from 'react'

const usePromises = () => {
  add();
  add1();
}

const add = ()=>{
   setTimeout(()=>{
        console.log("Addition");
    },2000);
    
}

const add1 = ()=>{
   setTimeout(()=>{
        console.log("Addition 1");
    },1000);
    
}

export default usePromises;