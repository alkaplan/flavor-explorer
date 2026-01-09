import type { Interaction } from '../types';

export const interactions: Interaction[] = [
  // Linalool + Limonene: Enhancement of citrus-floral
  {
    compound_a: "6549",  // Linalool
    compound_b: "22311", // Limonene
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["citrus", "fresh", "floral"],
    blend_descriptors: { citrus: 0.9, floral: 0.7, fresh: 0.75, lemon: 0.6, lavender: 0.5, sweet: 0.35 },
    source: "odor-pair"
  },

  // Vanillin + Ethyl Vanillin: Simple additive, rich vanilla
  {
    compound_a: "1183",  // Vanillin
    compound_b: "8467",  // Ethyl Vanillin
    interaction_type: "additive",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["vanilla", "creamy"],
    blend_descriptors: { vanilla: 0.98, sweet: 0.9, creamy: 0.65, caramel: 0.4 },
    source: "literature"
  },

  // Ethyl Butyrate + Maltol: Emergence of pineapple/tropical
  {
    compound_a: "8038",  // Ethyl Butyrate
    compound_b: "8294",  // Maltol
    interaction_type: "emergence",
    emerged_descriptors: ["pineapple", "tropical"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["sweet", "fruity"],
    blend_descriptors: { fruity: 0.95, pineapple: 0.85, tropical: 0.7, sweet: 0.85, caramel: 0.4, banana: 0.3 },
    source: "odor-pair"
  },

  // Indole + Phenylethyl Alcohol: Transforms fecal indole to pleasant jasmine
  {
    compound_a: "798",   // Indole
    compound_b: "6054",  // Phenylethyl Alcohol
    interaction_type: "emergence",
    emerged_descriptors: ["jasmine"],
    suppressed_descriptors: ["fecal", "animalic"],
    enhanced_descriptors: ["floral"],
    blend_descriptors: { floral: 0.95, jasmine: 0.9, rose: 0.6, sweet: 0.4, honey: 0.3 },
    source: "literature"
  },

  // Linalool + Vanillin: Creates soapy note
  {
    compound_a: "6549",  // Linalool
    compound_b: "1183",  // Vanillin
    interaction_type: "emergence",
    emerged_descriptors: ["soapy"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["sweet"],
    blend_descriptors: { floral: 0.7, vanilla: 0.7, sweet: 0.75, soapy: 0.4, lavender: 0.5, creamy: 0.3 },
    source: "odor-pair"
  },

  // Cinnamaldehyde + Eugenol: Warm spice synergy
  {
    compound_a: "637511", // Cinnamaldehyde
    compound_b: "3314",   // Eugenol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["spicy", "warm"],
    blend_descriptors: { spicy: 0.98, cinnamon: 0.85, clove: 0.7, warm: 0.85, sweet: 0.4, woody: 0.35 },
    source: "literature"
  },

  // 2-Furfurylthiol + Diacetyl: Coffee with cream emergence
  {
    compound_a: "7362",  // 2-Furfurylthiol
    compound_b: "8201",  // Diacetyl
    interaction_type: "emergence",
    emerged_descriptors: ["coffee_cream"],
    suppressed_descriptors: ["sulfurous"],
    enhanced_descriptors: ["coffee", "creamy"],
    blend_descriptors: { coffee: 0.95, roasted: 0.8, creamy: 0.7, butter: 0.5, caramel: 0.4, nutty: 0.3 },
    source: "odor-pair"
  },

  // Geraniol + Citronellol: Rose bouquet enhancement
  {
    compound_a: "8842",  // Geraniol
    compound_b: "10908", // Citronellol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["rose", "floral"],
    blend_descriptors: { floral: 0.95, rose: 0.95, citrus: 0.35, fresh: 0.45, sweet: 0.4, green: 0.25 },
    source: "literature"
  },

  // Limonene + Octanal: Bright orange enhancement
  {
    compound_a: "22311", // Limonene
    compound_b: "454",   // Octanal
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["orange", "citrus"],
    blend_descriptors: { citrus: 0.95, orange: 0.9, fresh: 0.6, aldehydic: 0.4, sweet: 0.3, green: 0.2 },
    source: "odor-pair"
  },

  // Furaneol + Gamma-Decalactone: Strawberry cream
  {
    compound_a: "21145", // Furaneol
    compound_b: "7945",  // Gamma-Decalactone
    interaction_type: "emergence",
    emerged_descriptors: ["strawberry_cream"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["fruity", "creamy"],
    blend_descriptors: { fruity: 0.9, strawberry: 0.85, creamy: 0.75, peach: 0.6, sweet: 0.8, caramel: 0.4 },
    source: "odor-pair"
  },

  // Menthol + Linalool: Suppression of floral by cooling
  {
    compound_a: "16666", // Menthol
    compound_b: "6549",  // Linalool
    interaction_type: "suppression",
    emerged_descriptors: [],
    suppressed_descriptors: ["lavender", "floral"],
    enhanced_descriptors: ["fresh"],
    blend_descriptors: { minty: 0.85, cooling: 0.8, fresh: 0.8, floral: 0.3, herbal: 0.4, sweet: 0.2 },
    source: "odor-pair"
  },

  // Vanillin + Maltol: Caramelized vanilla
  {
    compound_a: "1183",  // Vanillin
    compound_b: "8294",  // Maltol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["sweet", "caramel"],
    blend_descriptors: { vanilla: 0.9, sweet: 0.95, caramel: 0.8, creamy: 0.5, toasted: 0.3 },
    source: "literature"
  },

  // cis-3-Hexenol + Ethyl Butyrate: Fresh fruit emergence
  {
    compound_a: "11173", // cis-3-Hexenol
    compound_b: "8038",  // Ethyl Butyrate
    interaction_type: "emergence",
    emerged_descriptors: ["fresh_fruit"],
    suppressed_descriptors: ["grassy"],
    enhanced_descriptors: ["fruity", "green"],
    blend_descriptors: { fruity: 0.85, green: 0.7, fresh: 0.75, pineapple: 0.5, leafy: 0.4, sweet: 0.45 },
    source: "odor-pair"
  },

  // Benzaldehyde + Vanillin: Marzipan/almond paste
  {
    compound_a: "4133",  // Benzaldehyde
    compound_b: "1183",  // Vanillin
    interaction_type: "emergence",
    emerged_descriptors: ["marzipan"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["sweet", "almond"],
    blend_descriptors: { almond: 0.9, marzipan: 0.85, sweet: 0.8, vanilla: 0.6, cherry: 0.4, creamy: 0.3 },
    source: "literature"
  },

  // Guaiacol + 2-Furfurylthiol: Deep roasted coffee
  {
    compound_a: "7047",  // Guaiacol
    compound_b: "7362",  // 2-Furfurylthiol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["coffee", "roasted", "smoky"],
    blend_descriptors: { coffee: 0.95, roasted: 0.9, smoky: 0.7, woody: 0.5, phenolic: 0.4, nutty: 0.3 },
    source: "literature"
  },

  // Rose Oxide + Phenylethyl Alcohol: Damascena rose
  {
    compound_a: "1549778", // Rose Oxide
    compound_b: "6054",    // Phenylethyl Alcohol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: ["metallic"],
    enhanced_descriptors: ["rose", "floral"],
    blend_descriptors: { floral: 0.98, rose: 0.98, honey: 0.4, green: 0.3, sweet: 0.45 },
    source: "literature"
  },

  // Ethyl Isobutyrate + Ethyl Maltol/Maltol: Pineapple candy
  {
    compound_a: "61203", // Ethyl Isobutyrate
    compound_b: "8294",  // Maltol
    interaction_type: "emergence",
    emerged_descriptors: ["pineapple_candy"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["fruity", "sweet"],
    blend_descriptors: { fruity: 0.9, pineapple: 0.8, sweet: 0.85, caramel: 0.5, tropical: 0.6, ethereal: 0.3 },
    source: "odor-pair"
  },

  // Diacetyl + Furaneol: Butterscotch
  {
    compound_a: "8201",  // Diacetyl
    compound_b: "21145", // Furaneol
    interaction_type: "emergence",
    emerged_descriptors: ["butterscotch"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["butter", "sweet", "caramel"],
    blend_descriptors: { butter: 0.85, caramel: 0.9, sweet: 0.85, creamy: 0.7, burnt_sugar: 0.4, fruity: 0.3 },
    source: "odor-pair"
  },

  // Coumarin + Vanillin: Tonka/vanilla luxury
  {
    compound_a: "323",   // Coumarin
    compound_b: "1183",  // Vanillin
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["sweet", "vanilla"],
    blend_descriptors: { vanilla: 0.9, sweet: 0.85, tonka: 0.7, hay: 0.4, almond: 0.35, woody: 0.25 },
    source: "literature"
  },

  // Beta-Damascenone + Furaneol: Complex fruit
  {
    compound_a: "5280798", // Beta-Damascenone
    compound_b: "21145",   // Furaneol
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["fruity", "apple"],
    blend_descriptors: { fruity: 0.95, apple: 0.75, rose: 0.5, caramel: 0.65, sweet: 0.8, honey: 0.4 },
    source: "odor-pair"
  },

  // Methyl Anthranilate + Ethyl Butyrate: Grape candy
  {
    compound_a: "7519",  // Methyl Anthranilate
    compound_b: "8038",  // Ethyl Butyrate
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["grape", "fruity"],
    blend_descriptors: { grape: 0.95, fruity: 0.9, concord: 0.8, sweet: 0.6, floral: 0.35, pineapple: 0.3 },
    source: "odor-pair"
  },

  // Isoamyl Acetate + cis-3-Hexenol: Green banana
  {
    compound_a: "31265", // Isoamyl Acetate
    compound_b: "11173", // cis-3-Hexenol
    interaction_type: "emergence",
    emerged_descriptors: ["green_banana"],
    suppressed_descriptors: [],
    enhanced_descriptors: ["banana", "green"],
    blend_descriptors: { banana: 0.9, green: 0.75, fruity: 0.8, grassy: 0.5, fresh: 0.6, sweet: 0.4 },
    source: "odor-pair"
  },

  // Citral + Geraniol: Lemon-rose citrus floral
  {
    compound_a: "638011", // Citral
    compound_b: "8842",   // Geraniol
    interaction_type: "additive",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: [],
    blend_descriptors: { citrus: 0.85, lemon: 0.8, floral: 0.7, rose: 0.6, fresh: 0.55, sweet: 0.3 },
    source: "odor-pair"
  },

  // Eugenol + Vanillin: Warm vanilla spice
  {
    compound_a: "3314",  // Eugenol
    compound_b: "1183",  // Vanillin
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: ["medicinal"],
    enhanced_descriptors: ["warm", "sweet"],
    blend_descriptors: { vanilla: 0.8, spicy: 0.65, clove: 0.6, sweet: 0.75, warm: 0.7, woody: 0.35 },
    source: "literature"
  },

  // Hexanal + Ethyl Hexanoate: Apple enhancement
  {
    compound_a: "31289", // Hexanal
    compound_b: "7762",  // Ethyl Hexanoate
    interaction_type: "enhancement",
    emerged_descriptors: [],
    suppressed_descriptors: ["fatty"],
    enhanced_descriptors: ["apple", "fruity"],
    blend_descriptors: { apple: 0.85, fruity: 0.9, green: 0.6, sweet: 0.5, pineapple: 0.4, leafy: 0.3 },
    source: "odor-pair"
  },

  // Anethole + Cinnamaldehyde: Complex spice
  {
    compound_a: "637563", // Anethole
    compound_b: "637511", // Cinnamaldehyde
    interaction_type: "additive",
    emerged_descriptors: [],
    suppressed_descriptors: [],
    enhanced_descriptors: ["spicy", "warm"],
    blend_descriptors: { anise: 0.7, cinnamon: 0.7, spicy: 0.9, sweet: 0.6, licorice: 0.5, warm: 0.65 },
    source: "literature"
  },
];

// Helper to find interactions for a compound
export function getInteractionsForCompound(compoundId: string): Interaction[] {
  return interactions.filter(
    i => i.compound_a === compoundId || i.compound_b === compoundId
  );
}

// Helper to find interaction between two specific compounds
export function getInteractionBetween(compoundA: string, compoundB: string): Interaction | undefined {
  return interactions.find(
    i => (i.compound_a === compoundA && i.compound_b === compoundB) ||
         (i.compound_a === compoundB && i.compound_b === compoundA)
  );
}

// Get all unique interaction types
export function getInteractionTypes(): string[] {
  return [...new Set(interactions.map(i => i.interaction_type))];
}
