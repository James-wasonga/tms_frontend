import React, { useEffect } from 'react'

const useData = (url,options={method:"POST",body,headers}) => {
    const [data,setData] = useState({
        loading:true,
        error:false,
        message:"",
        results:[]
    });

    const getData=()=>{
        setData({
            loading:true,
            message:"",
            error:false,
            results:[]
        });
        fetch(url,options)
        .then(req=>req.json())
        .then(res=>{
            setData({
                loading:false,
                message:res.message,
                error:res.error,
                results:res.data
            });
        })
        .catch(e=>{
            console.log(e);
            setData({
                loading:false,
                message:"An error occurred!",
                error:true,
                results:[]
            });
        })
    }

    useEffect(()=>{
        getData()
    },[]);
    return data;
}

export default useData