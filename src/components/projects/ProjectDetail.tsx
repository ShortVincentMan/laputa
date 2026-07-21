import Image from "next/image";

import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import type { ProjectRecord } from "@/data/projects";

type ProjectDetailProps = {
  project: ProjectRecord;
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const media = project.gallery ?? [];

  return (
    <div className="projectRecord">
      <section className="projectRecord__visual">
        <div className="projectRecord__visualHeader">
          <div>
            <span>ASSET SLOT</span>
            <strong>{project.detailLabel ?? "PROJECT VISUAL"}</strong>
          </div>
          <span>CALIBRATION 100%</span>
        </div>

        <div className="projectRecord__asset">
          <div className="projectRecord__scan" aria-hidden="true" />

          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              priority={project.id === "mantis-blades"}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          ) : (
            <AssetPlaceholder
              label={project.assetLabel}
              className="projectRecord__placeholder"
            />
          )}

          <span className="projectRecord__assetIndex">01</span>
          <span className="projectRecord__assetId">
            MODEL // {project.id.toUpperCase()}
          </span>
        </div>

        {media.length > 0 && (
          <div className="projectRecord__thumbs" aria-label="Project media">
            {media.slice(0, 3).map((item, index) => (
              <figure key={item.src}>
                <div className="projectRecord__thumbImage">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="180px"
                  />
                </div>
                <figcaption>
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  {item.caption ?? "PROJECT MEDIA"}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <aside className="projectRecord__panel">
        <header className="projectRecord__intro">
          <span className={`projectRecord__status projectRecord__status--${project.status.toLowerCase().replaceAll(" ", "-")}`}>
            {project.status}
          </span>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </header>

        <div className="projectRecord__meta">
          <div>
            <span>SECTOR</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>PERIOD</span>
            <strong>{project.period}</strong>
          </div>
          <div>
            <span>STATE</span>
            <strong>{project.status}</strong>
          </div>
        </div>

        <section className="projectRecord__section">
          <span className="projectRecord__number">01</span>
          <div>
            <h3>Objective</h3>
            <p>{project.objective}</p>
          </div>
        </section>

        <section className="projectRecord__section">
          <span className="projectRecord__number">02</span>
          <div>
            <h3>Technical Stack</h3>
            <div className="projectRecord__tech">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </section>

        {project.sections?.map((section, index) => (
          <section className="projectRecord__section" key={section.id}>
            <span className="projectRecord__number">
              {String(index + 3).padStart(2, "0")}
            </span>
            <div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              {section.image && (
                <div className="projectRecord__sectionImage">
                  <Image
                    src={section.image}
                    alt={section.imageAlt ?? `${project.title} ${section.title}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 32vw"
                  />
                </div>
              )}
            </div>
          </section>
        ))}

        {project.links && project.links.length > 0 && (
          <section className="projectRecord__section">
            <span className="projectRecord__number">LN</span>
            <div>
              <h3>External Records</h3>
              <div className="projectRecord__links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </aside>
    </div>
  );
}