"use client"
// interactivity:
// - close mobileNav when a link is clicked

import toggleMobileNav from "@/lib/toggleMobileNav";
import Link from "next/link";
import styles from "@/styles/mobileNav.module.css"

export default function MobileNavButton({
    text,
    href
  }: {
    text: string,
    href: string
  }) {

  return (
    <button onClick={toggleMobileNav} className="w-full">
        <Link href={href} className={styles.navLink}>{text}</Link>
    </button>
  );
}