import Hero from "./components/Hero"
import About from "./components/About"
import Origin from "./components/Origin"
import Purpose from "./components/Purpose"
import EmailCapture from "./components/EmailCapture"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Origin />
      <Purpose />
      <EmailCapture />
      <Footer />
    </main>
  )
}