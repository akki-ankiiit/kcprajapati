import RoyalFrame from "@/components/RoyalFrame";
import { cn } from "@/utils/cn";
import type { site } from "@/data/site";

type Founder = (typeof site.founders)[number];

type FounderPortraitProps = {
  founder: Founder;
  index: number;
  className?: string;
  image?: string | null;
  framed?: boolean;
};

export default function FounderPortrait({
  founder,
  index,
  className,
  image,
  framed = false,
}: FounderPortraitProps) {
  const photo = image ?? founder.image ?? null;
  const texture =
    index === 0
      ? "/images/kc/marble-showroom.webp"
      : "/images/kc/marble-wall-bath.webp";

  const portrait = (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden bg-bone",
        className,
      )}
    >
      {photo ? (
        <img
          src={photo}
          alt={`${founder.name}, ${founder.title}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <img
            src={texture}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-25 mix-blend-multiply grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/12 via-transparent to-white/20" />
          <div className="absolute inset-4 border border-ink/10 md:inset-5" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-ink/20 bg-porcelain/35 backdrop-blur-sm md:h-32 md:w-32">
              <span className="font-sans text-4xl text-ink/60 md:text-5xl">
                {founder.initials}
              </span>
            </div>
          </div>

          <span className="absolute left-6 top-6 text-xs text-ink/30">
            Founder 0{index + 1}
          </span>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-6 pt-16">
        <p className="font-accent text-4xl leading-none text-porcelain md:text-4xl">
          {founder.firstName}
        </p>
      </div>
    </div>
  );

  return framed ? <RoyalFrame>{portrait}</RoyalFrame> : portrait;
}
