import type { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: "strawberry",
    name: "Strawberry",
    description: "Fresh, ripe strawberry with green stem notes",
    category: "fruit",
    target_descriptors: {
      fruity: 0.9,
      strawberry: 0.85,
      sweet: 0.7,
      green: 0.3,
      creamy: 0.25,
      caramel: 0.2
    },
    key_compounds: ["8038", "62465", "21145", "7945", "11173"],
    reference_blend: null
  },
  {
    id: "fresh-coffee",
    name: "Fresh Coffee",
    description: "Freshly ground arabica with caramel and nutty notes",
    category: "roasted",
    target_descriptors: {
      coffee: 0.95,
      roasted: 0.85,
      nutty: 0.5,
      caramel: 0.4,
      earthy: 0.25,
      smoky: 0.3,
      chocolate: 0.2
    },
    key_compounds: ["7362", "8201", "7047", "31252", "6561"],
    reference_blend: null
  },
  {
    id: "vanilla",
    name: "Vanilla",
    description: "Rich, creamy vanilla bean",
    category: "sweet",
    target_descriptors: {
      vanilla: 0.95,
      sweet: 0.85,
      creamy: 0.6,
      caramel: 0.3,
      woody: 0.15
    },
    key_compounds: ["1183", "8467", "323", "8201"],
    reference_blend: null
  },
  {
    id: "rose",
    name: "Rose",
    description: "Classic damascena rose with green and honey accents",
    category: "floral",
    target_descriptors: {
      floral: 0.95,
      rose: 0.95,
      green: 0.3,
      honey: 0.25,
      sweet: 0.3,
      citrus: 0.15
    },
    key_compounds: ["10908", "8842", "1549778", "5280798", "6054"],
    reference_blend: null
  },
  {
    id: "lemon",
    name: "Lemon",
    description: "Fresh lemon zest and juice",
    category: "fruit",
    target_descriptors: {
      citrus: 0.95,
      lemon: 0.9,
      fresh: 0.7,
      green: 0.3,
      floral: 0.15,
      aldehydic: 0.2
    },
    key_compounds: ["22311", "638011", "6549", "454"],
    reference_blend: null
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    description: "Warm Ceylon cinnamon bark with clove undertones",
    category: "spice",
    target_descriptors: {
      spicy: 0.9,
      cinnamon: 0.95,
      warm: 0.75,
      sweet: 0.4,
      woody: 0.3,
      clove: 0.25
    },
    key_compounds: ["637511", "3314", "6549", "323", "4133"],
    reference_blend: null
  },
  {
    id: "chocolate",
    name: "Chocolate",
    description: "Dark chocolate with cocoa depth and roasted notes",
    category: "roasted",
    target_descriptors: {
      chocolate: 0.9,
      roasted: 0.7,
      nutty: 0.45,
      sweet: 0.5,
      caramel: 0.3,
      bitter: 0.2,
      vanilla: 0.2
    },
    key_compounds: ["31252", "1183", "8294", "4133", "8201"],
    reference_blend: null
  },
  {
    id: "fresh-bread",
    name: "Fresh Bread",
    description: "Warm, yeasty, fresh-baked bread",
    category: "roasted",
    target_descriptors: {
      bready: 0.9,
      yeasty: 0.7,
      malty: 0.6,
      toasted: 0.5,
      butter: 0.35,
      sweet: 0.25
    },
    key_compounds: ["31252", "8294", "8201", "1068"],
    reference_blend: null
  },
  {
    id: "banana",
    name: "Banana",
    description: "Ripe banana with slight green peel notes",
    category: "fruit",
    target_descriptors: {
      banana: 0.95,
      fruity: 0.85,
      sweet: 0.6,
      green: 0.3,
      creamy: 0.25,
      tropical: 0.2
    },
    key_compounds: ["31265", "11173", "8038"],
    reference_blend: null
  },
  {
    id: "peach",
    name: "Peach",
    description: "Juicy ripe peach with creamy lactonic notes",
    category: "fruit",
    target_descriptors: {
      peach: 0.95,
      fruity: 0.85,
      creamy: 0.5,
      sweet: 0.6,
      tropical: 0.3,
      coconut: 0.2
    },
    key_compounds: ["7945", "12179", "6569", "8038"],
    reference_blend: null
  },
  {
    id: "mint",
    name: "Peppermint",
    description: "Cool, refreshing peppermint",
    category: "other",
    target_descriptors: {
      minty: 0.95,
      cooling: 0.9,
      fresh: 0.7,
      herbal: 0.3,
      sweet: 0.2,
      green: 0.15
    },
    key_compounds: ["16666", "6986"],
    reference_blend: null
  },
  {
    id: "grape",
    name: "Grape",
    description: "Concord grape with floral notes",
    category: "fruit",
    target_descriptors: {
      grape: 0.95,
      fruity: 0.8,
      concord: 0.85,
      floral: 0.35,
      sweet: 0.5,
      candy: 0.3
    },
    key_compounds: ["7519", "8038", "8048"],
    reference_blend: null
  },
  {
    id: "almond",
    name: "Almond",
    description: "Sweet marzipan-like almond",
    category: "sweet",
    target_descriptors: {
      almond: 0.95,
      marzipan: 0.8,
      sweet: 0.7,
      cherry: 0.3,
      nutty: 0.4,
      vanilla: 0.2
    },
    key_compounds: ["4133", "1183", "323"],
    reference_blend: null
  },
  {
    id: "jasmine",
    name: "Jasmine",
    description: "Heady jasmine absolute character",
    category: "floral",
    target_descriptors: {
      floral: 0.95,
      jasmine: 0.9,
      sweet: 0.4,
      green: 0.25,
      honey: 0.3,
      animalic: 0.15
    },
    key_compounds: ["798", "6054", "6549", "8842"],
    reference_blend: null
  },
  {
    id: "butter",
    name: "Butter",
    description: "Rich, creamy butter",
    category: "dairy",
    target_descriptors: {
      butter: 0.95,
      creamy: 0.85,
      sweet: 0.3,
      milky: 0.4,
      caramel: 0.2
    },
    key_compounds: ["8201", "6569"],
    reference_blend: null
  },
  {
    id: "orange",
    name: "Orange",
    description: "Fresh-squeezed orange juice",
    category: "fruit",
    target_descriptors: {
      citrus: 0.9,
      orange: 0.95,
      fresh: 0.65,
      sweet: 0.5,
      aldehydic: 0.3,
      green: 0.15
    },
    key_compounds: ["22311", "454", "6549"],
    reference_blend: null
  }
];

// Helper to get recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}

// Helper to get recipes by category
export function getRecipesByCategory(category: string): Recipe[] {
  return recipes.filter(r => r.category === category);
}

// Get all unique categories
export function getRecipeCategories(): string[] {
  return [...new Set(recipes.map(r => r.category))];
}
