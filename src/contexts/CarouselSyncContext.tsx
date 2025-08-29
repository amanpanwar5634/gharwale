import React, { createContext, useContext, useEffect, useState } from 'react';

interface CarouselSyncContextType {
  tick: number;
  delay: number;
}

const CarouselSyncContext = createContext<CarouselSyncContextType | undefined>(undefined);

export const CarouselSyncProvider: React.FC<{ delay?: number; children: React.ReactNode }> = ({ delay = 3000, children }) => {
  const [tick, setTick] = useState<number>(Math.floor(Date.now() / delay));

  useEffect(() => {
    const id = setInterval(() => {
      setTick(Math.floor(Date.now() / delay));
    }, delay);
    return () => clearInterval(id);
  }, [delay]);

  return (
    <CarouselSyncContext.Provider value={{ tick, delay }}>
      {children}
    </CarouselSyncContext.Provider>
  );
};

export const useCarouselSync = () => {
  const ctx = useContext(CarouselSyncContext);
  if (!ctx) throw new Error('useCarouselSync must be used within CarouselSyncProvider');
  return ctx;
};
