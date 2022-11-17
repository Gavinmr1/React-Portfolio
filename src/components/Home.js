import React from "react";
import tw, { styled } from "twin.macro";
import SpaceBG from "../assets/images/space-bg.png";
import EarthPanoBG from "../assets/images/earth-pano.png";

export default function Home() {
  return (
    <StyledHomeContainer SpaceBG={SpaceBG}>
      <h1>Home Page</h1>
      <EarthBG EarthPanoBG={EarthPanoBG}></EarthBG>
    </StyledHomeContainer>
  );
}

const StyledHomeContainer = styled.div`
  ${tw`w-full h-full bg-black bg-repeat-x`}
  background-image:		
        url(${({ SpaceBG }) => SpaceBG}),
		url(${({ SpaceBG }) => SpaceBG}),
		url(${({ SpaceBG }) => SpaceBG});
  background-position: 0 50%, 0 0%, 0 0;
  background-size: 500px 500px, 500px 500px, 400px 400px;
  animation: 150s para infinite linear;

  @keyframes para {
    100% {
      background-position: 100% 100%, 300px 0;
    }
  }
`;
const EarthBG = styled.div`
  ${tw`absolute bottom-0 w-full h-[250px] bg-repeat-x`}
  background: url(${({ EarthPanoBG }) => EarthPanoBG}), linear-gradient(transparent 10%, blue 90%);
  background-position: 0 100%;
  background-size: 150% 250px;
  animation: 150s para2 infinite linear;

  @keyframes para2 {
    100% {
      background-position: -300px 100%;
    }
  }
`;
