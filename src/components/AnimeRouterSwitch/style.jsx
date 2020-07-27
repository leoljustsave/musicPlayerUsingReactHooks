import styled from "styled-components";

export const RouterContainer = styled.div`
  .fade-enter,
  .fade-appear {
    opacity: 0;
  }

  .fade-enter.fade-enter-active,
  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
  }
`;
