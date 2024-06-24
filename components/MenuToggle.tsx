"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { Plus, Twitter, Facebook } from 'lucide-react';

const MenuToggle: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);

  const toggleMenu = () => {
    if (menuRef.current) {
      const isOpen = menuRef.current.classList.contains('open');
      if (isOpen) {
        gsap.to(menuItemsRef.current, {
          duration: 0.4,
          stagger: 0.1,
          x: 0,
          y: 0,
          opacity: 0,
        });
      } else {
        gsap.to(menuItemsRef.current, {
          duration: 0.4,
          stagger: 0.1,
          x: (index: number) => 4.25 * Math.cos((index * Math.PI) / 4),
          y: (index: number) => -4.25 * Math.sin((index * Math.PI) / 4),
          opacity: 1,
        });
      }
      menuRef.current.classList.toggle('open');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div
        className="w-16 h-16 bg-green-400 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50"
        onClick={toggleMenu}
      >
        <Plus className={`text-white transform transition-transform ${menuRef.current?.classList.contains('open') ? 'rotate-45' : 'rotate-0'}`} size={32} />
      </div>

      <div className="absolute bottom-0 right-0" ref={menuRef}>
        <div
          className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mb-2 opacity-0"
          ref={(el) => {
            if (el) menuItemsRef.current[0] = el;
          }}
        >
          <Twitter className="text-white" size={24} />
        </div>
        <div
          className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mb-2 opacity-0"
          ref={(el) => {
            if (el) menuItemsRef.current[1] = el;
          }}
        >
          <Facebook className="text-white" size={24} />
        </div>
        {/* <div
          className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mb-2 opacity-0"
          ref={(el) => {
            if (el) menuItemsRef.current[2] = el;
          }}
        >
          <Wikipedia className="text-white" size={24} />
        </div> */}
      </div>
    </div>
  );
};

export default MenuToggle;
