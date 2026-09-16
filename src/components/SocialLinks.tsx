import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./BrandIcons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  {
    href: site.social.youtube,
    label: "YouTube — Kaushik Bhat Tabla",
    Icon: YoutubeIcon,
  },
  {
    href: site.social.instagram,
    label: "Instagram — @kaushik_bhat",
    Icon: InstagramIcon,
  },
  {
    href: site.social.facebook,
    label: "Facebook — Kaushik Bhat",
    Icon: FacebookIcon,
  },
];

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
