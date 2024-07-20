export const siteConfig = {
    name: "chaikit",
    url: "https://chaikit.xyz",
    logo: "/images/chaikit.svg",
    title: "Chaikit",
    ogImage: "https://chaikit.xyz/og.png",
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
          // { href: "/templates", label: "Templates" },
        ],
      },
    },
  }
  
  export type SiteConfig = typeof siteConfig