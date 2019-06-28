import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  position: absolute;
  left: -4px;
  bottom: 30px;
  width: 250px;
  height: auto;
  max-height: 76px;
  z-index: 10;
  border-radius: 5px 5px 5px 0;
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
  position: absolute;
  left: 4px;
  bottom: -7px;
  transform: rotate(45deg);
  background: ${({theme}) => theme.color.cornsilk};
`;

const ToolTip = ({task}) => {
  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <TextContainer>
        <TopicTitle>
          {task.title}
        </TopicTitle>
        <TopicDescription>
          {task.description}
        </TopicDescription>
      </TextContainer>
      <Triangle/>
    </Wrapper>
  )
};

ToolTip.propTypes = {
  task: PropTypes.object.isRequired
};

export default ToolTip;