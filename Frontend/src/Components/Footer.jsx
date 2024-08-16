import React from 'react'

function Footer() {
    return (
        <>
            <footer className="footer footer-center bg-white border-t p-10">
                <aside>
                    <a href='/' className="flex items-center justify-center text-3xl font-bold text-black-500 cursor-pointer">
                        I <span className='text-4xl mx-1 text-blue-500'>♥️</span> IMG
                    </a>
                    <p className="font-bold">
                        A FREE IMAGES EDITING WEBSITE.
                    </p>
                    <p> I<span className='mx-1 text-blue-500'>♥️</span>IMG Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>

            </footer>
        </>
    )
}

export default Footer