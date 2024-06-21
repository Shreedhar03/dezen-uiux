import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface AnimateOnRouteChangeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const AnimateOnRouteChange: React.FC<AnimateOnRouteChangeProps> = ({ children, className, style }) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Exit Animation
      gsap.to(".page-container", { opacity: 0, duration: 0.5, ease: "power3.inOut" });

      // New Page Entry Animation
      gsap.fromTo(".page-container", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power3.inOut", delay: 0.5 });
    };

    // Handle initial animation
    if (pathname !== "/") {
      handleRouteChange(pathname);
    }

    // Listen for route changes
    // const removeListener = router.events.on("routeChangeStart", handleRouteChange);

    return () => {
    //   removeListener();
    };
  }, [pathname]);

  return (
    <div className={`page-container ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
};

export default AnimateOnRouteChange;
