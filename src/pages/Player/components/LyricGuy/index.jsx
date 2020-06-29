import React, { useEffect, useState, useRef } from "react";
import { LyricGuyContent, LyricBox, LyricItem } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetLyricForThisSong,
  handleSetMediaChangeCurrentTime,
} from "@r/player/action";

const LyricGuy = ({ songId }) => {
  const dispatch = useDispatch();

  const currentTime = useSelector(({ player }) => player.currentTime);
  const lyricForThisSong = useSelector(({ player }) => player.lyricForThisSong);
  const changeCurrentTime = useSelector(
    ({ player }) => player.changeCurrentTime
  );

  // 歌词移动相关 config
  const [activeIndex, setActiveIndex] = useState(0);
  const [lyricMovePos, setLyricMovePos] = useState(0);
  const [lyricMovePosRecord, setLyricMovePosRecord] = useState([]);

  const lyricRef = useRef();
  const activeLyricRef = useRef();

  // 歌词节点变更
  useEffect(() => {
    // 判断是否还有下一句歌词
    if (!lyricForThisSong[activeIndex + 1]) {
      return;
    }

    if (changeCurrentTime && +changeCurrentTime < Math.floor(currentTime)) {
      dispatch(handleSetMediaChangeCurrentTime(0));
      let mark = 0;
      let movePos = 0;
      let moveRecord = [];

      lyricForThisSong.forEach((item) => {
        if (item.time < changeCurrentTime) {
          mark++;
        }
      });

      // 获取当前步数记录 & 应移动距离
      moveRecord = lyricMovePosRecord.slice(0, mark);
      movePos = moveRecord.reduce((pre, cur) => pre + cur);

      setActiveIndex(mark);
      setLyricMovePos(lyricRef.current.offsetHeight / 2 - movePos);
      setLyricMovePosRecord([...moveRecord]);
    }

    // 进行歌词移动
    if (currentTime > lyricForThisSong[activeIndex + 1].time) {
      const {
        current: { offsetHeight },
      } = activeLyricRef;
      setActiveIndex(activeIndex + 1);

      if (activeIndex + 1 > lyricMovePosRecord.length) {
        setLyricMovePosRecord([...lyricMovePosRecord, offsetHeight + 20]);
      }

      setLyricMovePos(lyricMovePos - offsetHeight - 20);
    }
  }, [activeIndex, currentTime, lyricForThisSong, lyricMovePos]);

  // 获取歌词信息
  useEffect(() => {
    if (songId) {
      dispatch(handleSetLyricForThisSong(songId));
    }
  }, [dispatch, songId]);

  // 初始化位置
  useEffect(() => {
    setLyricMovePos(lyricRef.current.offsetHeight / 2);
    setActiveIndex(0);
  }, [lyricForThisSong]);

  return (
    <LyricGuyContent ref={lyricRef}>
      <div className="mask"></div>
      <LyricBox pos={lyricMovePos}>
        {lyricForThisSong.map(({ content }, index) =>
          activeIndex === index ? (
            <LyricItem key={index} className="active" ref={activeLyricRef}>
              {content}
            </LyricItem>
          ) : (
            <LyricItem key={index}>{content}</LyricItem>
          )
        )}
      </LyricBox>
    </LyricGuyContent>
  );
};

export default LyricGuy;
