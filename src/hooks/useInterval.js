import {useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function runCallback() {
      savedCallback.current();
    }
    if (delay !== null) {
      let intervalId = setInterval(runCallback, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}
