import Resume from "~/lib/generated/resume";

export function Skill({ skill}: { skill: Resume['skills'][number] }) {
    const keywords = [...skill.keywords, ...(skill.extraKeywords ?? [])];
    return (
        <li className={`icon ${skill.icon}`}>
            <div>{skill.name}</div>
            <div>
                {keywords.map((keyword: string) => (
                    <div
                        className="keyword"
                        key={keyword}
                        style={{ backgroundColor: skill.color }}
                    >
                        {keyword}
                    </div>
                ))}
            </div>
        </li>
    );
}
