import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BlendComponent, Interaction, DescriptorVector } from '../types';
import { computeBlend, type BlendResult } from '../lib/blending';

interface SavedBlend {
  id: string;
  name: string;
  components: BlendComponent[];
  createdAt: number;
}

interface BlendState {
  // Current working blend
  components: BlendComponent[];
  result: BlendResult;

  // Saved blends
  savedBlends: SavedBlend[];

  // Target recipe for comparison (optional)
  targetProfile: DescriptorVector | null;
  targetName: string | null;

  // Actions
  addCompound: (compoundId: string, concentration?: number) => void;
  removeCompound: (compoundId: string) => void;
  updateConcentration: (compoundId: string, concentration: number) => void;
  clearBlend: () => void;

  // Saved blend management
  saveCurrentBlend: (name: string) => void;
  loadBlend: (id: string) => void;
  deleteSavedBlend: (id: string) => void;

  // Target profile
  setTargetProfile: (profile: DescriptorVector | null, name?: string) => void;
  clearTargetProfile: () => void;
}

const emptyResult: BlendResult = {
  profile: {},
  activeInteractions: [],
  warnings: [],
  contributions: {}
};

export const useBlend = create<BlendState>()(
  persist(
    (set, get) => ({
      components: [],
      result: emptyResult,
      savedBlends: [],
      targetProfile: null,
      targetName: null,

      addCompound: (compoundId: string, concentration: number = 50) => {
        const { components } = get();

        // Don't add if already exists
        if (components.some(c => c.compound_id === compoundId)) {
          return;
        }

        const newComponents = [...components, { compound_id: compoundId, concentration }];
        const result = computeBlend(newComponents);

        set({ components: newComponents, result });
      },

      removeCompound: (compoundId: string) => {
        const { components } = get();
        const newComponents = components.filter(c => c.compound_id !== compoundId);
        const result = newComponents.length > 0 ? computeBlend(newComponents) : emptyResult;

        set({ components: newComponents, result });
      },

      updateConcentration: (compoundId: string, concentration: number) => {
        const { components } = get();
        const newComponents = components.map(c =>
          c.compound_id === compoundId ? { ...c, concentration } : c
        );
        const result = computeBlend(newComponents);

        set({ components: newComponents, result });
      },

      clearBlend: () => {
        set({ components: [], result: emptyResult });
      },

      saveCurrentBlend: (name: string) => {
        const { components, savedBlends } = get();
        if (components.length === 0) return;

        const newBlend: SavedBlend = {
          id: `blend-${Date.now()}`,
          name,
          components: [...components],
          createdAt: Date.now()
        };

        set({ savedBlends: [...savedBlends, newBlend] });
      },

      loadBlend: (id: string) => {
        const { savedBlends } = get();
        const blend = savedBlends.find(b => b.id === id);
        if (!blend) return;

        const result = computeBlend(blend.components);
        set({ components: [...blend.components], result });
      },

      deleteSavedBlend: (id: string) => {
        const { savedBlends } = get();
        set({ savedBlends: savedBlends.filter(b => b.id !== id) });
      },

      setTargetProfile: (profile: DescriptorVector | null, name?: string) => {
        set({ targetProfile: profile, targetName: name || null });
      },

      clearTargetProfile: () => {
        set({ targetProfile: null, targetName: null });
      }
    }),
    {
      name: 'flavor-explorer-blend',
      partialize: (state) => ({
        savedBlends: state.savedBlends,
        components: state.components
      }),
      onRehydrateStorage: () => (state) => {
        // Recompute result after rehydration
        if (state && state.components.length > 0) {
          state.result = computeBlend(state.components);
        }
      }
    }
  )
);

// Selector hooks for common use cases
export function useBlendProfile() {
  return useBlend(state => state.result.profile);
}

export function useBlendWarnings() {
  return useBlend(state => state.result.warnings);
}

export function useActiveInteractions(): Interaction[] {
  return useBlend(state => state.result.activeInteractions);
}

export function useBlendComponents() {
  return useBlend(state => state.components);
}
