import { useEffect, useRef } from 'react';
import findClosestNode  from './findClosestNode';

const _events = ['mousedown', 'touchstart'];

export default function useOutsideClick(classNames, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    let didCancel = false;

    const listener = event => {
      if (findClosestNode(event.target, classNames)) {
        return;
      }
      if (!didCancel) {
        handlerRef.current(event);
      }
    };

    if (handler) {
      _events.forEach(event => {
        document.addEventListener(event, listener, {
          passive: true,
          capture: false,
        });
      });
    }

    return () => {
      didCancel = true;
      _events.forEach(eventName => {
        document.removeEventListener(eventName, listener, {
          passive: true,
          capture: true,
        });
      });
    };
  }, [handler, classNames]);
}
