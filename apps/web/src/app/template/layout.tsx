import { SiteHeader } from "@/components/site-header"

export default function TemplateLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <SiteHeader />
      {children}
      </>
    )
  }