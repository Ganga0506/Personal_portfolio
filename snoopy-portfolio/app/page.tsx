import ProjectCard from "../components/ProjectCard";
import WorkCard from "../components/WorkCard";
import StackIcon from "../components/StackIcon";

import { projects } from "../data/projects";
import { work } from "../data/work";
import { stack } from "../data/stack";

export default function Home() {
  return (
    <>
      {/* Work Section */}
      <Section id="work">
        {work.map((item, i) => <WorkCard key={i} {...item} />)}
      </Section>

      {/* Project Section */}
      <Section id="projects">
        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
      </Section>

      {/* Stack Section */}
      <Section id="stack">
        {stack.map((tech, i) => <StackIcon key={i} {...tech} />)}
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <p>Email: you@example.com</p>
        <p>LinkedIn: <a href="#">link</a></p>
        <p>GitHub: <a href="#">link</a></p>
      </Section>
    </>
  );
}