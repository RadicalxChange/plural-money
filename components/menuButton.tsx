"use client"
// Interactivity:
// - Hamburger menu button toggles mobileNav open/close

import Image from 'next/image'
import toggleMobileNav from '@/lib/toggleMobileNav';

export default function MenuButton() {
    
    return (
        <button onClick={toggleMobileNav} className="lg:hidden py-2">
            <Image id="menu-button-image" src="/hamburger-menu.svg" alt="menu" width="32" height="32" />
        </button>
    );
}