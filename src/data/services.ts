export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  details: string[];
};

export const services: Service[] = [
  {
    id: "marble-flooring",
    number: "01",
    title: "Marble Flooring",
    short:
      "Premium marble flooring installation with precise alignment, careful fitting, and refined finishing.",
    description:
      "Marble is a material of character. Its veining, tone, and movement are never repeated, which is why every floor begins with a considered layout. We plan the field, balance the joints, and install each piece with the care its surface deserves.",
    image: "/images/kc/marble-foyer.webp",
    imageAlt:
      "Polished marble flooring in a calm, light-filled interior with a strong sense of depth",
    details: [
      "Surface assessment and layout planning",
      "Careful handling and directional placement",
      "Precise alignment and consistent joints",
      "Surface preparation and final finishing",
    ],
  },
  {
    id: "tile-installation",
    number: "02",
    title: "Tile Installation",
    short:
      "Professional floor and wall tile installation with accurate measurements, layout planning, and consistent joints.",
    description:
      "From a single room to an entire floor plate, tile installation is a discipline of measurement and rhythm. We establish the setting-out lines, maintain level and gauge, and work to a consistent joint so the finished surface reads as one considered whole.",
    image: "/images/kc/tile-leveling.webp",
    imageAlt:
      "Close-up of gloved hands using a tile levelling tool for precise installation",
    details: [
      "Full-height wall and floor installation",
      "Setting-out and joint alignment",
      "Level, gauge, and lippage control",
      "Clean transitions at edges and thresholds",
    ],
  },
  {
    id: "marble-cutting-fitting",
    number: "03",
    title: "Marble Cutting & Fitting",
    short:
      "Precise cutting, shaping, and fitting to achieve clean edges and seamless integration.",
    description:
      "The quality of a marble installation is often decided before the first tile is laid. Accurate measurement, clean cutting, and controlled dry-fitting allow edges, corners, and inlays to meet with confidence rather than compromise.",
    image: "/images/kc/tile-spacers.webp",
    imageAlt:
      "Close-up of a tiler fitting spacers between stone tiles with precision",
    details: [
      "Accurate site measurement and marking",
      "Clean cutting and edge control",
      "Dry-fitting before final installation",
      "Considered resolution of corners and inlays",
    ],
  },
  {
    id: "marble-polishing-finishing",
    number: "04",
    title: "Marble Polishing & Finishing",
    short:
      "Professional surface preparation and finishing focused on smoothness and appearance.",
    description:
      "Finishing is where a surface becomes a material experience. We prepare the floor carefully, work through the appropriate stages, and refine the final surface so that the stone feels smooth, consistent, and quietly luxurious underfoot.",
    image: "/images/kc/marble-stair-hall.webp",
    imageAlt:
      "Refined marble staircase and flooring with a smooth, polished finish",
    details: [
      "Surface cleaning and preparation",
      "Progressive polishing and refinement",
      "Attention to edges, crossings, and corners",
      "Final inspection and presentation",
    ],
  },
  {
    id: "large-format-tiles",
    number: "05",
    title: "Large-Format Tiles",
    short:
      "Careful handling, alignment, leveling, and installation of large-format tiles.",
    description:
      "Large-format surfaces offer a sense of continuity that smaller formats cannot. They also demand more from the hands installing them. We plan the sequence, handle each piece with care, and control the bed and alignment for a flat, seamless result.",
    image: "/images/kc/curved-marble-hall.webp",
    imageAlt:
      "Modern curved hallway finished in large-format stone with a continuous surface",
    details: [
      "Panel sequencing and layout coordination",
      "Safe handling and controlled placement",
      "Level bed and joint consistency",
      "Minimal, deliberate grout lines",
    ],
  },
  {
    id: "premium-stone-work",
    number: "06",
    title: "Premium Stone Work",
    short:
      "Detailed stonework executed with material knowledge and professional craftsmanship.",
    description:
      "Some spaces ask for more than a standard installation. Detailed stonework requires an understanding of the material, a clear drawing of the intent, and the patience to resolve every junction by hand. This is the work where experience is most visible.",
    image: "/images/kc/marble-showroom.webp",
    imageAlt:
      "Elegant marble wall panels and detailed stonework in a showroom setting",
    details: [
      "Feature walls and surface detailing",
      "Staircases, thresholds, and edge conditions",
      "Book-matched and directional stone layouts",
      "Close coordination with design intent",
    ],
  },
];

