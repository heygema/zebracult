import { Suspense, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Canvas, useFrame } from "react-three-fiber";
import { useRouter } from "next/router";
import { Html, useGLTF, OrbitControls, Stars } from "drei";
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
  "MOX3BQSW7_c",
  "YNZ0yrIjBEI", // thirtheen
  "MZSYt6SkMng",
  "mk4yjnRPqRU",
  "TUVxsj-Epyg",
  "X4NA3lWzIKI",
  "Ocl4W0mW5Lw", // eight
  "FkqH78ZpQmk", // seven
  "NL7oljCKXfU", // LNS #2
  "EL6XuG9LEsQ", // LNS #1 the OG LNS
  "-D2OeIEa3cw" // Shui (Live Version)
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
        </div>
      </Html>
      <Stars />
    </>
  );
}

function Home() {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const year = currentYear === 2020 ? currentYear : `2020-${currentYear}`;

  console.log(`
      author: Gema.
      twitter: @heygema
      ---
      Looking for answer?
      The Answer is:
      You only live once`);
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

        <meta
          name="twitter:title"
          content="There's one Zebra with stripes like a Xylophone"
        />
        <meta
          name="twitter:description"
          content="There's one Zebra with stripes like a Xylophone"
        />
        <meta name="twitter:image" content="/preview.png" />
      </Head>

      <Canvas>
        <Main router={router} />
      </Canvas>

      <footer>
        <span>{`© ${year} #zebracult.`}</span>
        <span>
          <a
            href="https://sketchfab.com/3d-models/3dinktober2019-pattern-be529d1484054f9cb02373c023a58f23"
            target="blank"
            rel="noopener"
          >
            Zebra figure by Manun
          </a>
          <a
            href="https://twitter.com/cosaoriginal"
            target="blank"
            rel="noopener"
          >
            (@cosaoriginal)
          </a>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="blank"
            rel="noopener"
          >
            -License CC 4.0
          </a>
        </span>
      </footer>
    </>
  );
}

export default Home;
