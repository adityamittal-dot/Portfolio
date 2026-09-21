import shared from "@/styles/shared.module.css";
import styles from "./StackDiagram.module.css";

const PRIMARY = [
  { label: "frontend", detail: "React · Next.js · shadCN\nTailwind · EJS" },
  { label: "backend", detail: "Django · DRF · Node/Express\nJWT · OAuth 2.0 · Temporal" },
  { label: "cloud", detail: "AWS S3 · Lambda · RDS\nEC2 · IAM · CloudWatch\nVercel · Kubernetes" },
];

const SECONDARY = [
  { label: "languages", detail: "Python · JS (ES6+)\nTypeScript · C/C++ · SQL\nHTML5 · CSS3/SCSS" },
  { label: "databases", detail: "PostgreSQL\nMongoDB" },
  { label: "testing", detail: "Playwright E2E · Sentry\nvisual regression\ntest automation arch." },
  {
    label: "devops",
    detail: "Docker · Compose · Terraform\nGit · GitHub · CI/CD\nnpm workspaces · Postman\nLinux/Bash",
  },
  {
    label: "aws",
    detail: "STS · EKS · ECS · CloudFront\nSQS · SNS · DynamoDB\nAPI Gateway · VPC · ELB\nCloudFormation · CDK\nSecrets Mgr · Parameter Store",
  },
];

function DetailLines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <span>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

export default function StackDiagram() {
  return (
    <section id="stack" className={styles.section}>
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={`${shared.sectionHeader} ${styles.header}`}>
          <h2 className={shared.sectionHeading}>How the stack fits together</h2>
          <span className={shared.cornerTag}>03 / BLUEPRINT</span>
        </div>

        <div className={styles.primaryRow}>
          <div className={styles.box}>
            <span className={styles.boxLabel}>{PRIMARY[0].label}</span>
            <span className={styles.boxDetail}>
              <DetailLines text={PRIMARY[0].detail} />
            </span>
          </div>
          <div className={styles.arrow}>──▶</div>
          <div className={styles.box}>
            <span className={styles.boxLabel}>{PRIMARY[1].label}</span>
            <span className={styles.boxDetail}>
              <DetailLines text={PRIMARY[1].detail} />
            </span>
          </div>
          <div className={styles.arrow}>──▶</div>
          <div className={styles.box}>
            <span className={styles.boxLabel}>{PRIMARY[2].label}</span>
            <span className={styles.boxDetail}>
              <DetailLines text={PRIMARY[2].detail} />
            </span>
          </div>
        </div>

        <div className={styles.secondaryRow}>
          {SECONDARY.map((item) => (
            <div key={item.label} className={styles.dashedBox}>
              <span className={styles.dashedLabel}>{item.label}</span>
              <span className={styles.boxDetail}>
                <DetailLines text={item.detail} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
