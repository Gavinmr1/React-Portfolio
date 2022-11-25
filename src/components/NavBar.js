import { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { NavLink } from 'react-router-dom/dist'
import { SocialIcon } from 'react-social-icons'

export default function NavBar() {
    const [activeLink, setActiveLink] = useState('home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", onScroll)

        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value)
    }

    return (
        <StyledNavBar scroll={scrolled}>
            <NavWrapper>
                <Nav to='/' exact active={activeLink === 'home'} onClick={() => onUpdateActiveLink('home')}>
                    Gavin Riggs
                </Nav>
                <Nav to='/projects' active={activeLink === 'projects'} onClick={() => onUpdateActiveLink('projects')}>
                    Projects
                </Nav>
                <Nav to='/about' active={activeLink === 'about'} onClick={() => onUpdateActiveLink('about')}>
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
${({scrolled}) => scrolled ? tw`` : tw``}
`
const NavWrapper = tw.div`flex items-center gap-6`
const SocialWrapper = tw.div`flex items-center gap-6`

const Nav = styled(NavLink)`
    ${tw`text-white font-semibold text-lg py-2 px-4 hover:text-green-100 hover:bg-blue-900 hover:bg-opacity-30 rounded-lg 
    hover:shadow-lg tracking-widest transition-all ease-in-out duration-300`}
    ${({active}) => active && tw`bg-blue-900`}
`
const StyledSocialIcon = tw`h-12 w-12`