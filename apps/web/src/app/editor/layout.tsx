import { EditorTopBar } from "@/components/editor/editor-top-bar"

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