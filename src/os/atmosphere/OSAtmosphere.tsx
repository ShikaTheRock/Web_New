import { motion } from 'framer-motion';
import { useOSStore, type AppId } from '../../store/useOSStore';
import { selectTransition } from '../../components/motion/presets';
import './OSAtmosphere.css';

const BAND: Record<AppId, string> = {
  shapeshifter: 'rgba(125, 239, 255, 0.18)',
  wildcard: 'rgba(218, 191, 255, 0.22)',
  grimoire: 'rgba(210, 168, 255, 0.22)',
  contact: 'rgba(134, 168, 142, 0.2)',
};

const TILT: Record<AppId, number> = {
  shapeshifter: -18,
  wildcard: -8,
  grimoire: 6,
  contact: 14,
};

export function OSAtmosphere() {
  const selectedApp = useOSStore((s) => s.selectedApp);
  const reducedMotion = useOSStore((s) => s.reducedMotion);

  return (
    <div className="os-atmosphere" aria-hidden="true">
      <div className="os-atmosphere__wash" />
      <motion.div
        className="os-atmosphere__band"
        animate={{
          background: BAND[selectedApp],
          rotate: TILT[selectedApp],
        }}
        transition={reducedMotion ? { duration: 0.15 } : selectTransition}
      />
      <motion.div
        className="os-atmosphere__rule"
        animate={{ x: selectedApp === 'contact' ? '8%' : selectedApp === 'shapeshifter' ? '-6%' : '0%' }}
        transition={reducedMotion ? { duration: 0.15 } : selectTransition}
      />
      <div className="os-atmosphere__dust" />
    </div>
  );
}
