'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FloatingDock } from "./ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconCode,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/socials', label: 'Socials' }
];

const socialLinks = [
  { 
    href: 'https://github.com/vipulshetty',
    label: 'GitHub',
    icon: IconBrandGithub
  },
  { 
    href: 'https://www.linkedin.com/in/vipul-shetty-49a1a9251/',
    label: 'LinkedIn',
    icon: IconBrandLinkedin
  },
  { 
    href: 'mailto:vipulshetty918@gmail.com',
    label: 'Email',
    icon: IconMail
  }
];

const dockItems = [
  {
    title: "Home",
    href: "/",
    icon: <IconHome className="h-full w-full" />,
  },
  {
    title: "Skills",
    href: "/skills",
    icon: <IconCode className="h-full w-full" />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <IconUser className="h-full w-full" />,
  },
  {
    title: "Socials",
    href: "/socials",
    icon: <IconBrandGithub className="h-full w-full" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/5"
      >
        <nav className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="relative group">
              <motion.span 
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C63FF] to-[#4c45cc] group-hover:from-[#4c45cc] group-hover:to-[#6C63FF]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                VS
              </motion.span>
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#6C63FF20] to-[#4c45cc20] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
              />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/5 rounded-lg"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Only show floating dock on mobile */}
      <FloatingDock
        items={dockItems}
        desktopClassName="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="md:hidden fixed bottom-4 right-4 z-50"
      />
    </>
  );
}
