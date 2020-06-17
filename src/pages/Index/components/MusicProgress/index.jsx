import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { MusicProgressContent } from "./style";

const MusicProgress = (props) => {
  const duration = useSelector(({ player }) => player.duration);
  const currentTime = useSelector(({ player }) => player.currentTime);

  const [progress, setProgress] = useState(0);
  const [isDraging, setIsDraging] = useState(false);

  const progressRef = useRef();

  // 鼠标按下事件
  const handleMouseDownInProgress = ({ pageX }) => {
    const { offsetLeft, clientWidth } = progressRef.current;
    let startPosX = Number(pageX - offsetLeft).toFixed();
    setProgress((startPosX / clientWidth) * 100);
    setIsDraging(true);
  };

  // 鼠标按下后进行移动 计算进度 同步修改进度条
  const handleChangeAudioProgress = ({ pageX }) => {
    if (!isDraging) {
      return;
    }

    const { offsetLeft, clientWidth } = progressRef.current;
    let offsetX = pageX - offsetLeft;
    console.log(pageX - offsetLeft);
    let progress = offsetX / clientWidth;
    progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
    setProgress(Number(progress * 100).toFixed());
  };

  // 鼠标弹起事件 重置状态
  const handleMouseUpInProgress = (e) => {
    setIsDraging(false);

    let newCurrentTime = Number((duration * progress) / 100).toFixed();
  };

  // 未拖动状态下同步音频进度
  useEffect(() => {
    // 拖动过程中屏蔽 store 数据同步
    if (isDraging) {
      return;
    }

    // TODO: NaN 问题 ?
    let progress = Number((currentTime / duration) * 100).toFixed();
    setProgress(isNaN(progress) ? 0 : progress);
  }, [currentTime, duration]);

  return (
    <>
      <MusicProgressContent
        progress={progress}
        onMouseDown={handleMouseDownInProgress}
        onMouseMove={handleChangeAudioProgress}
        onMouseUp={handleMouseUpInProgress}
        isDraging={isDraging}
        ref={progressRef}
      >
        <div className="move-point"></div>
      </MusicProgressContent>
    </>
  );
};

export default MusicProgress;
