import Image from 'next/image';

export function Project({
    project,
    resume,
}: {
    project: any;
    resume: any;
}) {
    const colorMap = new Map<string, string>(
        resume.skills.flatMap((skill: any) => [
            [skill.name, skill.color],
            ...[...skill.keywords, ...(skill.extraKeywords ?? [])].map(
                (keyword: string) => [keyword, skill.color]
            ),
        ])
    );
    return (
        <article>
            <a href="#" className="image">
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
