import React, { useEffect } from 'react'

const useSEO = ({title,image,description}) => {

    useEffect(()=>{
        document.title = title;
        document.head.innerHTML += `
            <title>${title}</title>
        `
    },[title])
}

export default useSEO;