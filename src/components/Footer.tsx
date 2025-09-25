import Link from "next/link";

export const Footer = () => (
  <footer className="footer footer-center p-6 bg-base-200 text-base-content border-t border-base-300">
    <div className="max-w-4xl mx-auto space-y-3">
      <p className="text-sm leading-relaxed">
        All trademarks, logos, and intellectual property featured on this
        website are the exclusive property of{" "}
        <Link
          className="link link-primary font-medium hover:link-accent transition-colors duration-200"
          href="https://www.rockstargames.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rockstar Games
        </Link>
        .
      </p>
      <div className="divider divider-horizontal opacity-30"></div>
      <p className="text-sm text-base-content/70">
        © {new Date().getFullYear()} | Developed by{" "}
        <Link
          className="link link-primary font-medium hover:link-accent transition-colors duration-200"
          href="https://github.com/shimizudev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shimizudev
        </Link>
      </p>
    </div>
  </footer>
);
