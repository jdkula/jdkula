import { useState } from 'react';
import Resume from '~/lib/generated/resume';
import { ModalTicker } from './Modal';
import { ProjectDetails, ProjectOverview } from './Project';

export function ProjectList({ resume }: { resume: Resume }) {
  const [currentProject, setCurrentProject] = useState<number | null>(null);

  const projects = resume.projects.map((project: any, i: number) => (
    <ProjectOverview
      project={project}
      resume={resume}
      key={project.name}
      onClick={() => setCurrentProject(i)}
    />
  ));

  const modalOptions = resume.projects.map((project: any, i: number) => (
    <ProjectDetails project={project} resume={resume} key={project.name} />
  ));

  return (
    <div className="features">
      <ModalTicker
        onSet={(i) => setCurrentProject(i)}
        onClose={() => setCurrentProject(null)}
        show={currentProject}
      >
        {modalOptions}
      </ModalTicker>
      {projects}
    </div>
  );
}
