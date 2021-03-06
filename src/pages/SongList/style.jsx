import styled from "styled-components";

export const SongListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const CoverList = styled.div`
  flex: 0 0 200px;
  width: 100%;
  padding-left: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  .swiper-container {
    height: 200px;

    .swiper-slide {
      background-color: rgba();
      width: 270px;
      border-radius: 22px;
      overflow: hidden;
      transform: scale(0.9);
      transform-origin: bottom;
      transition: transform 0.1s linear;

      &-active {
        transform: scale(1);
        border-radius: 20px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #eee;
      }
    }
  }
`;

export const List = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .list-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    padding-bottom: 10px;
  }
`;

export const ListItem = styled.div`
  height: 42px;
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
  }

  &.playing {
    border-color: rgb(0, 108, 255);
  }
`;
