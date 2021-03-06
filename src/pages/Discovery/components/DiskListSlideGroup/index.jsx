import React, { useState } from "react";
import useBottomSlidePop from "@/hooks/useBottomSlidePop";
import useLoading from "@/hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import { handleSetSongCollectInfo } from "@r/common";

// components
import { DiskListSlideGroupContent, DiskItem } from "./style";
import Title from "../Title";
import SongCollectPop from "@/components/SongCollectPop";
import FixableText from "@/components/FixableText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const DiskListSlideGroup = (props) => {
  const dispatch = useDispatch();

  const { title, diskList } = props;

  const { BottomSlidePopDom, toggleBottomSlidePop } = useBottomSlidePop(false);
  const { LoadingDom, toggleLoading } = useLoading({
    init: false,
    position: "top",
  });

  const songCollectInfo = useSelector(({ common }) => common.songCollectInfo);

  const [swiperController, setSwiperController] = useState(null);

  // 获取指定歌单内容
  const handleGetThisSongCollectInfo = async (id) => {
    diskList.forEach((item, index) => {
      if (item.id === id) {
        swiperController.slideTo(index + 2);
      }
    });

    toggleLoading(true);

    await dispatch(handleSetSongCollectInfo(id));

    toggleLoading(false);
    toggleBottomSlidePop();
  };

  return (
    <>
      <DiskListSlideGroupContent>
        <Title title={title} />

        <Swiper
          className="song-list-swiper-content"
          spaceBetween={-10}
          slidesPerView={1.7}
          centeredSlides={true}
          loop={true}
          watchSlidesProgress={true}
          onSwiper={setSwiperController}
        >
          {diskList?.map((item) => (
            <SwiperSlide className="swiper-item" key={item.id}>
              <DiskItem onClick={() => handleGetThisSongCollectInfo(item.id)}>
                <div className="cover-box">
                  <img src={`${item.coverImgUrl}?params=200y200`} alt="" />
                  <div className="name">
                    <FixableText text={item.name} max={30} min={16} line={4} />
                  </div>
                </div>
              </DiskItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </DiskListSlideGroupContent>

      {LoadingDom}

      {BottomSlidePopDom(
        <SongCollectPop info={songCollectInfo} toggle={toggleBottomSlidePop} />
      )}
    </>
  );
};

export default DiskListSlideGroup;
