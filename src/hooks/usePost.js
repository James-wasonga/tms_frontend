import React, {useState} from 'react';

const usePost = ({url,options={method:"POST"},reload,setReload=()=>{}}) => {
  const [data, setData] = useState({
    loading: false,
    message: '',
    error: false,
    results: null,
  });

  const handleRequest = (aurl=null,body) => {
    if(aurl){
      url = aurl;
    }
    setData({
      error: false,
      message: "",
      loading: true,
      results: data.results,
    });
    options = {...options,body};
    fetch(url, options)
      .then(req => req.json())
      .then(response => {
        setData({
          error: response.error,
          message: response.message,
          loading: false,
          results: response.data,
        });
        if(reload){
          setReload(!reload);
        }
      })
      .catch(error => {
        setData({
          error: true,
          message: 'An error occurred.',
          loading: false,
          results: [],
        });
      });
  };

  return {...data,
    handleRequest,
  };
};

export default usePost;
