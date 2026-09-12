import { useEffect } from 'react';
import { OSShell } from './os/OSShell';
import { useOSStore } from './store/useOSStore';

function usePrefersReducedMotion() {
  const setReducedMotion = useOSStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [setReducedMotion]);
}

export default function App() {
  usePrefersReducedMotion();
  return <OSShell />;
}
