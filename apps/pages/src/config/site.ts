export const siteConfig = {
    name: "chaikit pages",
    url: "https://pages.chaikit.xyz",
    logo: "/images/chaikit.svg",
    title: "Chaikit",
    ogImage: "https://pages.chaikit.xyz/og.png",
    description:
      "Chai for everyone. Templates and Components for to jumpstart your app development process.",
    links: {
      twitter: "https://x.com/montekkundan",
      github: "https://github.com/chaikitxyz/chaikit",
    },
    header: {
      nav: {
        links: [
          { href: "/docs/installation", label: "Docs" },
          { href: "/components", label: "Components" },
          { href: "/guides", label: "Guides" },
          { href: "/pages", label: "Pages" },
          { href: "/template", label: "Templates" },
        ],
      },
    },
  }
  
  export type SiteConfig = typeof siteConfig