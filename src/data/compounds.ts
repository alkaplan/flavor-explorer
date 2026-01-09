import type { Compound } from '../types';

export const compounds: Compound[] = [
  // Citrus compounds
  {
    id: "22311",
    name: "Limonene",
    cas: "5989-27-5",
    smiles: "CC(=C)C1CCC(C)=CC1",
    descriptors: { citrus: 0.95, lemon: 0.8, orange: 0.7, fresh: 0.6, sweet: 0.3, green: 0.2 },
    threshold_ppm: 10,
    chemical_class: "terpene",
    functional_groups: ["alkene"],
    natural_sources: ["lemon", "orange", "grapefruit", "lime"],
    fema_number: "2633",
    typical_use_ppm: 50
  },
  {
    id: "638011",
    name: "Citral",
    cas: "5392-40-5",
    smiles: "CC(C)=CCCC(C)=CC=O",
    descriptors: { citrus: 0.9, lemon: 0.95, fresh: 0.7, green: 0.4, herbal: 0.3, sweet: 0.2 },
    threshold_ppm: 0.03,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde", "alkene"],
    natural_sources: ["lemongrass", "lemon", "orange"],
    fema_number: "2303",
    typical_use_ppm: 20
  },
  {
    id: "6549",
    name: "Linalool",
    cas: "78-70-6",
    smiles: "CC(C)=CCCC(C)(O)C=C",
    descriptors: { floral: 0.85, lavender: 0.8, citrus: 0.4, fresh: 0.5, woody: 0.3, sweet: 0.4 },
    threshold_ppm: 0.006,
    chemical_class: "terpene",
    functional_groups: ["alcohol", "alkene"],
    natural_sources: ["lavender", "bergamot", "coriander", "basil"],
    fema_number: "2635",
    typical_use_ppm: 30
  },

  // Vanilla & Sweet compounds
  {
    id: "1183",
    name: "Vanillin",
    cas: "121-33-5",
    smiles: "COC1=CC(C=O)=CC=C1O",
    descriptors: { vanilla: 0.98, sweet: 0.85, creamy: 0.5, woody: 0.2, caramel: 0.3 },
    threshold_ppm: 0.02,
    chemical_class: "phenol",
    functional_groups: ["aldehyde", "phenol", "ether"],
    natural_sources: ["vanilla bean", "clove"],
    fema_number: "3107",
    typical_use_ppm: 100
  },
  {
    id: "8467",
    name: "Ethyl Vanillin",
    cas: "121-32-4",
    smiles: "CCOC1=CC(C=O)=CC=C1O",
    descriptors: { vanilla: 0.95, sweet: 0.9, creamy: 0.6, caramel: 0.4, floral: 0.2 },
    threshold_ppm: 0.01,
    chemical_class: "phenol",
    functional_groups: ["aldehyde", "phenol", "ether"],
    natural_sources: [],
    fema_number: "2464",
    typical_use_ppm: 50
  },
  {
    id: "8294",
    name: "Maltol",
    cas: "118-71-8",
    smiles: "CC1=C(O)C(=O)C=CO1",
    descriptors: { sweet: 0.9, caramel: 0.85, cotton_candy: 0.7, toasted: 0.4, fruity: 0.3 },
    threshold_ppm: 0.035,
    chemical_class: "pyrone",
    functional_groups: ["ketone", "enol"],
    natural_sources: ["bread crust", "coffee", "chicory"],
    fema_number: "2656",
    typical_use_ppm: 75
  },
  {
    id: "21145",
    name: "Furaneol",
    cas: "3658-77-3",
    smiles: "CC1=C(O)C(=O)C(C)O1",
    descriptors: { sweet: 0.85, caramel: 0.9, strawberry: 0.8, fruity: 0.7, burnt_sugar: 0.5 },
    threshold_ppm: 0.04,
    chemical_class: "furanone",
    functional_groups: ["ketone", "enol"],
    natural_sources: ["strawberry", "pineapple", "tomato"],
    fema_number: "3174",
    typical_use_ppm: 20
  },

  // Floral compounds
  {
    id: "8842",
    name: "Geraniol",
    cas: "106-24-1",
    smiles: "CC(C)=CCCC(C)=CCO",
    descriptors: { floral: 0.9, rose: 0.85, citrus: 0.3, sweet: 0.4, green: 0.2, fruity: 0.3 },
    threshold_ppm: 0.04,
    chemical_class: "terpene",
    functional_groups: ["alcohol", "alkene"],
    natural_sources: ["rose", "geranium", "palmarosa", "citronella"],
    fema_number: "2507",
    typical_use_ppm: 40
  },
  {
    id: "6054",
    name: "Phenylethyl Alcohol",
    cas: "60-12-8",
    smiles: "OCCC1=CC=CC=C1",
    descriptors: { floral: 0.95, rose: 0.9, honey: 0.4, sweet: 0.5, green: 0.2 },
    threshold_ppm: 1.0,
    chemical_class: "alcohol",
    functional_groups: ["alcohol", "aromatic"],
    natural_sources: ["rose", "hyacinth", "jasmine", "carnation"],
    fema_number: "2858",
    typical_use_ppm: 100
  },
  {
    id: "10908",
    name: "Citronellol",
    cas: "106-22-9",
    smiles: "CC(C)=CCCC(C)CCO",
    descriptors: { floral: 0.85, rose: 0.8, citrus: 0.4, fresh: 0.5, green: 0.3, sweet: 0.3 },
    threshold_ppm: 0.04,
    chemical_class: "terpene",
    functional_groups: ["alcohol"],
    natural_sources: ["rose", "geranium", "citronella"],
    fema_number: "2309",
    typical_use_ppm: 50
  },
  {
    id: "1549778",
    name: "Rose Oxide",
    cas: "16409-43-1",
    smiles: "CC(C)C1CCC(C)(O1)C=C",
    descriptors: { floral: 0.9, rose: 0.95, green: 0.5, fresh: 0.4, metallic: 0.2 },
    threshold_ppm: 0.0005,
    chemical_class: "ether",
    functional_groups: ["ether", "alkene"],
    natural_sources: ["rose", "geranium", "lychee"],
    fema_number: "3236",
    typical_use_ppm: 5
  },
  {
    id: "5280798",
    name: "Beta-Damascenone",
    cas: "23726-93-4",
    smiles: "CC(=CC=CC1(C)C(C)=CC(=O)C=C1)C=O",
    descriptors: { floral: 0.7, rose: 0.8, fruity: 0.85, apple: 0.6, honey: 0.5, tobacco: 0.3 },
    threshold_ppm: 0.000002,
    chemical_class: "ketone",
    functional_groups: ["ketone", "alkene"],
    natural_sources: ["rose", "apple", "grape", "tea"],
    fema_number: "3420",
    typical_use_ppm: 1
  },

  // Fruity - Esters
  {
    id: "8038",
    name: "Ethyl Butyrate",
    cas: "105-54-4",
    smiles: "CCCC(=O)OCC",
    descriptors: { fruity: 0.95, pineapple: 0.7, banana: 0.5, sweet: 0.6, tropical: 0.5 },
    threshold_ppm: 0.001,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["pineapple", "strawberry", "banana"],
    fema_number: "2427",
    typical_use_ppm: 50
  },
  {
    id: "31265",
    name: "Isoamyl Acetate",
    cas: "123-92-2",
    smiles: "CC(C)CCOC(C)=O",
    descriptors: { fruity: 0.9, banana: 0.95, pear: 0.4, sweet: 0.5, solvent: 0.2 },
    threshold_ppm: 0.002,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["banana", "pear", "apple"],
    fema_number: "2055",
    typical_use_ppm: 80
  },
  {
    id: "8048",
    name: "Ethyl Acetate",
    cas: "141-78-6",
    smiles: "CCOC(C)=O",
    descriptors: { fruity: 0.7, ethereal: 0.8, sweet: 0.5, grape: 0.4, solvent: 0.4 },
    threshold_ppm: 5,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["wine", "beer", "fruits"],
    fema_number: "2414",
    typical_use_ppm: 100
  },
  {
    id: "7762",
    name: "Ethyl Hexanoate",
    cas: "123-66-0",
    smiles: "CCCCCC(=O)OCC",
    descriptors: { fruity: 0.9, apple: 0.7, pineapple: 0.6, sweet: 0.5, wine: 0.4 },
    threshold_ppm: 0.001,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["apple", "pineapple", "wine"],
    fema_number: "2439",
    typical_use_ppm: 40
  },
  {
    id: "7945",
    name: "Gamma-Decalactone",
    cas: "706-14-9",
    smiles: "CCCCCCC1CCC(=O)O1",
    descriptors: { fruity: 0.85, peach: 0.95, creamy: 0.6, coconut: 0.4, sweet: 0.5 },
    threshold_ppm: 0.01,
    chemical_class: "lactone",
    functional_groups: ["lactone"],
    natural_sources: ["peach", "apricot", "strawberry"],
    fema_number: "2360",
    typical_use_ppm: 30
  },
  {
    id: "12179",
    name: "Gamma-Undecalactone",
    cas: "104-67-6",
    smiles: "CCCCCCCC1CCC(=O)O1",
    descriptors: { fruity: 0.8, peach: 0.9, coconut: 0.5, creamy: 0.7, sweet: 0.4 },
    threshold_ppm: 0.008,
    chemical_class: "lactone",
    functional_groups: ["lactone"],
    natural_sources: ["peach", "coconut"],
    fema_number: "3091",
    typical_use_ppm: 25
  },

  // Green compounds
  {
    id: "11173",
    name: "cis-3-Hexenol",
    cas: "928-96-1",
    smiles: "CCC=CCCO",
    descriptors: { green: 0.95, grassy: 0.9, leafy: 0.8, fresh: 0.6, herbal: 0.4 },
    threshold_ppm: 0.07,
    chemical_class: "alcohol",
    functional_groups: ["alcohol", "alkene"],
    natural_sources: ["grass", "green leaves", "tea"],
    fema_number: "2563",
    typical_use_ppm: 20
  },
  {
    id: "5281167",
    name: "cis-3-Hexenyl Acetate",
    cas: "3681-71-8",
    smiles: "CCC=CCCOC(C)=O",
    descriptors: { green: 0.9, fruity: 0.5, grassy: 0.7, banana: 0.3, fresh: 0.6 },
    threshold_ppm: 0.002,
    chemical_class: "ester",
    functional_groups: ["ester", "alkene"],
    natural_sources: ["banana", "apple", "mint"],
    fema_number: "3171",
    typical_use_ppm: 30
  },

  // Spicy compounds
  {
    id: "637511",
    name: "Cinnamaldehyde",
    cas: "104-55-2",
    smiles: "C(=CC1=CC=CC=C1)C=O",
    descriptors: { spicy: 0.95, cinnamon: 0.98, sweet: 0.5, warm: 0.7, woody: 0.3 },
    threshold_ppm: 0.007,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde", "alkene", "aromatic"],
    natural_sources: ["cinnamon bark", "cassia"],
    fema_number: "2286",
    typical_use_ppm: 50
  },
  {
    id: "3314",
    name: "Eugenol",
    cas: "97-53-0",
    smiles: "COC1=CC(CC=C)=CC=C1O",
    descriptors: { spicy: 0.9, clove: 0.95, warm: 0.7, woody: 0.4, sweet: 0.3, medicinal: 0.3 },
    threshold_ppm: 0.006,
    chemical_class: "phenol",
    functional_groups: ["phenol", "ether", "alkene"],
    natural_sources: ["clove", "cinnamon", "basil", "nutmeg"],
    fema_number: "2467",
    typical_use_ppm: 40
  },
  {
    id: "7501",
    name: "Methyl Salicylate",
    cas: "119-36-8",
    smiles: "COC(=O)C1=CC=CC=C1O",
    descriptors: { minty: 0.7, medicinal: 0.8, sweet: 0.4, wintergreen: 0.95, warm: 0.3 },
    threshold_ppm: 0.04,
    chemical_class: "ester",
    functional_groups: ["ester", "phenol"],
    natural_sources: ["wintergreen", "birch", "meadowsweet"],
    fema_number: "2745",
    typical_use_ppm: 30
  },
  {
    id: "637563",
    name: "Anethole",
    cas: "4180-23-8",
    smiles: "COC1=CC=C(C=CC)C=C1",
    descriptors: { anise: 0.95, sweet: 0.7, licorice: 0.9, herbal: 0.3, warm: 0.4 },
    threshold_ppm: 0.05,
    chemical_class: "phenylpropanoid",
    functional_groups: ["ether", "alkene", "aromatic"],
    natural_sources: ["anise", "fennel", "star anise"],
    fema_number: "2086",
    typical_use_ppm: 60
  },

  // Roasted/Coffee/Chocolate
  {
    id: "7362",
    name: "2-Furfurylthiol",
    cas: "98-02-2",
    smiles: "SCC1=CC=CO1",
    descriptors: { coffee: 0.98, roasted: 0.9, sulfurous: 0.4, nutty: 0.3, meaty: 0.3 },
    threshold_ppm: 0.00005,
    chemical_class: "thiol",
    functional_groups: ["thiol", "furan"],
    natural_sources: ["roasted coffee", "bread crust"],
    fema_number: "2493",
    typical_use_ppm: 0.5
  },
  {
    id: "8201",
    name: "2,3-Butanedione (Diacetyl)",
    cas: "431-03-8",
    smiles: "CC(=O)C(C)=O",
    descriptors: { butter: 0.95, creamy: 0.8, caramel: 0.4, sweet: 0.3, cheesy: 0.3 },
    threshold_ppm: 0.005,
    chemical_class: "diketone",
    functional_groups: ["ketone"],
    natural_sources: ["butter", "cheese", "beer", "wine"],
    fema_number: "2370",
    typical_use_ppm: 10
  },
  {
    id: "31252",
    name: "2-Acetylpyrazine",
    cas: "22047-25-2",
    smiles: "CC(=O)C1=NC=CN=C1",
    descriptors: { nutty: 0.9, roasted: 0.85, popcorn: 0.7, bread: 0.6, coffee: 0.4 },
    threshold_ppm: 0.06,
    chemical_class: "pyrazine",
    functional_groups: ["ketone", "pyrazine"],
    natural_sources: ["popcorn", "bread", "cocoa"],
    fema_number: "3126",
    typical_use_ppm: 5
  },
  {
    id: "7047",
    name: "Guaiacol",
    cas: "90-05-1",
    smiles: "COC1=CC=CC=C1O",
    descriptors: { smoky: 0.95, woody: 0.6, phenolic: 0.7, medicinal: 0.4, vanilla: 0.2 },
    threshold_ppm: 0.003,
    chemical_class: "phenol",
    functional_groups: ["phenol", "ether"],
    natural_sources: ["smoke", "coffee", "whiskey", "vanilla"],
    fema_number: "2532",
    typical_use_ppm: 5
  },
  {
    id: "4133",
    name: "Benzaldehyde",
    cas: "100-52-7",
    smiles: "C(=O)C1=CC=CC=C1",
    descriptors: { almond: 0.95, cherry: 0.7, marzipan: 0.8, sweet: 0.4, fruity: 0.3 },
    threshold_ppm: 0.35,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde", "aromatic"],
    natural_sources: ["almonds", "cherries", "apricots"],
    fema_number: "2127",
    typical_use_ppm: 50
  },
  {
    id: "7519",
    name: "Methyl Anthranilate",
    cas: "134-20-3",
    smiles: "COC(=O)C1=CC=CC=C1N",
    descriptors: { grape: 0.95, fruity: 0.7, floral: 0.5, sweet: 0.4, concord: 0.9 },
    threshold_ppm: 0.003,
    chemical_class: "ester",
    functional_groups: ["ester", "amine", "aromatic"],
    natural_sources: ["grape", "jasmine", "orange blossom"],
    fema_number: "2682",
    typical_use_ppm: 20
  },

  // Dairy/Creamy
  {
    id: "6569",
    name: "Delta-Decalactone",
    cas: "705-86-2",
    smiles: "CCCCCC1CCCC(=O)O1",
    descriptors: { creamy: 0.9, coconut: 0.8, peach: 0.5, milky: 0.7, sweet: 0.4 },
    threshold_ppm: 0.1,
    chemical_class: "lactone",
    functional_groups: ["lactone"],
    natural_sources: ["coconut", "milk", "butter"],
    fema_number: "2361",
    typical_use_ppm: 40
  },

  // Nutty
  {
    id: "6561",
    name: "5-Methyl-2-Furfural",
    cas: "620-02-0",
    smiles: "CC1=CC=C(C=O)O1",
    descriptors: { caramel: 0.8, nutty: 0.6, sweet: 0.5, almond: 0.4, bready: 0.5 },
    threshold_ppm: 2.0,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde", "furan"],
    natural_sources: ["coffee", "bread", "honey"],
    fema_number: "2702",
    typical_use_ppm: 20
  },

  // Earthy
  {
    id: "1727",
    name: "2-Isobutyl-3-methoxypyrazine",
    cas: "24683-00-9",
    smiles: "COC1=NC=CN=C1CC(C)C",
    descriptors: { green_pepper: 0.95, earthy: 0.7, vegetable: 0.6, pea: 0.5, grassy: 0.3 },
    threshold_ppm: 0.000002,
    chemical_class: "pyrazine",
    functional_groups: ["ether", "pyrazine"],
    natural_sources: ["green pepper", "peas", "wine"],
    fema_number: "3132",
    typical_use_ppm: 0.1
  },
  {
    id: "17885",
    name: "Geosmin",
    cas: "19700-21-1",
    smiles: "CC1CCC(C)(O)C2CCCCC12C",
    descriptors: { earthy: 0.98, musty: 0.8, beetroot: 0.6, soil: 0.7, damp: 0.5 },
    threshold_ppm: 0.000005,
    chemical_class: "alcohol",
    functional_groups: ["alcohol"],
    natural_sources: ["beets", "soil", "fish"],
    fema_number: null,
    typical_use_ppm: 0.01
  },

  // Cooling/Mint
  {
    id: "16666",
    name: "Menthol",
    cas: "89-78-1",
    smiles: "CC(C)C1CCC(C)CC1O",
    descriptors: { minty: 0.98, cooling: 0.95, fresh: 0.7, herbal: 0.3, sweet: 0.2 },
    threshold_ppm: 0.04,
    chemical_class: "terpene",
    functional_groups: ["alcohol"],
    natural_sources: ["peppermint", "spearmint"],
    fema_number: "2665",
    typical_use_ppm: 100
  },
  {
    id: "6986",
    name: "Menthone",
    cas: "89-80-5",
    smiles: "CC(C)C1CCC(C)CC1=O",
    descriptors: { minty: 0.85, herbal: 0.5, woody: 0.3, green: 0.4, fresh: 0.5 },
    threshold_ppm: 0.3,
    chemical_class: "terpene",
    functional_groups: ["ketone"],
    natural_sources: ["peppermint", "geranium"],
    fema_number: "2667",
    typical_use_ppm: 50
  },

  // Tropical
  {
    id: "62465",
    name: "Ethyl 2-Methylbutyrate",
    cas: "7452-79-1",
    smiles: "CCC(C)C(=O)OCC",
    descriptors: { fruity: 0.95, apple: 0.8, strawberry: 0.7, sweet: 0.5, green: 0.3 },
    threshold_ppm: 0.0001,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["apple", "strawberry", "grape"],
    fema_number: "2443",
    typical_use_ppm: 15
  },
  {
    id: "61203",
    name: "Ethyl Isobutyrate",
    cas: "97-62-1",
    smiles: "CCOC(=O)C(C)C",
    descriptors: { fruity: 0.9, ethereal: 0.6, sweet: 0.5, rum: 0.4, pineapple: 0.5 },
    threshold_ppm: 0.0001,
    chemical_class: "ester",
    functional_groups: ["ester"],
    natural_sources: ["rum", "wine", "strawberry"],
    fema_number: "2428",
    typical_use_ppm: 30
  },

  // Coumarin family
  {
    id: "323",
    name: "Coumarin",
    cas: "91-64-5",
    smiles: "O=C1OC2=CC=CC=C2C=C1",
    descriptors: { sweet: 0.8, hay: 0.7, vanilla: 0.5, almond: 0.4, woody: 0.3, tonka: 0.9 },
    threshold_ppm: 0.9,
    chemical_class: "lactone",
    functional_groups: ["lactone", "aromatic"],
    natural_sources: ["tonka bean", "cinnamon", "sweet clover"],
    fema_number: "2381",
    typical_use_ppm: 20
  },

  // Indole (interesting at low concentrations)
  {
    id: "798",
    name: "Indole",
    cas: "120-72-9",
    smiles: "C1=CC=C2NC=CC2=C1",
    descriptors: { floral: 0.6, jasmine: 0.8, fecal: 0.5, animalic: 0.6, mothball: 0.3 },
    threshold_ppm: 0.03,
    chemical_class: "indole",
    functional_groups: ["indole", "aromatic"],
    natural_sources: ["jasmine", "orange blossom", "gardenia"],
    fema_number: "2593",
    typical_use_ppm: 2
  },

  // Aldehydes
  {
    id: "31289",
    name: "Hexanal",
    cas: "66-25-1",
    smiles: "CCCCCC=O",
    descriptors: { green: 0.85, grassy: 0.8, fatty: 0.5, leafy: 0.6, apple: 0.3 },
    threshold_ppm: 0.005,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde"],
    natural_sources: ["apple", "olive oil", "green leaves"],
    fema_number: "2557",
    typical_use_ppm: 10
  },
  {
    id: "454",
    name: "Octanal",
    cas: "124-13-0",
    smiles: "CCCCCCCC=O",
    descriptors: { citrus: 0.8, fatty: 0.5, green: 0.4, orange: 0.7, aldehydic: 0.6 },
    threshold_ppm: 0.0007,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde"],
    natural_sources: ["orange", "lemon", "grapefruit"],
    fema_number: "2797",
    typical_use_ppm: 8
  },

  // Sulfur compounds (potent)
  {
    id: "1050",
    name: "Dimethyl Sulfide",
    cas: "75-18-3",
    smiles: "CSC",
    descriptors: { sulfurous: 0.7, cabbage: 0.8, vegetable: 0.6, corn: 0.5, seafood: 0.4 },
    threshold_ppm: 0.003,
    chemical_class: "sulfide",
    functional_groups: ["sulfide"],
    natural_sources: ["cabbage", "corn", "seafood", "beer"],
    fema_number: "2746",
    typical_use_ppm: 1
  },
  {
    id: "1068",
    name: "Methional",
    cas: "3268-49-3",
    smiles: "CSCCC=O",
    descriptors: { potato: 0.95, meaty: 0.6, sulfurous: 0.5, brothy: 0.7, vegetable: 0.4 },
    threshold_ppm: 0.0002,
    chemical_class: "aldehyde",
    functional_groups: ["aldehyde", "sulfide"],
    natural_sources: ["potato", "bread", "meat"],
    fema_number: "2747",
    typical_use_ppm: 2
  },
];

// Helper to get compound by ID
export function getCompoundById(id: string): Compound | undefined {
  return compounds.find(c => c.id === id);
}

// Helper to search compounds
export function searchCompounds(query: string): Compound[] {
  const lowerQuery = query.toLowerCase();
  return compounds.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.cas.includes(query) ||
    c.chemical_class.toLowerCase().includes(lowerQuery) ||
    c.natural_sources.some(s => s.toLowerCase().includes(lowerQuery)) ||
    Object.keys(c.descriptors).some(d => d.toLowerCase().includes(lowerQuery))
  );
}

// Get all unique chemical classes
export function getChemicalClasses(): string[] {
  return [...new Set(compounds.map(c => c.chemical_class))].sort();
}

// Get all unique natural sources
export function getNaturalSources(): string[] {
  return [...new Set(compounds.flatMap(c => c.natural_sources))].sort();
}
