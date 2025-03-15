import Link from 'next/link';

export default function Footer() {
    return (
    <>


<footer className="bg-white rounded-lg m-4 bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
    <span className="text-sm text-black sm:text-center dark:text-black">© 2025 <a className="hover:underline hover:text-red-500 hover:cursor-pointer">MediCore™</a>. All Rights Reserved.
    </span>
    </div>
</footer>

    </>
    );
}