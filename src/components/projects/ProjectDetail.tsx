import Image from "next/image";

import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import type { ProjectRecord } from "@/data/projects";

type ProjectDetailProps = {
  project: ProjectRecord;
};

export default function ProjectDetail({
  project,
}: ProjectDetailProps) {
  const primaryGalleryItems = project.gallery?.slice(0, 2) ?? [];

  return (
    <div className="projectDetail">
      <section className="projectDetail__stage">
        <div
          className="projectDetail__scan"
          aria-hidden="true"
        />

        <span className="projectDetail__stageLabel">
          {project.detailLabel ?? "PROJECT VISUALIZATION"}
        </span>

        {project.image ? (
          <div className="projectDetail__heroAsset projectDetail__heroAsset--image">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              priority={project.id === "mantis-blades"}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        ) : (
          <AssetPlaceholder
            label={project.assetLabel}
            className="projectDetail__heroAsset"
          />
        )}

        <div className="projectDetail__coordinates">
          <span>CALIBRATION 100%</span>
          <span>
            MODEL // {project.id.toUpperCase()}
          </span>
        </div>
      </section>

      <aside className="projectDetail__specs">
        <header>
          <span>{project.status}</span>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </header>

        <section>
          <span className="projectDetail__sectionNumber">
            01
          </span>

          <div>
            <h3>Objective</h3>
            <p>{project.objective}</p>
          </div>
        </section>

        <section>
          <span className="projectDetail__sectionNumber">
            02
          </span>

          <div>
            <h3>Technical Stack</h3>

            <div className="projectDetail__tech">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </section>

        {project.sections?.map((section, index) => (
          <section key={section.id}>
            <span className="projectDetail__sectionNumber">
              {String(index + 3).padStart(2, "0")}
            </span>

            <div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>

              {section.image && (
                <div className="projectDetail__sectionImage">
                  <Image
                    src={section.image}
                    alt={
                      section.imageAlt ??
                      `${project.title} ${section.title}`
                    }
                    fill
                    sizes="(max-width: 700px) 100vw, 30vw"
                  />
                </div>
              )}
            </div>
          </section>
        ))}

        {primaryGalleryItems.length > 0 && (
          <section>
            <span className="projectDetail__sectionNumber">
              {String(
                (project.sections?.length ?? 0) + 3
              ).padStart(2, "0")}
            </span>

            <div>
              <h3>Project Media</h3>

              <div className="projectDetail__mediaGrid">
                {primaryGalleryItems.map((item) => (
                  <figure key={item.src}>
                    <div className="projectDetail__mediaImage">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 700px) 50vw, 15vw"
                      />
                    </div>

                    {item.caption && (
                      <figcaption>{item.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.links && project.links.length > 0 && (
          <section>
            <span className="projectDetail__sectionNumber">
              LN
            </span>

            <div>
              <h3>External Records</h3>

              <div className="projectDetail__links">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
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