import { useEffect, useRef } from "react";
import { debounce } from "../utils/helpers";

export function useOutsideClick(action, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      let timer;
      const clickHandler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          const debouncedAction = debounce(action, 0);
          timer = debouncedAction();
        }
      };

      document.addEventListener("click", clickHandler, listenCapturing);

      return () => {
        document.removeEventListener("click", clickHandler, listenCapturing);
        clearTimeout(timer);
      };
    },
    [action, listenCapturing]
  );

  return ref;
}
