import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { EWasteModule } from "@/components/ewaste/EWasteModule"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-[var(--background)] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <EWasteModule />
      <Footer />
    </main>
  )
}
