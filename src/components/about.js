import React from "react";

export default function About() {
  return (
    <div className="about section" >
      <div className="about-text">
        <div>
          <p>
          Juliette is a full-stack developer based in Los Angeles. Currently working on a multidisciplinary team of engineering at{' '}
            <a
              href="https://evgo.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="link-new-window"
            >
              <b>EVgo</b>
            </a>
          . Works with various technologies and languages; specializes in JavaScript and has a passion for writing scalable, modular applications.
        </p>
        </div>
      </div>
      <span id="link-new-window" hidden>
        Opens in a new window
      </span>
    </div >
  )
}
