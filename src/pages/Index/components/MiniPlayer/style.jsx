import styled from "styled-components";

export const MiniPlayerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .control-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;

export const PlayerCycleControl = styled.input.attrs((props) => ({
  type: "button",
}))`
  appearance: none;
  background-color: unset;
  border: unset;
`;

export const PlayerStateControl = styled.div`
  flex: 1;

  .btn {
    appearance: none;
    background-color: unset;
    border: unset;
  }
`;

export const MusicProgressContent = styled.div`
  width: 80%;
`;
