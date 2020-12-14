import React, { Fragment, useEffect, useState } from "react"
import * as THREE from 'three/src/Three.js';

import './styles/layout.scss';
import Contact from "./components/contact"
import About from "./components/about"
import Work from "./components/work"
import yellowIcon from './images/FFFF00-logo.svg';
import blueIcon from './images/00FFFF-logo.svg';
import pinkIcon from './images/FF00FF-logo.svg';
import twitter from './images/twitter.svg';
import linkedIn from './images/linkedIn.svg';
import github from './images/github.svg';
import codepen from './images/codepen.svg';

const IndexPage = () => {
  useEffect(() => {
    let container;
    let camera, scene, renderer;
    let dodecahedron;

    const render = () => {
      renderer.render(scene, camera);
    };

    const init = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.set(0, 0, 100);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xebeae9);
      const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      const radius = window.innerHeight * .035;
      const detail = 1;
      material.transparent = true;
      material.opacity = .2;
      const geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
      dodecahedron = new THREE.Line(geometry, material);
      scene.add(dodecahedron);

      container = document.createElement('div');
      container.setAttribute('id', 'three-js-container');
      document.getElementById('root').prepend(container);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      render();
    }
    init();

    const lerp = (min, max, t) => min * (1 - t) + max * t;
    const previous = {
      x: 0,
      y: 0
    }
    const target = {
      x: 0,
      y: 0
    }

    const onMouseMove = (event) => {
      target.x = event && event.screenX / 500;
      target.y = event && event.screenY / 500;
    }

    window.addEventListener("mousemove", onMouseMove, 300);
    const animate = () => {
      if (window.scrollY <= 200) {
        const position = { x : 0, y: 0 };
        const targetPosition = { x : 0, y: 0 };
        position.x = lerp(dodecahedron.position.x, targetPosition.x, .07)
        position.y = lerp(dodecahedron.position.y, targetPosition.y, .07)
        dodecahedron.position.x = position.x;
        dodecahedron.position.y = position.y;

        let scale = 0;
        const targetScale = 1;
        scale = lerp(dodecahedron.scale.x, targetScale, .07);
        dodecahedron.scale.set(scale, scale, scale);

      } else {
        const position = { x : 0, y: 0 };
        const targetPosition = { x : 40, y: 0 };
        position.x = lerp(dodecahedron.position.x, targetPosition.x, .07)
        position.y = lerp(dodecahedron.position.y, targetPosition.y, .07)
        dodecahedron.position.x = position.x;
        dodecahedron.position.y = position.y;

        let scale = 0;
        const targetScale = .5;
        scale = lerp(dodecahedron.scale.x, targetScale, .07);
        dodecahedron.scale.set(scale, scale, scale);
      }
      previous.x = lerp(previous.x, target.x, .05)
      previous.y = lerp(previous.y, target.y, .05)

      dodecahedron.rotation.z = previous.x
      dodecahedron.rotation.x = previous.y

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);
    const textWrapper = document.querySelector('.text');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline()
      .add({
        targets: '.text .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 600 + 50 * i
      });
    }, []);

  const [visible, setVisible] = useState('');
  setTimeout(() => {
    setVisible('visible');
  }, 400);
  return (
    <Fragment>
      <div className={ `content-container ${visible}` }>
        <Fragment>
      <div className="nav">
        <a id="home-link" href="/">
          <img className="app-icon" id="yellow-icon" src={yellowIcon} alt="Juliette Icon" />
          <img className="app-icon" id="blue-icon" src={blueIcon} alt="Juliette Icon" />
          <img className="app-icon" id="pink-icon" src={pinkIcon} alt="Juliette Icon" />
        </a>
        <a className="nav-link" href="#about">
          About
        </a>
        <a className="nav-link" href="#work">
          Work
        </a>
        <a className="nav-link" href="#contact">
          Contact
        </a>
        <div className="header-contact">
          <a
            href="https://twitter.com/julietteabeyta"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="link-new-window"
          >
            <img src={twitter} alt="Black Twitter bird logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/juliette-abeyta-90b761162/"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="link-new-window"
          >
            <img src={linkedIn} alt="Black LinkedIn Logo" />
          </a>
          <a
            href="https://github.com/julietteabeyta"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="link-new-window"
          >
            <img src={github} alt="Black GitHub octocat logo" />
          </a>
          <a
            href="https://codepen.io/julietteabeyta"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="link-new-window"
          >
            <img src={codepen} alt="Black CodePen logo" />
          </a>
        </div>
      </div>
      <div className="content-body home">
        <div className="subsections">
          <div id="about" className="subsection about">
            <h1 className="text">Quick Wit <br/> True Grit</h1>
            <About />
          </div>
          <div id="work" className="subsection work">
            <h2>Things I've Made</h2>
            <Work />
          </div>
          <div id="contact" className="subsection contact">
            <h2>Get In Touch</h2>
            <Contact />
          </div>
        </div>
      </div>
    </Fragment>
    </div>
    </Fragment>
  )
}
export default IndexPage
