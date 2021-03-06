import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "@/hooks/useAxios";
import {
  handleGetTenNiceNewDiskList,
  handleGetRecommendedPlaylist,
  handleGetNewMusiclistByArea,
} from "@r/common";

import { DiscoveryContent } from "./style";

// components
import MVListSlideGroup from "./components/MVListSlideGroup";
import DiskListSlideGroup from "./components/DiskListSlideGroup";
import SongCollectSlideGroup from "./components/SongCollectSlideGroup";
import MusicListSlideGroup from "./components/MusicListSlideGroup";

const Discovery = (props) => {
  const { data: mvListData = [] } = useAxios({ url: "/personal_fm" });

  const dispatch = useDispatch();

  const tenNiceNewDiskList = useSelector(
    ({ common }) => common.tenNiceNewDiskList
  );
  const recommendedPlaylist = useSelector(
    ({ common }) => common.recommendedPlaylist
  );
  const newMusicList = useSelector(({ common }) => common.newMusicList);

  useEffect(() => {
    dispatch(handleGetTenNiceNewDiskList());
    dispatch(handleGetRecommendedPlaylist());
    dispatch(handleGetNewMusiclistByArea({}));
  }, [dispatch]);

  return (
    <DiscoveryContent>
      {mvListData.length ? (
        <MVListSlideGroup title="网友精选" mvList={mvListData} />
      ) : null}

      {tenNiceNewDiskList.length ? (
        <DiskListSlideGroup title="网友精选" diskList={tenNiceNewDiskList} />
      ) : null}

      {newMusicList.length ? (
        <MusicListSlideGroup title="新歌推送" musicList={newMusicList} />
      ) : null}

      {recommendedPlaylist.length ? (
        <SongCollectSlideGroup
          title="推荐歌单"
          playList={recommendedPlaylist}
        />
      ) : null}
    </DiscoveryContent>
  );
};

export default Discovery;
