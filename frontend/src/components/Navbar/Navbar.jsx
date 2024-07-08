import React, { useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLinks />
          </div>
          <HamburgerButton onClick={toggleMobileMenu} />
        </div>
      </div>
      {isMobileMenuVisible && <MobileMenu />}
    </nav>
  );
}

export default Navbar;
