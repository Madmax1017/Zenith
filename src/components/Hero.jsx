import React, {useEffect, useRef, useState} from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
   
    "videos/hero-2.mp4",
    "videos/hero-3.mp4",
    "videos/hero-4.mp4",
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasClicked, setHasClicked] = useState(false);


    const nextVideoRef = useRef(null);
    const mainVideoRef = useRef(null);
    const totalVideos = 3;


    const nextIndex = (currentIndex + 1) % videos.length;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(nextIndex);
    };


    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", { visibility: "visible" });

            gsap.to("#next-video", {
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power2.inOut",
                onStart: () => nextVideoRef.current.play(),
            });

            gsap.from("#current-video", {
                scale: 0,
                duration: 1.2,
                ease: "power2.inOut",
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP( () => {
        gsap.set('#video-frame',{
            clipPath: 'polygon(14% 0%,72% 0%, 90% 90%, 0% 100%)',
            borderRadius : '0 0 40% 10%'
        })
        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)',
            borderRadius : '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })

    return (
        
        <div className="relative h-dvh w-screen overflow-x-hidden ">

            {/* ================= VIDEO FRAME (CLIPPED CONTAINER) ================= */}
            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                {/* Mini preview */}
                <div className="mask-clip-path absolute left-1/2 top-1/2 z-50 size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-lg">
                    <div
                        onClick={handleMiniVideoClick}
                        className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                    >
                        <video
                            id="current-video"
                            key={nextIndex}
                            src={videos[nextIndex]}
                            loop
                            muted
                            preload="metadata"
                            className="size-64 scale-150 object-cover"
                        />
                    </div>
                </div>

                {/* Expanding next video */}
                <video
                    ref={nextVideoRef}
                    id="next-video"
                    key={`next-${nextIndex}`}
                    src={videos[nextIndex]}
                    loop
                    muted
                    preload="metadata"
                    className="invisible absolute left-1/2 top-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 object-cover"
                />

                {/* Main background video */}
                <video
                    ref={mainVideoRef}
                    key={currentIndex}
                    src={videos[currentIndex]}
                    autoPlay
                    loop
                    muted
                    className="absolute left-0 top-0 size-full object-cover"
                />

                {/* ================= CLIPPED TEXT (INSIDE FRAME) ================= */}
                <h1
                    id="hero-title"
                    className="special-font uppercase font-zentry font-black
          text-3xl sm:text-5xl md:text-7xl lg:text-[9rem]
          absolute bottom-5 right-5 z-40 text-blue-100 whitespace-nowrap"
                >
                    <b>Gaming</b>
                </h1>
            </div>

            {/* ================= OVERLAY CONTENT ================= */}
            <div className="absolute left-0 top-0 z-40 size-full pointer-events-none">
                <div className="mt-24 px-5 sm:px-10 pointer-events-auto">
                    <h1 className="special-font uppercase font-zentry font-black
          text-3xl sm:text-5xl md:text-7xl lg:text-[9rem] text-blue-100">
                        <b>Redifine</b>
                    </h1>

                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                        Enter the Metagame layer<br />
                        Unleash the Play Economy
                    </p>

                    <Button
                        id="watch-trailer"
                        title="Watch Trailer"
                        leftIcon={<TiLocationArrow />}
                        containerClass="bg-yellow-300 flex items-center gap-2 pointer-events-auto"
                    />
                </div>
            </div>
            <h1
                id="hero-title"
                className="special-font uppercase font-zentry font-black
          text-3xl sm:text-5xl md:text-7xl lg:text-[9rem]
          absolute bottom-5 right-5  text-black whitespace-nowrap"
            >
                <b>Gaming</b>
            </h1>

        </div>
    );
};

export default Hero;
