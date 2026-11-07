// Screen-reader / SEO layer: the complete portfolio as plain semantic HTML,
// visually hidden behind the interactive map.

import {
  profile,
  links,
  projects,
  experience,
  skills,
  education,
  leadership,
} from "../content.js";

export default function StaticContent() {
  return (
    <div className="sr-only">
      <h1>{profile.name} — {profile.title}</h1>
      <p>{profile.tagline}</p>
      {profile.bio.map((b, i) => (
        <p key={i}>{b}</p>
      ))}

      <h2>Projects</h2>
      {projects.map((p) => (
        <section key={p.id}>
          <h3>
            {p.name} ({p.period})
          </h3>
          <p>{p.blurb}</p>
          <ul>
            {p.detail.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Experience</h2>
      {experience.map((e) => (
        <section key={e.id}>
          <h3>
            {e.role}, {e.org} ({e.period})
          </h3>
          <ul>
            {e.detail.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Skills</h2>
      <ul>
        {skills.map((s) => (
          <li key={s.id}>
            {s.name}: {s.text}
          </li>
        ))}
      </ul>

      <h2>Education</h2>
      {education.map((ed) => (
        <section key={ed.id}>
          <h3>
            {ed.name} ({ed.period})
          </h3>
          {ed.detail.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </section>
      ))}

      <h2>Leadership</h2>
      {leadership.map((l) => (
        <section key={l.id}>
          <h3>
            {l.name} ({l.period})
          </h3>
          <p>{l.detail[0]}</p>
        </section>
      ))}

      <h2>Contact</h2>
      <ul>
        <li>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </li>
        <li>
          <a href={links.github}>GitHub</a>
        </li>
        <li>
          <a href={links.linkedin}>LinkedIn</a>
        </li>
        <li>
          <a href={profile.resumeUrl}>Resume (PDF)</a>
        </li>
      </ul>
    </div>
  );
}
