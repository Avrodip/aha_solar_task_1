import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-2">
      <p>&copy; {new Date().getFullYear()} Aha!Solar</p>
    </footer>
  );
}

export default Footer;
