// Core type definitions for Flavor Chemistry Explorer

export type DescriptorVector = Record<string, number>;

export interface Compound {
  id: string;                    // PubChem CID as primary key
  name: string;                  // Common name (e.g., "Linalool")
  cas: string;                   // CAS registry number
  smiles: string;                // Molecular structure

  // Sensory data
  descriptors: DescriptorVector; // Normalized flavor/odor descriptors (0-1)
  threshold_ppm: number | null;  // Odor detection threshold

  // Classification
  chemical_class: string;        // e.g., "terpene", "aldehyde", "pyrazine"
  functional_groups: string[];   // e.g., ["alcohol", "ester"]

  // Context
  natural_sources: string[];     // e.g., ["coffee", "lavender", "citrus peel"]
  fema_number: string | null;    // FEMA GRAS status if applicable

  // Commercial
  typical_use_ppm: number | null; // Typical usage level in formulations
}

export type InteractionType = "additive" | "emergence" | "suppression" | "enhancement";

export interface Interaction {
  compound_a: string;            // PubChem CID
  compound_b: string;            // PubChem CID

  interaction_type: InteractionType;

  // What changes in the blend vs. individual components
  emerged_descriptors: string[];    // New descriptors that appear
  suppressed_descriptors: string[]; // Descriptors that disappear or weaken
  enhanced_descriptors: string[];   // Descriptors that intensify

  // The actual blend outcome
  blend_descriptors: DescriptorVector;

  // Confidence/source
  source: "odor-pair" | "flavordb" | "literature" | "inferred";
}

export interface BlendComponent {
  compound_id: string;
  concentration: number;       // Relative units (1-100 scale)
}

export interface Blend {
  id: string;
  name: string;
  created_at: Date;

  components: BlendComponent[];

  // Computed
  computed_profile: DescriptorVector;
  active_interactions: Interaction[];
  warnings: string[];            // e.g., "X suppresses Y at this ratio"
}

export type RecipeCategory = "fruit" | "floral" | "spice" | "roasted" | "dairy" | "savory" | "sweet" | "other";

export interface Recipe {
  id: string;
  name: string;                  // e.g., "Strawberry", "Fresh Coffee", "Vanilla"
  description: string;

  // The target profile
  target_descriptors: DescriptorVector;

  // A known working formulation (optional, can be hidden for "challenge mode")
  reference_blend: Blend | null;

  // Key compounds typically involved
  key_compounds: string[];       // PubChem CIDs

  category: RecipeCategory;
}

// Canonical descriptor categories for organization
export const DESCRIPTOR_CATEGORIES: Record<string, string[]> = {
  fruity: ["apple", "banana", "berry", "citrus", "tropical", "stone_fruit", "grape", "melon", "pear"],
  floral: ["rose", "jasmine", "violet", "lavender", "orange_blossom", "floral", "geranium", "lily"],
  green: ["grassy", "herbal", "leafy", "vegetable", "green", "cucumber", "mint"],
  spicy: ["cinnamon", "clove", "pepper", "anise", "spicy", "ginger", "nutmeg", "cardamom"],
  woody: ["cedar", "sandalwood", "pine", "oak", "woody", "resinous", "smoky"],
  roasted: ["coffee", "chocolate", "caramel", "nutty", "burnt", "roasted", "toasted", "malty"],
  sweet: ["honey", "vanilla", "candy", "sugar", "sweet", "maple", "molasses"],
  savory: ["meaty", "brothy", "umami", "cheese", "savory", "yeasty", "fermented"],
  chemical: ["sulfurous", "medicinal", "solvent", "metallic", "chemical", "pungent"],
  earthy: ["mushroom", "musty", "soil", "damp", "earthy", "mossy"],
  dairy: ["butter", "cream", "milk", "yogurt", "creamy", "cheesy"],
  marine: ["fishy", "seaweed", "oceanic", "marine", "briny"],
};

// Flat list of all canonical descriptors
export const CANONICAL_DESCRIPTORS = Object.values(DESCRIPTOR_CATEGORIES).flat();
