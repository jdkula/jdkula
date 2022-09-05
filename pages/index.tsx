import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Hello from '~/components/sections/01_hello.mdx';
import Skills from '~/components/sections/02_skills.mdx';
import Projects from '~/components/sections/03_projects.mdx';

import resumeYaml from '~/lib/resume.yaml';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Resume from '~/lib/generated/resume';

const resume: Resume = resumeYaml;

const Home: NextPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const onFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const values: Record<string, string> = {};
    e.currentTarget.querySelectorAll('input').forEach((e) => {
      values[e.name] = e.value;
    });

    try {
      const result = await fetch(
        'https://formsubmit.co/ajax/2db04eb86536bd39136243efa9c7b753',
        { method: 'POST' }
      );

      if (result.status !== 200) {
        throw Error('Bad status');
      }

      form.reset();
      toast('Submitted!', { type: 'success' });
    } catch (e) {
      console.warn(e);
      toast('An error occured while submitting your form.', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Jonathan Kula</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      {/* Header */}
      <section id="header">
        <header>
          <span className="image avatar">
            <Image src="/images/avatar.jpg" alt="" layout="fill" />
          </span>
          <h1 id="logo">
            <a href="#">{resume.basics.name}</a>
          </h1>
          <p>{resume.basics.summary}</p>
        </header>
        <nav id="nav">
          <ul>
            <li>
              <a href="#one" className="active">
                About
              </a>
            </li>
            <li>
              <a href="#two">Things I Can Do</a>
            </li>
            <li>
              <a href="#three">A Few Accomplishments</a>
            </li>
            <li>
              <a href="#four">Contact</a>
            </li>
            <li
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <a
                href="/generated/resume.html"
                data-skip="true"
                target="_blank"
                rel="noreferrer"
              >
                Resume <i className="icon solid fa-external-link"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a
                href="/generated/resume.pdf"
                data-skip="true"
                target="_blank"
                rel="noreferrer"
              >
                (PDF&nbsp;
                <i className="icon solid fa-external-link"></i>)
              </a>
            </li>
          </ul>
        </nav>
        <footer>
          <ul className="icons">
            {resume.basics.profiles.map((profile: any) => (
              <li key={profile.network}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`icon ${profile.icon ?? ''}`}
                >
                  <span className="label">{profile.network}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${resume.basics.email}`}
                className="icon solid fa-envelope"
              >
                <span className="label">Email</span>
              </a>
            </li>
          </ul>
        </footer>
      </section>

      {/* Wrapper */}
      <div id="wrapper">
        {/* Main */}
        <div id="main">
          {/* One */}
          <section id="one">
            <div className="image main" data-position="center">
              <Image src="/images/banner.jpg" alt="" layout="fill" />
            </div>
            <div className="container">
              <header className="major">
                <Hello resume={resume} />
              </header>
            </div>
          </section>

          {/* Two */}
          <section id="two">
            <div className="container">
              <Skills resume={resume} Z />
            </div>
          </section>

          {/* Three */}
          <section id="three">
            <div className="container">
              <Projects resume={resume} />
            </div>
          </section>

          {/* Four */}
          <section id="four">
            <div className="container">
              <h3>Contact Me</h3>
              <p>
                If you want to get in touch, feel free to send me an email here
              </p>
              <form method="post" action="#" onSubmit={onFormSubmit}>
                <div className="row gtr-uniform">
                  <div className="col-6 col-12-xsmall">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      disabled={submitting}
                    />
                  </div>
                  <div className="col-6 col-12-xsmall">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      disabled={submitting}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      disabled={submitting}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Message"
                      rows={6}
                      disabled={submitting}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <ul className="actions">
                      <li>
                        <input
                          type="submit"
                          className="primary"
                          value="Send Message"
                          disabled={submitting}
                        />
                      </li>
                      <li>
                        <input
                          type="reset"
                          value="Reset Form"
                          disabled={submitting}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>

        {/* Footer */}
        <section id="footer">
          <div className="container">
            <ul className="copyright">
              <li>&copy; Jonathan Kula 2022. All rights reserved.</li>
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Scripts */}
      <script defer src="assets/js/jquery.min.js"></script>
      <script defer src="assets/js/jquery.scrollex.min.js"></script>
      <script defer src="assets/js/jquery.scrolly.min.js"></script>
      <script defer src="assets/js/browser.min.js"></script>
      <script defer src="assets/js/breakpoints.min.js"></script>
      <script defer src="assets/js/util.js"></script>
      <script defer src="assets/js/main.js"></script>
    </>
  );
};

export default Home;
