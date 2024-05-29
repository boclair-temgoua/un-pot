import { useEffect, useState } from 'react';

const useDetectConsoleHide = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const threshold = 100; // Adjust this value if needed

  useEffect(() => {
    const detectDevTools = () => {
      const isOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
      setIsConsoleOpen(isOpen);
    };

    const intervalId = setInterval(detectDevTools, 500);

    return () => clearInterval(intervalId);
  }, []);

  return { isConsoleOpen };
};

export { useDetectConsoleHide };
