"use client";

import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { achievements, blogs, experience, projects, skills, socialLinks } from "@/data/portfolio";
import GitHubActivity from "@/components/GitHubActivity";
import VisitorCount from "@/components/VisitorCount";

const nav = ["About", "Work", "Projects", "Writing"];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Visitor Count"><VisitorCount/></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a href="/assets/Varad_Kulkarni_Networking_AI_Researcher.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <section className="hero section" id="top">
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-photo hero-reveal">
</div>
        <div className="container hero-inner">
          <p className="eyebrow hero-reveal">SOFTWARE ENGINEER · PUNE, INDIA</p>
          <h1 className="hero-title hero-reveal">I build systems<br /><em>worth using.</em></h1>
          <div className="hero-bottom">
            <p className="hero-copy hero-reveal">Full-stack developer having experience ini software systems, computer networks, GenAI and currently researching on cross-platform memory layers.</p>
          </div>
          <div className="hero-scroll hero-reveal"><span>Scroll to explore</span><span className="line" /></div>
        </div>
      </section>

<section className="intro section" id="about">
  <div className="container two-col">

    <div className="about-photo" data-reveal>
      <img
        src="/assets/varad-kulkarni.jpg"
        alt="Varad Kulkarni"
      />
    </div>

    <div className="about-content" data-reveal>
      <p className="eyebrow">01 / ABOUT</p>

      <h2 className="statement">
        Engineer by training.{" "}
        <span>Builder by obsession.</span>
      </h2>

      <p className="body-copy">
        I&apos;m a Computer Science graduate from
        Vishwakarma Institute of Technology, Pune. I like
        problems where software has to understand the real
        world: distributed systems, networks, developer
        tooling and intelligent memory layers.
      </p>

      <p className="body-copy">
        My current work sits between development and
        research. I&apos;ve worked with Kubernetes and Linux
        in DevOps environments and built projects spanning
        MERN, Android, machine learning and GenAI.
      </p>

      <div className="skills">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>

  </div>
</section>

      <section className="work section" id="work">
        <div className="container">
          <div className="section-head" data-reveal><p className="eyebrow">02 / EXPERIENCE</p><span>What I&apos;ve been doing</span></div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" key={item.role} data-reveal>
                <span className="period">{item.period}</span>
                <div><h3>{item.role}</h3><p className="company">{item.company}</p><p className="muted">{item.detail}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="container">
          <div className="section-head" data-reveal><p className="eyebrow">03 / SELECTED WORK</p><span>Things I&apos;ve actually built</span></div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-row ${project.accent}`} href={project.href} target="_blank" rel="noreferrer" key={project.title} data-reveal>
                <div className="project-number">{project.number}</div>
                <div className="project-main"><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="muted project-description">{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <ArrowUpRight className="project-arrow" size={25} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="research section">
        <div className="container research-grid">
          <div data-reveal><p className="eyebrow">04 / RESEARCH & ACHIEVEMENTS</p><h2 className="large-title">Curious enough to publish it.<br /></h2></div>
          <div className="achievement-list">
            {achievements.map((item, index) => (
              <a className="achievement-row" href={item.href ?? "#contact"} target={item.href ? "_blank" : undefined} rel={item.href ? "noreferrer" : undefined} key={item.title} data-reveal>
                <span>0{index + 1}</span><div><h3>{item.title}</h3><p className="muted">{item.detail}</p></div><ArrowUpRight size={19} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="github section">
        <div className="container">
          <div className="section-head" data-reveal><p className="eyebrow">05 / OPEN SOURCE</p><span>Consistency over noise</span></div>
          <div data-reveal><GitHubActivity /></div>
        </div>
      </section>

      <section className="writing section" id="writing">
        <div className="container">
          <div className="section-head" data-reveal><p className="eyebrow">06 / WRITING</p><span>Notes from the rabbit holes</span></div>
          <div className="blog-grid">
            {blogs.map((blog, index) => <a className="blog-card" href={blog.href} target="_blank" rel="noreferrer" key={blog.title} data-reveal><span>0{index + 1}</span><h3>{blog.title}</h3><p className="muted">{blog.detail}</p><strong>Read article <ArrowUpRight size={17} /></strong></a>)}
          </div>
        </div>
      </section>


      <footer className="footer">
        <div className="container footer-inner"><span>© 2026 Varad Kulkarni</span><div>{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</div><a href="#top">Back to top ↑</a></div>
      </footer>
      <div className="mobile-socials"><a href="https://github.com/varad-kulkarni172" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/varadnk/" aria-label="LinkedIn"><Linkedin size={18} /></a></div>
    </main>
  );
}
