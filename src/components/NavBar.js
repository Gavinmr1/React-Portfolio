import React from 'react'
import tw, { styled } from 'twin.macro'
import { NavLink } from 'react-router-dom/dist'
import { SocialIcon } from 'react-social-icons'

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
            <SocialWrapper>
                <SocialIcon url='http://www.github.com./Gavinmr1' target='_blank' fill='#fff' />
                <SocialIcon url='http://www.linkedin.com/in/gavin-riggs-88b7421b5' target='_blank' fill='#fff' />
                <SocialIcon url='http://www.facebook.com/gavin.m.riggs' target='_blank' fill='#fff' />
            </SocialWrapper>
        </StyledNavBar>
    
    )
}

const StyledNavBar = styled.header`
${tw`absolute w-full bg-blue-900 border-b-2 border-white border-opacity-10 bg-opacity-30 backdrop-blur-[1px] px-10 py-6 flex justify-between mx-auto items-center`}
`
const NavWrapper = tw.div`flex items-center gap-6`
const SocialWrapper = tw.div`flex items-center gap-6`

const Nav = styled(NavLink)`
    ${tw`text-white font-semibold text-lg py-2 px-4 hover:text-green-100 hover:bg-blue-900 hover:bg-opacity-30 rounded-lg 
    hover:shadow-lg tracking-widest transition-all ease-in-out duration-300`}
    ${({isActive}) => isActive && tw`bg-blue-900`}
`
const StyledSocialIcon = tw`h-12 w-12`