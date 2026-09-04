import shared from "@/styles/shared.module.css";
import styles from "./PortraitSection.module.css";

// TODO: once real photos are supplied, replace each .photoPlaceholder div
// with a next/image <Image> filling .photoSlot — alt text is ready below.
const PHOTOS = [
  {
    index: "01",
    alt: "Aditya Mittal — portrait 1, shot on a dark background",
    placeholder: "Drop portrait 1 — shot on a dark background works best",
    caption: "Caption goes here — where this was taken, or what you were building.",
  },
  {
    index: "02",
    alt: "Aditya Mittal — portrait 2",
    placeholder: "Drop portrait 2",
    caption: "Second caption — a talk, a hackathon, the desk.",
  },
];

export default function PortraitSection() {
  return (
    <section className={styles.section}>
      <div className={`${shared.container} ${shared.sectionHeader} ${styles.header}`}>
        <h2 className={shared.sectionHeading}>Portrait</h2>
        <span className={shared.cornerTag}>04 / PHOTO — DROP IMAGES HERE</span>
      </div>
      <div className={`${shared.container} ${styles.grid}`}>
        {PHOTOS.map((photo) => (
          <div key={photo.index} className={styles.photoCard}>
            <div className={styles.photoSlot}>
              <div className={styles.photoPlaceholder} role="img" aria-label={photo.alt}>
                {photo.placeholder}
              </div>
            </div>
            <div className={styles.photoCaption}>
              <div className={styles.photoIndex}>{photo.index}</div>
              <p className={styles.captionText}>{photo.caption}</p>
            </div>
          </div>
        ))}
        <div className={styles.quotePanel}>
          <p className={styles.quote}>Noida, India. Building things that survive the next deploy.</p>
          <div className={styles.school}>
            Jaypee University of
            <br />
            Information Technology
            <br />
            B.Tech CSE · 2023–2027
          </div>
        </div>
      </div>
    </section>
  );
}