export type Principle = {
  number: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "26 Years of Experience",
    description: "Working in tile and marble contracting since 2000.",
  },
  {
    number: "02",
    title: "Exceptional Finishing",
    description:
      "A strong focus on smooth surfaces, precision, and refined detailing.",
  },
  {
    number: "03",
    title: "Father & Son Leadership",
    description:
      "Two generations sharing practical experience and a common commitment to quality.",
  },
  {
    number: "04",
    title: "Skilled Team",
    description:
      "An experienced workforce dedicated to professional execution.",
  },
  {
    number: "05",
    title: "Precision in Every Detail",
    description:
      "Careful attention to cuts, joints, alignment, and installation.",
  },
  {
    number: "06",
    title: "Commitment to Quality",
    description:
      "A working philosophy built around dependable workmanship.",
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2000",
    title: "The Beginning",
    description:
      "The beginning of the journey in tile and marble contracting.",
    image: "/images/kc/marble-tile-pattern.webp",
    imageAlt:
      "Geometric marble floor tiles arranged in a considered pattern",
  },
  {
    year: "2010",
    title: "Growing Experience",
    description:
      "Building practical knowledge and refining craftsmanship.",
    image: "/images/kc/tile-leveling.webp",
    imageAlt:
      "Close-up of skilled hands setting a tile with a levelling tool",
  },
  {
    year: "2020",
    title: "Strengthening Expertise",
    description:
      "Continuing to develop installation expertise and team capabilities.",
    image: "/images/kc/marble-showroom.webp",
    imageAlt:
      "Large marble panels displayed with attention to material character",
  },
  {
    year: "2026",
    title: "26 Years of Craftsmanship",
    description:
      "Carrying forward a legacy of precision, experience, and professional workmanship.",
    image: "/images/kc/marble-foyer.webp",
    imageAlt:
      "Polished marble flooring flowing through a refined interior",
  },
];

export type ProcessStep = {
  id: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We begin by understanding the space, the material intent, the timeline, and the standard of finish you expect.",
  },
  {
    id: 2,
    title: "Assessment",
    description:
      "The site is reviewed for levels, sequence, access, and surface conditions before work begins.",
  },
  {
    id: 3,
    title: "Layout",
    description:
      "Setting-out lines, joint widths, and directional placement are resolved to give the surface a calm, consistent order.",
  },
  {
    id: 4,
    title: "Cutting",
    description:
      "Accurate measurement and clean cutting allow every edge and junction to meet with precision.",
  },
  {
    id: 5,
    title: "Installation",
    description:
      "Each piece is placed with controlled alignment, consistent bed depth, and careful attention to level and gauge.",
  },
  {
    id: 6,
    title: "Finishing",
    description:
      "The completed surface is cleaned, refined, inspected, and presented — ready for the life that will unfold on it.",
  },
];

export const materials = [
  { name: "Italian Marble", image: "/images/kc/marble-showroom.webp" },
  { name: "Porcelain", image: "/images/kc/marble-tile-pattern.webp" },
  { name: "Vitrified Tiles", image: "/images/kc/curved-marble-hall.webp" },
  { name: "Granite", image: "/images/kc/marble-stair-classic.webp" },
  { name: "Onyx", image: "/images/kc/marble-wall-bath.webp" },
  { name: "Natural Stone", image: "/images/kc/marble-arches.webp" },
];
