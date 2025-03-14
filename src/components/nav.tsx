import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <nav id="header" className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-red-400 mb-5">
        <div className="w-full flex items-centre justify-between mt-0 px-6 py-2">
          <label className="cursor-pointer md:hidden block">
            <svg className="fill-current text-red-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />
          <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
              <ul className="md:flex items-center justify-between text-base text-black-600 pt-4 md:pt-0">
                <li>
                  <Link href="/" className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div className="auth flex items-center w-full md:w-full">
              <Link
                href="/login"
                className="bg-transparent text-gray-800 p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="bg-red-600 text-gray-200 p-2 rounded hover:bg-red-700 hover:text-gray-100"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}