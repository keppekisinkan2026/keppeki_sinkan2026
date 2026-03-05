import Image from "next/image";
import type { SocialLink } from "./socialLinkData";

type SocialLinksProps = {
  links: SocialLink[];
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="social-list js-enter">
      {links.map((link) => {
        const linkProps = link.external
          ? {
              target: "_blank",
              rel: "noreferrer noopener",
            }
          : undefined;

        return (
          <li className="social-item js-social-bubble" key={link.id}>
            <a
              className="social-link"
              href={link.href}
              aria-label={link.label}
              {...linkProps}
            >
              <span className="social-bubble" aria-hidden>
                <Image
                  className={`social-icon social-icon--${link.id}`}
                  src={`${basePath}${link.iconPath}`}
                  alt=""
                  width={52}
                  height={52}
                />
              </span>
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
