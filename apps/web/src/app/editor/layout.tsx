import { EditorTopBar } from "@/components/ui/editor-top-bar"

export default function TemplateLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
    <EditorTopBar heading="slothmdx" />
      {children}
      </>
    )
  }