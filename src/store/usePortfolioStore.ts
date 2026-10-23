import { create } from 'zustand';
import { SpatialStationId, LightingMode } from '../types/portfolio';
import { soundFX } from '../audio/soundFX';

interface PortfolioState {
  currentStationIndex: number;
  scrollProgress: number; // 0.0 to 5.0
  lightingMode: LightingMode;
  activeModal: SpatialStationId | 'equipment' | null;
  hoveredObject: string | null;
  isMuted: boolean;
  hasInteracted: boolean;

  setStationIndex: (index: number) => void;
  setScrollProgress: (progress: number) => void;
  setLightingMode: (mode: LightingMode) => void;
  toggleLightingMode: () => void;
  openModal: (modal: SpatialStationId | 'equipment') => void;
  closeModal: () => void;
  setHoveredObject: (name: string | null) => void;
  toggleMute: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  currentStationIndex: 0,
  scrollProgress: 0,
  lightingMode: 'day',
  activeModal: null,
  hoveredObject: null,
  isMuted: false,
  hasInteracted: false,

  setStationIndex: (index: number) => {
    const prev = get().currentStationIndex;
    if (prev !== index) {
      soundFX.playCameraWhoosh();
    }
    set({
      currentStationIndex: Math.max(0, Math.min(5, index)),
      hasInteracted: true
    });
  },

  setScrollProgress: (progress: number) => {
    const clamped = Math.max(0, Math.min(5, progress));
    const stationIndex = Math.round(clamped);
    const prev = get().currentStationIndex;
    if (prev !== stationIndex) {
      soundFX.playCameraWhoosh();
    }
    set({
      scrollProgress: clamped,
      currentStationIndex: stationIndex,
      hasInteracted: true
    });
  },

  setLightingMode: (mode: LightingMode) => {
    soundFX.playLampClick();
    set({ lightingMode: mode });
  },

  toggleLightingMode: () => {
    const current = get().lightingMode;
    const next: LightingMode = current === 'day' ? 'sunset' : current === 'sunset' ? 'night' : 'day';
    soundFX.playLampClick();
    set({ lightingMode: next });
  },

  openModal: (modal: SpatialStationId | 'equipment') => {
    soundFX.playUiBlip(620);
    set({ activeModal: modal });
  },

  closeModal: () => {
    soundFX.playUiBlip(440);
    set({ activeModal: null });
  },

  setHoveredObject: (name: string | null) => {
    const prev = get().hoveredObject;
    if (name && name !== prev) {
      soundFX.playUiBlip(780);
    }
    set({ hoveredObject: name });
  },

  toggleMute: () => {
    const next = !get().isMuted;
    soundFX.setMuted(next);
    set({ isMuted: next });
  }
}));
