import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HEIGHT = window.innerHeight;
const WIN_WIDTH = window.innerWidth;
const WRAP_WIDTH = 250;

const Wrapper = styled.div`
  position: fixed;
  animation: scaleAnim;
  animation-duration: 0.3s;
  left: ${({pX}) => pX}px;
  bottom: ${({pY}) => HEIGHT - pY + 15}px;
  width: ${WRAP_WIDTH}px;
  height: auto;
  max-height: 76px;
  z-index: 10;
  border-radius: 5px 5px 5px 0;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.1);
  background: ${({theme}) => theme.color.cornsilk};
`;
const TextContainer = styled.div`
  position: relative;
  max-height: 73px;
  overflow: hidden;
  z-index: 1;
`;
const TopicTitle = styled.h4`
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  color: ${({theme}) => theme.color.black};
  padding: 4px 10px 3px 10px;
  margin: 0;
`;

const TopicDescription = styled.p`
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.color.darkgray};
  padding: 0 10px 6px 10px;
  margin: 0;
`;

const Triangle = styled.div`
  width: 16px;
  height: 16px;
  animation: triangleAnim;
  animation-delay: 0.3s;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  position: absolute;
  left: ${({pX}) => pX}px;
  bottom: -7px;
  transform: rotate(45deg);
  background: ${({theme}) => theme.color.cornsilk};
`;

const ToolTip = ({title, description, pX, pY, theme}) => {
	let left = (pX + (((WIN_WIDTH / 2) - pX) / 3.5)) - (WRAP_WIDTH / 2);
	let triangleLeft = Math.min(-(((WIN_WIDTH / 2) - pX) / 3.5) + ((WRAP_WIDTH - 16) / 2), 230);
	triangleLeft = Math.max(triangleLeft, 5);
  return (
    <Wrapper onClick={(e) => e.stopPropagation()} pX={left} pY={pY}>
      <TextContainer>
        <TopicTitle>
          {title}
        </TopicTitle>
        <TopicDescription>
          {description}
        </TopicDescription>
      </TextContainer>
      <Triangle pX={triangleLeft}/>
    </Wrapper>
  )
};


export default ToolTip;