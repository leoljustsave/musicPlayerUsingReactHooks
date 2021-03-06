import styled from "styled-components";

export const SongListContent = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .list-wrap {
    padding-bottom: 10px;
  }
`;

export const ListItem = styled.div`
  height: 62px;
  box-sizing: border-box;
  color: #333;
  font-size: 14px;
  padding: 11px;
  box-sizing: border-box;
  transition: all 0.1s linear;
  cursor: pointer;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  /* TODO: 实现方式还是有点缺陷 */
  &:hover,
  &.playing {
    padding: 5.5px 10px;
    border: 1px solid #333;
    border-bottom: 10px solid #333;
    border-right: 10px solid #333;
    box-sizing: border-box;
    margin: 0 10px;
    clip-path: polygon(
      0 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% 100%,
      10px 100%,
      0 calc(100% - 10px)
    );

    .order {
      margin-left: 0;
    }
  }

  &.playing {
    border-color: rgb(0, 108, 255);
  }

  .order {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: #333a;
  }
`;
