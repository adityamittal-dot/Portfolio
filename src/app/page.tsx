import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import StackDiagram from "@/components/StackDiagram";
import PortraitSection from "@/components/PortraitSection";
import About from "@/components/About";
import Experience from "@/components/Experience";
import LabGrid from "@/components/LabGrid";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <WorkGrid />
      <StackDiagram />
      <PortraitSection />
      <section id="about" className={styles.aboutExperience}>
        <div className={`${shared.container} ${styles.aboutExperienceGrid}`}>
          <About />
          <Experience />
        </div>
      </section>
      <LabGrid />
      <Contact />
      <CommandPalette />
    </>
  );
}
