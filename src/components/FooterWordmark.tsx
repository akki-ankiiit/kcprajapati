import { site } from "@/data/site";

export default function FooterWordmark() {
  return (
    <span className="inline-flex select-none flex-col">
      <img
        src="/images/media/Logo.svg"
        alt=""
        draggable={false}
        className="h-24 w-auto object-contain md:h-32"
      />
      <span className="sr-only">{site.shortName} india</span>
    </span>
  );
}
