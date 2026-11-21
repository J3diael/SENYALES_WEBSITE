import Hero from "./components/Hero"
import About from "./components/About"
import Origin from "./components/Origin"
import Purpose from "./components/Purpose"
import EmailCapture from "./components/EmailCapture"
import Footer from "./components/Footer"
import Reveal from "./components/Reveal"

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Origin />
      </Reveal>
      <Reveal>
        <Purpose />
      </Reveal>
      <EmailCapture />
      <Footer />
    </main>
  )
}
