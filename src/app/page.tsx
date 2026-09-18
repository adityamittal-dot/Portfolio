import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import StackDiagram from "@/components/StackDiagram";
import AIWorkflow from "@/components/AIWorkflow";
import About from "@/components/About";
import Experience from "@/components/Experience";
import LabGrid from "@/components/LabGrid";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero />
        <WorkGrid />
        <StackDiagram />
        <AIWorkflow />
        <section id="about" className={styles.aboutExperience}>
          <div className={`${shared.container} ${styles.aboutExperienceGrid}`}>
            <About />
          </div>
        </section>
        <Experience />
        <LabGrid />
        <Contact />
      </main>
      <CommandPalette />
    </>
  );
}
