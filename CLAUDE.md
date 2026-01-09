# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flavor Chemistry Explorer is a client-side web application for exploring aromatic flavor compounds and crafting multi-compound blends with real-time flavor profile visualization. It models flavor interactions including emergence, suppression, and enhancement effects.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Visualization:** Recharts (radar/bar charts)
- **State:** Zustand (persisted blend state)
- **Routing:** React Router
- **Data:** Static TypeScript files (no backend)

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

## Architecture

### Core Data Structures

- **Compound**: Aromatic molecules with sensory descriptors, thresholds, and metadata (keyed by PubChem CID)
- **DescriptorVector**: Record<string, number> mapping ~60 canonical descriptors to intensities (0-1)
- **Interaction**: Pairwise compound effects (additive, emergence, suppression, enhancement)
- **Blend**: User-created formulations with computed profiles
- **Recipe**: Preset target flavor profiles for learning/matching

### Blending Algorithm (src/lib/blending.ts)

The core algorithm computes flavor profiles from compound combinations:
1. Base blend: weighted average of compound descriptor vectors
2. Apply pairwise interactions (emergence adds descriptors, suppression reduces them)
3. Apply higher-order heuristics for 3+ compound interactions
4. Normalize final profile

### State Management (src/hooks/useBlend.ts)

Zustand store with localStorage persistence handles:
- Current blend components and concentrations
- Computed blend results (profile, interactions, warnings)
- Saved blends
- Target recipe for comparison mode

### Key Pages

- **Explorer** (`/`): Compound database browser with search/filter
- **Workbench** (`/workbench`): Main blend creation interface with live visualization
- **Recipes** (`/recipes`): Preset target profiles to match
- **Encyclopedia** (`/encyclopedia`): Interaction reference and educational content

### Visualization Components

- `FlavorRadar.tsx`: Radar/spider chart for flavor profiles (uses Recharts)
- `DescriptorBars.tsx`: Horizontal bar chart sorted by descriptor intensity
- `RecipeComparison.tsx`: Side-by-side blend vs. target with similarity scoring

## Key Constraints

- All client-side, no backend or authentication
- Data embedded in TypeScript files for simplicity
- All UI interactions (sliders, add/remove) must feel instant
- Compounds use relative intensity units (1-100) rather than absolute ppm
