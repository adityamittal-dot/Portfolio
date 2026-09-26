import Toolbar from "@/components/Toolbar";
import CommandPalette from "@/components/CommandPalette";
import RunHeader from "@/components/RunHeader";
import WorkSuite from "@/components/WorkSuite";
import ExperienceSuite from "@/components/ExperienceSuite";
import LabSuite from "@/components/LabSuite";
import Environment from "@/components/Environment";
import About from "@/components/About";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Toolbar />
      <main id="main-content">
        <RunHeader />
        <WorkSuite />
        <Environment />
        <LabSuite />
        <ExperienceSuite />
        <About />
        <Contact />
      </main>
      <CommandPalette />
    </>
  );
}
