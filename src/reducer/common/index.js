const initState = {
  musicList: [],
};

// >>>>>> constant
const SET_MUSIC_LIST = "SET_MUSIC_LIST";

// >>>>>> action

/**
 * 设置播放歌曲在列表的位置
 * @param {listPos} data 在列表的位置
 */
export const handleSetMusicList = (data) => {
  data.forEach((element, index) => {
    element.listPos = index;
  });

  return {
    type: SET_MUSIC_LIST,
    data: data,
  };
};

const reducer = (state = initState, { type, data }) => {
  switch (type) {
    case SET_MUSIC_LIST:
      return { ...state, musicList: data };
    default:
      return state;
  }
};

export default reducer;
