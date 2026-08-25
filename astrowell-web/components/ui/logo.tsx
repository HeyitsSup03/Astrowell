import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  imageClassName?: string;
}

export function Logo({
  href = "/dashboard",
  size = "md",
  showText = true,
  subtitle,
  className,
  textClassName,
  iconClassName,
  imageClassName = "scale-125",
}: LogoProps) {
  const sizeMap = {
    sm: { box: "h-9 w-9", text: "text-lg" },
    md: { box: "h-[48px] w-[48px]", text: "text-xl" },
    lg: { box: "h-14 w-14", text: "text-2xl" },
    xl: { box: "h-16 w-16", text: "text-3xl" },
  };

  const content = (
    <div className={cn("flex items-center gap-4 group cursor-pointer", className)}>
      {/* Logo Image matching full height of text block */}
      <div className={cn("relative shrink-0 flex items-center justify-center overflow-visible", sizeMap[size].box, iconClassName)}>
        <Image
          src="/astrowell-logo.png"
          alt="Astrowell Logo"
          width={100}
          height={100}
          className={cn("w-full h-full object-contain transition-transform duration-300 group-hover:scale-135 drop-shadow-sm", imageClassName)}
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={cn("font-display font-bold text-primary dark:text-primary-light tracking-tight group-hover:text-accent transition-colors leading-tight", sizeMap[size].text, textClassName)}>
            Astrowell
          </span>
          {subtitle && (
            <span className="text-[10px] uppercase font-bold text-text-muted dark:text-text-muted-dark tracking-widest mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
