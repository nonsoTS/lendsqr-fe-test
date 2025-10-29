import { useEffect, useRef, useState } from "react";

export default function useDropdownPosition(isOpen: boolean) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const clickedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && clickedRef.current) {
      const rect = clickedRef.current.getBoundingClientRect();
      const dropdownWidth = 150;
      
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - dropdownWidth
      });
    }
  }, [isOpen]);

  return { clickedRef, position };
}