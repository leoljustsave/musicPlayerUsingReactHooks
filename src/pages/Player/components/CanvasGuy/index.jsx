import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import rough from "roughjs/bundled/rough.esm";
import { CanvasGuyContent } from "./style";
import { useSelector } from "react-redux";

// components
import PopCover from "./components/PopCover";

const LINE_CYCLE_COUNT = 60;

const CanvasGuy = (props) => {
  const source = useSelector(({ player }) => player.source);
  const mediaPlayNow = useSelector(({ player }) => player.mediaPlayNow);

  const [audioContext, setAudioContext] = useState();
  const [roughCanvas, setRoughCanvas] = useState();
  const [coverPopRange, setCoverPopRange] = useState(0);

  const outerBoxRef = useRef();
  const canvasRef = useRef();

  const handleDraw = useCallback(
    (ctx, current, dataArray) => {
      let voiceArr = [];

      for (let i = 0; i < LINE_CYCLE_COUNT; i++) {
        ctx.save();
        ctx.translate(current.offsetWidth / 2, current.offsetHeight / 2);
        let deg = (2 * Math.PI) / 360;
        ctx.rotate(deg * (360 / LINE_CYCLE_COUNT) * i);
        let value = dataArray[6 * i];
        value = value < 5 ? 5 : value;
        value > 200 && voiceArr.push(value);
        roughCanvas.rectangle(-2, 100, 4, value / 5);
        ctx.restore();
      }

      setCoverPopRange(voiceArr.length ? Math.max.apply(null, voiceArr) : 210);
    },
    [roughCanvas]
  );

  const handleAudioAnimation = useCallback(
    (ctx, analyser) => {
      const { current } = canvasRef;

      const render = () => {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, current.width, current.height);
        let dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        handleDraw(ctx, current, dataArray);
      };

      render();
    },
    [handleDraw]
  );

  const handleInitAudioContext = useCallback(
    (audioCtx) => {
      // 创建 AnalyserNode 节点
      let analyser = audioCtx.createAnalyser();

      // 链接节点
      let audioSource = audioCtx.createMediaElementSource(source);
      audioSource.connect(analyser);
      audioSource.connect(audioCtx.destination);

      const { current } = canvasRef;
      let ctx = current.getContext("2d");

      handleAudioAnimation(ctx, analyser);
    },
    [handleAudioAnimation, source]
  );

  const handleWindowResize = () => {
    const { current } = outerBoxRef;

    if (!current) return;

    canvasRef.current.width = current.offsetWidth;
    canvasRef.current.height = current.offsetHeight;
  };

  useEffect(() => {
    const { current } = canvasRef;
    const roughCanvas = rough.canvas(current);
    setRoughCanvas(roughCanvas);
  }, [canvasRef]);

  // 初始化音频处理
  useEffect(() => {
    if (mediaPlayNow.name && source && !audioContext) {
      let audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      setAudioContext(audioContext);
      handleInitAudioContext(audioContext);
    }
  }, [mediaPlayNow, source, audioContext, handleInitAudioContext]);

  // 页面初始化 挂载 resize 事件
  useEffect(() => {
    handleWindowResize();
    window.onresize = handleWindowResize;
  }, []);

  return (
    <CanvasGuyContent ref={outerBoxRef}>
      <canvas ref={canvasRef}></canvas>
      <PopCover bg={mediaPlayNow.picUrl} range={coverPopRange} />
    </CanvasGuyContent>
  );
};

export default memo(CanvasGuy);
