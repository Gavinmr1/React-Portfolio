import React from 'react'
import tw, { styled } from 'twin.macro'
import { NavLink } from 'react-router-dom/dist'

export default function NavBar() {
    return (
        <StyledNavBar>
            <NavWrapper>
                <Nav to='/' exact className={({ isActive }) => (isActive && "bg-green=500")}>
                    Gavin Riggs
                </Nav>
                <Nav to='/post' className={({ isActive }) => (isActive && "bg-green=500")}>
                    Blog Posts
                </Nav>
                <Nav to='/project' className={({ isActive }) => (isActive && "bg-green=500")}>
                    Projects
                </Nav>
                <Nav to='/about' className={({ isActive }) => (isActive && "bg-green=500")}>
                    About Me!
                </Nav>
            </NavWrapper>
        </StyledNavBar>
    
    )
}

const StyledNavBar = tw.header`w-full h-full bg-green-700 p-10 flex justify-between mx-auto items-center`
const NavWrapper = tw.div`flex items-center gap-6`
const Nav = styled(NavLink)`
${tw`text-white font-semibold text-lg py-2 px-4 hover:text-green-100 hover:bg-green-500 rounded-lg 
hover:shadow-lg tracking-widest transition-all ease-in-out duration-300`}
${({isActive}) => isActive && tw`bg-green-600`}
`