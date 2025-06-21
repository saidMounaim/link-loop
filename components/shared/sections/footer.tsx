import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
      <div className="text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} LinkTree. Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <Link href="https://mounaim.dev" target="_blank">
            Said Mounaim
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
