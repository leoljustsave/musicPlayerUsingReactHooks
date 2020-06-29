import request from "./request";

export const Song = {};

// 获取歌单
Song.getSongList = (id) => request.get(`playlist/detail?id=${id}`);

// 根据关键字查询歌曲
Song.getSongSearchInfoByKeywords = (keywords) =>
  request.get(`search?keywords=${keywords}`);

// 获取歌曲链接
Song.getSongUrl = (id) => request.get(`song/url?id=${id}`);

// 获取歌曲详情
Song.getSongDetail = (id) => request.get(`song/detail?ids=${'' + id}`);

// 获取歌曲歌词
Song.getSongLyric = (id) => request.get(`lyric?id=${id}`);