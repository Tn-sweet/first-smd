"use strict";
var common_vendor = require("./vendor.js");
var common_config = require("./config.js");
function topList() {
  let listIds = ["19723756", "3779629", "2884035", "3778678"];
  return new Promise(function(reslove, reject) {
    common_vendor.index.request({
      url: `${common_config.baseUrl}/toplist/detail`,
      method: "GET",
      data: {},
      success: (res) => {
        let result = res.data.list;
        result.length = 4;
        for (var i = 0; i < listIds.length; i++) {
          result[i].listId = listIds[i];
        }
        reslove(result);
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  });
}
function list(listId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/playlist/detail?id= ${listId}`,
    method: "GET"
  });
}
function songDetail(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/detail?ids= ${songId}`,
    method: "GET"
  });
}
function songSimi(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/simi/song?id= ${songId}`,
    method: "GET"
  });
}
function songComment(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/comment/music?id=${songId}`,
    method: "GET"
  });
}
function songLyric(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/lyric?id=${songId}`,
    method: "GET"
  });
}
function songUrl(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/url?id=${songId}`,
    method: "GET"
  });
}
function searchHot() {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/hot/detail`,
    method: "GET"
  });
}
function searchWord(word) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search?keywords=${word}`,
    method: "GET"
  });
}
function searchSuggest(word) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/suggest?keywords=${word}&type=mobile`,
    method: "GET"
  });
}
exports.list = list;
exports.searchHot = searchHot;
exports.searchSuggest = searchSuggest;
exports.searchWord = searchWord;
exports.songComment = songComment;
exports.songDetail = songDetail;
exports.songLyric = songLyric;
exports.songSimi = songSimi;
exports.songUrl = songUrl;
exports.topList = topList;
