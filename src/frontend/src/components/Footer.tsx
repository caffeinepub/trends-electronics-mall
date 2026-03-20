import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiX } from "react-icons/si";

const footerLinks = [
  {
    heading: "Smartphones",
    links: [
      "Samsung Galaxy",
      "iPhone Series",
      "Google Pixel",
      "OnePlus",
      "Xiaomi",
    ],
  },
  {
    heading: "Gadgets",
    links: ["Smart Speakers", "Tablets", "Laptops", "Gaming Gear", "Cameras"],
  },
  {
    heading: "Quick Links",
    links: ["New Arrivals", "About Us", "Contact", "Track Order", "Returns"],
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

function handleSocialEnter(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.borderColor = "oklch(0.78 0.14 192)";
  e.currentTarget.style.color = "oklch(0.78 0.14 192)";
}
function handleSocialLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.borderColor = "oklch(0.28 0.015 220)";
  e.currentTarget.style.color = "oklch(0.55 0.01 220)";
}
function handleLinkEnter(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = "oklch(0.78 0.14 192)";
}
function handleLinkLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = "";
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "oklch(0.10 0.008 220)",
        borderTop: "1px solid oklch(0.22 0.013 220)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold tracking-widest text-foreground uppercase mb-4">
              TREND<span className="text-teal">S</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Premium electronics curated for the discerning tech enthusiast.
              India's finest smartphone and gadget destination.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Founded by{" "}
              <span
                className="text-teal"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                Rahul Raja Khakha
              </span>
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://trends-electronics.in"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    border: "1px solid oklch(0.28 0.015 220)",
                    color: "oklch(0.55 0.01 220)",
                  }}
                  onMouseEnter={handleSocialEnter}
                  onMouseLeave={handleSocialLeave}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="https://trends-electronics.in"
                aria-label="X"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  border: "1px solid oklch(0.28 0.015 220)",
                  color: "oklch(0.55 0.01 220)",
                }}
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
              >
                <SiX className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#contact"
                      className="text-sm text-muted-foreground transition-colors"
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid oklch(0.20 0.012 220)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Trends Electronics Mall. Founded by{" "}
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1rem",
                color: "oklch(0.78 0.14 192)",
                fontWeight: 700,
              }}
            >
              Rahul Raja Khakha
            </span>
            .
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
