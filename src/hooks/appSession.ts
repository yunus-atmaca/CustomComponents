import {useEffect, useState} from 'react';

const useAppSession = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2500);
  }, []);

  return loading;
};

export {useAppSession};
