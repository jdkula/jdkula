import Image from 'next/image';
import Resume from '~/lib/generated/resume';
import { OutLink } from './OutLink';

function getColorMap(resume: Resume): Map<string, string> {
  return new Map<string, string>(
    resume.skills.flatMap((skill) => [
      [skill.name, skill.color],
      ...[...skill.keywords, ...(skill.extraKeywords ?? [])].map(
        (keyword: string) => [keyword, skill.color] as const
      ),
    ])
  );
}

export function ProjectOverview({
  project,
  resume,
  onClick,
}: {
  project: Resume['projects'][number];
  resume: Resume;
  onClick?: () => void;
}) {
  const colorMap = getColorMap(resume);
  const photo = project.photos?.[0] ?? '/images/pic01.jpg';

  return (
    <article>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className="image"
      >
        <Image src={photo} alt="" width={400} height={400} data-shadow />
      </a>
      <div className="inner">
        <h4>
          <OutLink href={project.url}>{project.name}</OutLink>
        </h4>
        <div style={{ marginBottom: '8px' }}>
          {project.keywords.map((keyword: string) => (
            <div
              className="keyword"
              key={keyword}
              style={{ backgroundColor: colorMap.get(keyword) }}
            >
              {keyword}
            </div>
          ))}
        </div>

        <p>{project.description}</p>
      </div>
    </article>
  );
}

export function ProjectDetails({
  project,
  resume,
}: {
  project: Resume['projects'][number];
  resume: Resume;
}) {
  const colorMap = getColorMap(resume);

  return (
    <div>
      <div className="inner">
        <h3>
          <OutLink href={project.url}>{project.name}</OutLink>
          {project.repo && (
            <a
              target="_blank"
              rel="noreferrer"
              href={project.repo}
              style={{ marginLeft: '2rem' }}
            >
              <i className="icon brands fa-github"></i>
              &nbsp;
              <i className="icon solid fa-external-link"></i>
            </a>
          )}
        </h3>
        {project.keywords.map((keyword: string) => (
          <div
            className="keyword"
            key={keyword}
            style={{ backgroundColor: colorMap.get(keyword) }}
          >
            {keyword}
          </div>
        ))}

        <p>{project.description}</p>
        <div>
          <ul>
            {project.roles.map((role: string) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
