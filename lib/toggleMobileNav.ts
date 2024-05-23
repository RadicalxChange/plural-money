export default function toggleMobileNav() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuButton = document.getElementById('menu-button-image') as HTMLImageElement;
    if (mobileNav && menuButton) {
      if (mobileNav.classList.contains('hidden')) {
          mobileNav.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          menuButton.src = "/close-menu.svg"
      } else {
          mobileNav.classList.add('hidden');
          document.body.style.overflow = 'auto';
          menuButton.src = "/hamburger-menu.svg"
      }
    }
}