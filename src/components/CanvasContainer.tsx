import React, { useEffect, useRef, useState } from 'react';
import { StudioScene } from '../three/StudioScene';
import { FallbackHero } from './FallbackHero';

export const CanvasContainer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<StudioScene | null>(null);

  const [hasWebGL] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!hasWebGL || !mountRef.current) return;

    const scene = new StudioScene(mountRef.current);
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return <FallbackHero />;
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full overflow-hidden touch-none"
      role="region"
      aria-label="3D Interactive Lynn Fisher 2018 Studio"
    />
  );
};
