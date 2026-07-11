import { useEffect, useRef } from "react";

export default function SplashScreen({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => console.log(err));
    }

    const timer = setTimeout(() => {
      onFinish();
    }, 9000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src="/cam-shutter-logo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}