import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
      <div className="text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} LinkTree. Built with Next.js and
          Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
