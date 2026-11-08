export const workCategories = [
  "All",
  "Marble Flooring",
  "Premium Tile Work",
  "Wall Installations",
  "Stone Finishing",
  "Large-Format Tiles",
  "Detailed Marble Work",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type WorkStudy = {
  id: string;
  category: Exclude<WorkCategory, "All">;
  title: string;
  caption: string;
  image: string;
  alt: string;
  orientation: "landscape" | "portrait" | "square";
};

/**
 * These are material and craftsmanship studies, not client projects.
 * They are intentionally labelled "Illustrative study" in the interface.
 * Replace the image files and captions with real KC Prajapati India project
 * photography when it becomes available.
 */
export const workStudies: WorkStudy[] = [
  {
    id: "marble-flooring-01",
    category: "Marble Flooring",
    title: "Book-matched marble field",
    caption:
      "A continuous marble floor planned around veining, direction, and a quiet joint line.",
    image: "/images/kc/marble-foyer.webp",
    alt: "Polished marble floor in a light-filled interior",
    orientation: "landscape",
  },
  {
    id: "marble-flooring-02",
    category: "Marble Flooring",
    title: "Living space in stone",
    caption:
      "Large marble surfaces flowing through a living space with a calm, uninterrupted finish.",
    image: "/images/kc/marble-living-room.webp",
    alt: "Living room with marble flooring and refined contemporary furniture",
    orientation: "portrait",
  },
  {
    id: "premium-tile-work-01",
    category: "Premium Tile Work",
    title: "Geometric tile composition",
    caption:
      "A measured tile pattern where proportion and repetition do the decorative work.",
    image: "/images/kc/marble-tile-pattern.webp",
    alt: "Top view of geometric marble tiles in a considered pattern",
    orientation: "landscape",
  },
  {
    id: "premium-tile-work-02",
    category: "Premium Tile Work",
    title: "Curved tiled threshold",
    caption:
      "A curved transition resolved in large-format tile with a clean, continuous edge.",
    image: "/images/kc/curved-marble-hall.webp",
    alt: "Modern curved hallway finished in large-format stone tile",
    orientation: "landscape",
  },
  {
    id: "wall-installations-01",
    category: "Wall Installations",
    title: "Full-height marble wall",
    caption:
      "Marble cladding carried from floor to ceiling to give the room a single material expression.",
    image: "/images/kc/marble-bathroom.webp",
    alt: "Luxury bathroom with full-height marble wall and modern fixtures",
    orientation: "landscape",
  },
  {
    id: "wall-installations-02",
    category: "Wall Installations",
    title: "Textured stone panel",
    caption:
      "A close study of stone surface, tone, and the shadow line where panels meet.",
    image: "/images/kc/marble-wall-bath.webp",
    alt: "Marble wall panels in a contemporary bathroom",
    orientation: "landscape",
  },
  {
    id: "stone-finishing-01",
    category: "Stone Finishing",
    title: "Polished stair and landing",
    caption:
      "Stair treads and landings finished to a consistent tone and edge detail.",
    image: "/images/kc/marble-stair-hall.webp",
    alt: "Smooth marble staircase and landing with a polished finish",
    orientation: "portrait",
  },
  {
    id: "stone-finishing-02",
    category: "Stone Finishing",
    title: "Honest stone edges",
    caption:
      "Clean edge work and careful junctions where stone meets adjacent surfaces.",
    image: "/images/kc/marble-staircase.webp",
    alt: "Modern marble staircase with clean stone edges",
    orientation: "landscape",
  },
  {
    id: "large-format-01",
    category: "Large-Format Tiles",
    title: "Seamless stone corridor",
    caption:
      "Large panels sequenced to create a minimal joint pattern down a long corridor.",
    image: "/images/kc/marble-hallway.webp",
    alt: "Long corridor with large-format marble flooring",
    orientation: "portrait",
  },
  {
    id: "large-format-02",
    category: "Large-Format Tiles",
    title: "Continuous stone lobby",
    caption:
      "A continuous floor plane carried through a lobby with a disciplined setting-out.",
    image: "/images/kc/marble-stair-lobby.webp",
    alt: "Marble lobby with a continuous stone floor",
    orientation: "portrait",
  },
  {
    id: "detailed-marble-01",
    category: "Detailed Marble Work",
    title: "Precision at the joint",
    caption:
      "A close look at spacing, levelling, and the tolerance that sits behind a clean finish.",
    image: "/images/kc/tile-spacers.webp",
    alt: "Close-up of a craftsperson positioning tile spacers",
    orientation: "landscape",
  },
  {
    id: "detailed-marble-02",
    category: "Detailed Marble Work",
    title: "Material-led interior",
    caption:
      "Marble detailing used as the quiet protagonist of a minimal interior.",
    image: "/images/kc/marble-bath-minimal.webp",
    alt: "Minimal bathroom with carefully detailed marble surfaces",
    orientation: "landscape",
  },
  {
    id: "detailed-marble-03",
    category: "Detailed Marble Work",
    title: "Stone arch and corridor",
    caption:
      "A considered study of arch, column, and floor coming together in stone.",
    image: "/images/kc/marble-arches.webp",
    alt: "Marble arches and corridor with detailed stonework",
    orientation: "portrait",
  },
  {
    id: "large-format-03",
    category: "Large-Format Tiles",
    title: "Marble entry sequence",
    caption:
      "An entry threshold resolved with large stone surfaces and a restrained palette.",
    image: "/images/kc/marble-entry-stair.webp",
    alt: "Marble entry with a large stone floor and staircase",
    orientation: "portrait",
  },
  {
    id: "stone-finishing-03",
    category: "Stone Finishing",
    title: "Refined wet-area surface",
    caption:
      "A wet area finished with a consistent stone surface and careful drainage falls.",
    image: "/images/kc/marble-bath-floor.webp",
    alt: "Bathroom with marble walls and floor",
    orientation: "landscape",
  },
  {
    id: "premium-tile-work-03",
    category: "Premium Tile Work",
    title: "Level and alignment",
    caption:
      "The hidden discipline of tile work: a flat plane, aligned joints, and controlled adhesive depth.",
    image: "/images/kc/tile-leveling.webp",
    alt: "Gloved hands using a tile levelling tool",
    orientation: "landscape",
  },
];

export const featuredStudies = workCategories
  .filter((category): category is Exclude<WorkCategory, "All"> => category !== "All")
  .map((category) => workStudies.find((study) => study.category === category))
  .filter((study): study is WorkStudy => Boolean(study));
