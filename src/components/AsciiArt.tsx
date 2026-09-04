import styles from "./AsciiArt.module.css";

/**
 * Baked as a static string per the design handoff (the diamond is
 * procedurally generated in the reference, but a fixed character grid
 * reads identically and needs no client-side generation logic).
 */
const DIAMOND = `


            ..::----======----::..
        .::-==++**##########**++==-::.
     ..:-=+**#%%@@@@@@@@@@@@@@%%#**+=-:..
    .:-=+*#%@@@@%%###****###%%@@@@%#*+=-:.
   .:-=+*#%@@@%#**+===--===+**#%@@@%#*+=-:.
  .:-=+*#%@@@%#*+=--::::::--=+*#%@@@%#*+=-:.
  .:-=+*#%@@@%#*+=--::::::--=+*#%@@@%#*+=-:.
   .:-=+*#%@@@%#**+===--===+**#%@@@%#*+=-:.
    .:-=+*#%@@@@%%###****###%%@@@@%#*+=-:.
     ..:-=+**#%%@@@@@@@@@@@@@@%%#**+=-:..
        .::-==++**##########**++==-::.
            ..::----======----::..`;

export default function AsciiArt() {
  return <pre className={styles.pre}>{DIAMOND}</pre>;
}
