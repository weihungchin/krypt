import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';
import { useState } from 'react';
import { navLinkItems } from '../utils/constants';
import { IconContainer } from '../globals/Globals';

const NavBarItem = ({ title, classProps, link }: { title: string, classProps?: string, link: string }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            <a href={link} target="_blank" aria-label={title}> {title}</a>
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
                {navLinkItems.map(
                    (item) => (
                        <NavBarItem key={item.title} title={item.title} link={item.link} />
                    )
                )}
            </ul>
            <div className="flex relative">

                {toggleMenu && (
                    <IconContainer className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} >
                        <AiOutlineClose size={28} />
                    </IconContainer>
                )}
                {!toggleMenu && (
                    <IconContainer className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}>
                        <HiMenuAlt4 size={28} />
                    </IconContainer>
                )}

                {toggleMenu && (
                    <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <IconContainer onClick={() => setToggleMenu(false)}>
                                <AiOutlineClose />
                            </IconContainer>
                        </li>
                        {navLinkItems.map(
                            (item) => (
                                <NavBarItem key={item.title} title={item.title} link={item.link} />
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
