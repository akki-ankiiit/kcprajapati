export const site = {
  name: "KC Prajapati India",
  shortName: "KC Prajapati",
  legalName: "KC Prajapati India",
  established: 2000,
  years: 26,
  location: "Chhattisgarh, India",
  tagline: "26 Years of Crafting Excellence.",
  secondaryTagline: "Precision in Every Piece. Excellence in Every Finish.",
  description:
    "A father-and-son legacy in premium tile and marble contracting, built on experience, precision, and exceptional finishing since 2000.",
  metaTitle:
    "KC Prajapati India | Premium Tile & Marble Contractors in Chhattisgarh",
  metaDescription:
    "Discover KC Prajapati India, led by Kailash Prajapati and Manish Prajapati. 26 years of experience in professional marble and tile contracting across Chhattisgarh.",
  founders: [
    {
      id: "kailash-prajapati",
      name: "Kailash Prajapati",
      firstName: "Kailash",
      role: "Founder",
      title: "Senior Marble & Tile Contractor",
      initials: "KP",
      image: "/images/kc/kailash-prajapati.jpg",
      summary:
        "Bringing decades of practical experience and craftsmanship to every project. His knowledge and dedication form the foundation of KC Prajapati India's working philosophy.",
      bio: [
        "Kailash Prajapati began his journey in tile and marble contracting in 2000. What started as hands-on site work grew into a lifelong discipline built on observation, material knowledge, and an uncompromising approach to finishing.",
        "His experience spans the full arc of a project — from reading a surface and planning a layout to the final polish. He is known for a practical, exacting eye and for passing that knowledge on to the team around him.",
      ],
      quote:
        "A good finish is not something you add at the end. It is something you protect from the very first cut.",
    },
    {
      id: "manish-prajapati",
      name: "Manish Prajapati",
      firstName: "Manish",
      role: "Co-Founder",
      title: "Marble & Tile Contractor",
      initials: "MP",
      image: "/images/kc/manish-prajapati.jpg",
      summary:
        "Continuing the family legacy through dedication, technical expertise, and a commitment to professional execution and quality finishing.",
      bio: [
        "Manish Prajapati represents the next generation of the family craft. Working alongside his father, he combines an understanding of traditional stonework with a contemporary approach to planning, coordination, and execution.",
        "He leads projects with a focus on clarity, consistency, and professional delivery — ensuring that the standard set on day one is the standard carried through to handover.",
      ],
      quote:
        "Every joint, every edge, every surface has to agree with the one beside it. That is what makes the whole space feel right.",
    },
  ],
  contact: {
    phone: "+91 78208 09999",
    whatsapp: null,
    email: "help@kcprajapati.com",
    address: "Rajendra Nagar, Raipur, 492001, Chhattisgarh",
    hours: "By appointment",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactDisplay = {
  phone: site.contact.phone,
  email: site.contact.email,
  address: site.contact.address,
};
