import GalleryCard from "@/components/GalleryCard";
import type { WorkStudy } from "@/data/work";
import { cn } from "@/utils/cn";

type GalleryGridProps = {
  studies: WorkStudy[];
  onOpen?: (index: number) => void;
  className?: string;
  stagger?: boolean;
  priorityCount?: number;
  theme?: "light" | "dark";
  framed?: boolean;
};

export default function GalleryGrid({
  studies,
  onOpen,
  className,
  stagger = false,
  priorityCount = 0,
  theme = "light",
  framed = false,
}: GalleryGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3",
        stagger && "lg:[&>*:nth-child(3n+2)]:mt-16",
        className,
      )}
    >
      {studies.map((study, index) => (
        <GalleryCard
          key={study.id}
          study={study}
          index={index}
          onOpen={onOpen}
          priority={index < priorityCount}
          theme={theme}
          framed={framed}
        />
      ))}
    </div>
  );
}
