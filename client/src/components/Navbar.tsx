import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';
import { useState } from 'react';

const NavBarItem = ({ title, classProps }: { title: string, classProps?: string }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="flex-initial justify-center items-center md:flex-[0.5]">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white hidden md:flex flex-row list-none justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map(
                    (item, index) => (
                        <NavBarItem key={item + index} title={item} />
                    )
                )}

                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    {toggleMenu.toString()}
                </li>
            </ul>
            <div className="flex relative">

                {toggleMenu ? <AiOutlineClose size={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 size={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />}

                {toggleMenu && (
                    <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map(
                            (item, index) => (
                                <NavBarItem key={item + index} title={item} classProps="text-lg my-lg" />
                            )
                        )}
                    </ul>
                )

                }
            </div>
        </nav>
    )
}

export default Navbar
