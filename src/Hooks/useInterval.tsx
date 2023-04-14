import React, { useEffect, useRef } from 'react'

export function useInterval<C extends CallableFunction>(callback: C, delay: number | null): void {

    const savedCallback = useRef<C>();

    //remember the last callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    //setup the interval

    useEffect(() => {
        function tick() {
            if(savedCallback.current) savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id)
        }
    }, [delay])
}