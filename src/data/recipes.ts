import type { Recipe } from '../types';

// Updated recipes with compound IDs from the new dataset
export const recipes: Recipe[] = [
  {
    id: "strawberry",
    name: "Strawberry",
    description: "Fresh, ripe strawberry with green stem notes",
    category: "fruit",
    target_descriptors: {
      fruity: 0.9,
      berry: 0.85,
      sweet: 0.7,
      green: 0.3,
      creamy: 0.25,
      caramellic: 0.2
    },
    key_compounds: ["570574", "519382", "1068", "8738", "5281168"],
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
      caramellic: 0.4,
      earthy: 0.25,
      smoky: 0.3
    },
    key_compounds: ["61808", "526618", "62131", "14505", "61634"],
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
      caramellic: 0.3,
      woody: 0.15
    },
    key_compounds: ["7410", "61007", "31244", "61155", "8738"],
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
      fresh: 0.25,
      sweet: 0.3,
      citrus: 0.15
    },
    key_compounds: ["8842", "9017", "7778", "521238", "7738"],
    reference_blend: null
  },
  {
    id: "lemon",
    name: "Lemon",
    description: "Fresh lemon zest and juice",
    category: "fruit",
    target_descriptors: {
      citrus: 0.95,
      fresh: 0.7,
      green: 0.3,
      floral: 0.15,
      aldehydic: 0.2
    },
    key_compounds: ["8842", "16441", "11527", "9017", "7778"],
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
      apricot: 0.4
    },
    key_compounds: ["109332", "2733977", "6437428", "7778", "7704"],
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
    key_compounds: ["12278", "8129", "5281168", "7983", "7797"],
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
    key_compounds: ["14896", "16441", "61953", "521238", "30248"],
    reference_blend: null
  },
  {
    id: "apple",
    name: "Apple",
    description: "Crisp green apple with subtle sweetness",
    category: "fruit",
    target_descriptors: {
      apple: 0.95,
      fruity: 0.85,
      green: 0.5,
      fresh: 0.6,
      sweet: 0.4
    },
    key_compounds: ["31289", "5281168", "8738", "527", "61312"],
    reference_blend: null
  },
  {
    id: "coconut",
    name: "Coconut",
    description: "Creamy tropical coconut",
    category: "fruit",
    target_descriptors: {
      coconut: 0.95,
      creamy: 0.8,
      sweet: 0.6,
      tropical: 0.5,
      milky: 0.3
    },
    key_compounds: ["7704", "8738", "6549", "7170", "15336"],
    reference_blend: null
  },
  {
    id: "honey",
    name: "Honey",
    description: "Golden floral honey",
    category: "sweet",
    target_descriptors: {
      honey: 0.95,
      sweet: 0.85,
      floral: 0.4,
      waxy: 0.3,
      warm: 0.25
    },
    key_compounds: ["7410", "8842", "6549", "527", "8092"],
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
      floral: 0.35,
      sweet: 0.5,
      candy: 0.3
    },
    key_compounds: ["7410", "527", "31266", "8842", "7983"],
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
      fatty: 0.5
    },
    key_compounds: ["8738", "1068", "7704", "31289", "8129"],
    reference_blend: null
  },
  {
    id: "tropical",
    name: "Tropical Blend",
    description: "Mixed tropical fruits - pineapple, mango, passion fruit",
    category: "fruit",
    target_descriptors: {
      tropical: 0.95,
      fruity: 0.9,
      sweet: 0.6,
      pineapple: 0.7,
      green: 0.2
    },
    key_compounds: ["7797", "7983", "12278", "109332", "5281168"],
    reference_blend: null
  },
  {
    id: "herbal",
    name: "Herbal Garden",
    description: "Fresh herbal notes - basil, thyme, rosemary",
    category: "other",
    target_descriptors: {
      herbal: 0.95,
      green: 0.8,
      fresh: 0.7,
      spicy: 0.3,
      woody: 0.25
    },
    key_compounds: ["6549", "14896", "16441", "8842", "30248"],
    reference_blend: null
  },
  {
    id: "caramel",
    name: "Caramel",
    description: "Rich buttery caramel with burnt sugar notes",
    category: "sweet",
    target_descriptors: {
      caramellic: 0.95,
      sweet: 0.9,
      butter: 0.5,
      burnt: 0.3,
      creamy: 0.4
    },
    key_compounds: ["61634", "14505", "8738", "7410", "31244"],
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
