import { useEffect, useState } from 'react';

const useGet = ({ url, options = { method: 'GET' }, dependecies = [] }) => {
  const [data, setData] = useState({ error: false, message: '', loading: true, results: [] });

  const fetchData = async (aurl) => {
    const fetchUrl = aurl || url;
    setData({ error: false, message: '', loading: true, results: [] });
    fetch(fetchUrl, options)
      .then(req => req.json())
      .then(response => {
        if (response?.status === 'FAILED' || response?.error) {
          setData({ error: true, message: response.error || 'Failed', loading: false, results: [] });
        } else {
          // handle both { data: [] } and direct array responses
          const results = Array.isArray(response) ? response : (response.data ?? response.results ?? []);
          setData({ error: false, message: '', loading: false, results });
        }
      })
      .catch(() => setData({ error: true, message: 'An error occurred.', loading: false, results: [] }));
  };

  useEffect(() => { fetchData(); }, dependecies);

  return { error: data.error, message: data.message, loading: data.loading, results: data.results, fetchData };
};

export default useGet;
