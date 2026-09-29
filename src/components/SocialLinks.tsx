import { Globe } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./BrandIcons";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof YoutubeIcon> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

/** The profile's social links, in the order the admin panel lists them. */
export default function SocialLinks({
  profile,
  className,
}: {
  profile: Profile;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {profile.social.map(({ platform, url, handle }) => {
        const Icon = ICONS[platform.toLowerCase()] ?? Globe;
        const label = `${platform} — ${handle ?? profile.name}`;
        return (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
