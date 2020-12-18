import { useState } from "react";
import Head from "next/head";
import { Canvas } from "react-three-fiber";
import { useRouter } from "next/router";
import { Html, useGLTF, OrbitControls, Stars, useProgress } from "drei";

const superSlow = 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;

function Model({ url }) {
  const gltf = useGLTF(url, true);
  return;
}

function Main() {
  const [inputState, setInputState] = useState("");

  const currentYear = new Date().getFullYear();

  const year = currentYear === 2020 ? currentYear : `2020-${currentYear}`;

  return (
    <Canvas>
      <OrbitControls
        enableDamping
        dampingFactor={0.0003}
        rotateSpeed={superSlow}
        autoRotate
        enableRotate={false}
        enableZoom={false}
      />

      <Html fullscreen>
        <div className="container">
          <div className="phrase-container">
            <h2 className="phrase">
              There's one Zebra, with stripes like a Xylophone.
            </h2>
            <input
              type="text"
              value={inputState}
              onChange={(e) => {
                e.preventDefault();
                setInputState(e.target.value);
              }}
            />
          </div>

          <footer>
            <span>{`© ${year} #zebracult.`}</span>
            <a href="https://sketchfab.com/crazymanuel" target="blank">
              Zebra figure by Manun
            </a>
          </footer>
        </div>
      </Html>
      <Stars />
    </Canvas>
  );
}

function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zebra Cult</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}

export default Home;
