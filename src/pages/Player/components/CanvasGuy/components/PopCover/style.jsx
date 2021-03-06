import styled, { keyframes } from "styled-components";

const DiskRotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const PopCoverContent = styled.div.attrs(({ range }) => ({
  style: {
    zoom: range,
  },
}))`
  width: 120px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${DiskRotate} 30s linear infinite;

  .cover {
    width: 100%;
    height: 100%;
    background-image: url(${({ bg }) => bg});
    background-size: contain;
    border-radius: 50%;
    background-repeat: no-repeat;
  }
`;
