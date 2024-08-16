import React, { useEffect, useState } from 'react';

const Navbar = () => {

    const navItems = (
        <>
            <li className='font-semibold'><a href='/sendfile'>SEND FILE</a></li>
            <li className='font-semibold'>
                <details>
                    <summary>EDIT IMAGE</summary>
                    <ul className="bg-base-100 w-48 rounded-t-none p-2  dark:bg-slate-900 dark:text-white">
                        <li><a href='/compressimg'>COMPRESS IMAGE</a></li>
                        <li><a href='/resizeimg'>RESIZE IMAGE</a></li>
                        <li><a href='/cropimage'>CROP IMAGE</a></li>


                    </ul>
                </details>
            </li>

            <li className='font-semibold'><a href='/rotateimage'>ROTATE IMAGE</a></li>

            <li className='font-semibold'>
                <details>
                    <summary>CONVERT PHOTOS</summary>
                    <ul className="bg-base-100 w-48 rounded-t-none p-2  dark:bg-slate-900 dark:text-white">
                        <li><a href='/img2pdf'>IMAGE to PDF</a></li>
                        <li><a href='/jpg2png'>JPG to PNG</a></li>
                        <li><a href='/png2jpg'>PNG to JPG</a></li>
                        <li><a href='/png2gif'>PNG to GIF</a></li>
                        <li><a href='/blackwhiteimage'>BLACK & WHITE</a></li>


                    </ul>
                </details>
            </li>
            <li className='font-semibold'><a href='/'>TOOLS</a></li>
        </>
    );

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-none dark:text-white z-50 fixed top-0 left-0 sticky-navbar shadow-md bg-base-100'>
            <div className="navbar">
                <div className="navbar-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56 dark:bg-slate-900 dark:text-white">
                            {navItems}
                        </ul>
                    </div>
                    <a href='/' className="flex items-center justify-center text-3xl font-bold text-black-500 cursor-pointer">
                        I <span className='text-4xl mx-1 text-blue-500'>♥️</span> IMG
                    </a>

                </div>
                <div className="navbar-center hidden lg:flex space-x-4">
                    <ul className="menu menu-horizontal px-5">
                        {navItems}
                    </ul>
                </div>
                <div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;

