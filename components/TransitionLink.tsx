"use client"
import { animatePageOut } from "@/utils/animations"
import { usePathname, useRouter } from "next/navigation"


interface Props {
    href: string;
    label: string;
    children?: React.ReactNode; // Allow children of any type
  }

const TransitionLink: React.FC<Props> = ({ href, label, children }) => {
    const router = useRouter();
    const pathname = usePathname();
  
    const handleClick = () => {
      if (pathname !== href) {
        animatePageOut(href, router);
      }
    };
  
    return (
      <div
        className="text-xl text-neutral-900 hover:text-neutral-700"
        onClick={handleClick}
      >
       
        {children} {/* Render children if provided */}
      </div>
    );
  };
  
  export default TransitionLink;