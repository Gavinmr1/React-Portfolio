import React from 'react'
import tw from 'twin.macro'

export default function Home() {
    return (
        <StyledHomeContainer>
            <h1>Home Page</h1>
        </StyledHomeContainer>
    
    )
}

const StyledHomeContainer = tw.div`w-full h-full bg-blue-100`