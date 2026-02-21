import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { type Container, type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        resize: { enable: true },
                    },
                    modes: { grab: { distance: 150, links: { opacity: 0.5 } } },
                },
                particles: {
                    color: { value: "#3b82f6" },
                    links: {
                        color: "#3b82f6",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        outModes: { default: "bounce" },
                        speed: 1,
                    },
                    number: {
                        density: { enable: true, width: 800, height: 800 },
                        value: 80,
                    },
                    opacity: { value: 0.3 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-0 pointer-events-auto"
        />
    );
};

export default ParticleBackground;
