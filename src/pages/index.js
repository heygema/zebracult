import { Suspense, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Canvas, useFrame } from "react-three-fiber";
import { useRouter } from "next/router";
import { Html, useGLTF, OrbitControls, Stars, useProgress } from "drei";
import { animated, useTransition } from "react-spring";

const superSlow = 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;

const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

const youtubeIds = [
  "5ESS_mAHHYU",
  "U2MCBAnpF2A",
  "rlNUZoy0Pgg",
  "WgqOczKdTjQ",
  "j1qzTlz2Moc",
  "xnfjQUJ83LY",
  "MOX3BQSW7_c"
];

const lastIndex = youtubeIds.length - 1;

function Model({ url }) {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

function Main({ router }) {
  const [inputState, setInputState] = useState("");
  const [showText, setShowText] = useState(false);
  const [worthy, setWorthy] = useState(false);

  const [x, setX] = useState(0);

  useFrame(() => {
    setX(x - 0.003);
  });

  const transitions = useTransition(showText, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const worthyTransition = useTransition(worthy, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (!showText) {
      setShowText(true);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const randomIndex = Math.round(Math.random() * lastIndex);
    if (inputState.toLowerCase().includes("you only live once")) {
      setWorthy(true);
      router.push(YOUTUBE_URL + youtubeIds[randomIndex]);
    } else {
      setWorthy(false);
    }
  }, [inputState]);

  const currentYear = new Date().getFullYear();

  const year = currentYear === 2020 ? currentYear : `2020-${currentYear}`;

  return (
    <>
      <OrbitControls
        autoRotate
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={superSlow}
        enableRotate={false}
        enableZoom={false}
      />
      <Suspense fallback={"Loading..."}>
        <mesh rotation={[-0.2, x, 0]} position={[0, 1.4, 0]}>
          <Model url="/zebra/scene.gltf" />
        </mesh>
      </Suspense>

      <Html fullscreen>
        <div className="container">
          <div className="phrase-container">
            {transitions.map(
              ({ item, key, props }) =>
                item && (
                  <animated.h2 key={key} props={props} className="phrase">
                    There's one Zebra, with stripes like a Xylophone.
                  </animated.h2>
                )
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputState}
              onChange={(e) => {
                e.preventDefault();
                setInputState(e.target.value);
              }}
            />
            {worthyTransition.map(
              ({ item, key, props }) =>
                item && (
                  <animated.h3 key={key} props={props}>
                    you are worthy. ☑️{" "}
                  </animated.h3>
                )
            )}
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
    </>
  );
}

function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zebra Cult</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://zebracult.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="There's one Zebra with stripes like a Xylophone"
        />
        <meta
          name="twitter:card"
          content="There's one Zebra with stripes like a Xylophone"
        />
        <meta
          property="og:description"
          content="There's one Zebra with stripes like a Xylophone"
        />
        <meta property="og:image" content="/preview.png" />
      </Head>

      <Canvas>
        <Main router={router} />
      </Canvas>
    </>
  );
}

export default Home;
