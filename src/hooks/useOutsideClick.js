import { useEffect, useRef } from "react";

export function useOutsideClick(action, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      const clickHandler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) action();
      };

      document.body.addEventListener("click", clickHandler, listenCapturing);

      return () => removeEventListener("click", clickHandler);
    },
    [action, listenCapturing]
  );

  return ref;
}
