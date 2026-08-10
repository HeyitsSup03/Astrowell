import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  className?: string;
  /** Show a green online indicator dot */
  isOnline?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-7 w-7 text-xs",
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

const dotSizeClasses: Record<AvatarSize, string> = {
  xs: "h-2 w-2 bottom-0 right-0",
  sm: "h-2.5 w-2.5 bottom-0 right-0",
  md: "h-3 w-3 bottom-0.5 right-0.5",
  lg: "h-3.5 w-3.5 bottom-0.5 right-0.5",
  xl: "h-4 w-4 bottom-1 right-1",
};

function Avatar({ src, name = "", size = "md", className, isOnline }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div className={cn("relative flex-shrink-0", sizeClasses[size], className)}>
      {src ? (
        <Image
          src={src}
          alt={name || "Avatar"}
          fill
          unoptimized={src.includes(".svg") || src.includes("dicebear")}
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 48px, 64px"
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full w-full h-full",
            "bg-gradient-to-br from-primary-light to-primary",
            "text-white font-semibold select-none",
            sizeClasses[size]
          )}
        >
          {initials}
        </div>
      )}
      {isOnline && (
        <span
          className={cn(
            "absolute block rounded-full bg-success border-2 border-surface dark:border-surface-dark",
            dotSizeClasses[size]
          )}
        />
      )}
    </div>
  );
}

export { Avatar, type AvatarProps };
