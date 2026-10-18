import { useEffect, useRef } from "react";

function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene;
    let isCancelled = false;

    // Dynamic import keeps three.js in a separate chunk, loaded after the hero text.
    import("./warpScene").then(({ createWarpScene }) => {
      if (isCancelled) {
        return;
      }

      scene = createWarpScene(canvasRef.current);
    });

    return () => {
      isCancelled = true;
      scene?.dispose();
    };
  }, []);

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default HeroBackground;
