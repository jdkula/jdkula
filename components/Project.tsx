import Image from 'next/image';
import Resume from '~/lib/generated/resume';

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
                <Image
                    src="/images/pic01.jpg"
                    alt=""
                    width={400}
                    height={400}
                />
            </a>
            <div className="inner">
                <h4>{project.name}</h4>
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
                <h4>{project.name}</h4>
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
