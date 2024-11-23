const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-4 text-base">
      <div className="md:grid md:grid-cols-1 md:grid-cols-3 gap-4 items-center flex justify-around">
        {/* Left Section: Logo or Brand Info */}
        <aside className="flex items-center justify-center md:justify-start">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432..."></path>
          </svg>
          <p className="ml-2">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>

        {/* Center Section: Social Links */}
        <nav className="flex justify-center gap-4 md:justify-center">
          <a href="#" className="hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828..."></path>
            </svg>
          </a>
          <a href="#" className="hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246..."></path>
            </svg>
          </a>
          <a href="#" className="hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5..."></path>
            </svg>
          </a>
        </nav>

        {/* Right Section: Additional Links or Info */}
        <div className="hidden md:block text-center">
          <p>Some other info or links can go here.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
