"use strict";
var common_vendor = require("../../common/vendor.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      songDetail: {
        al: {
          picUrl: ""
        }
      },
      songSimi: [],
      songComment: [],
      songLyric: [],
      lyricIndex: 0,
      iconPlay: "icon-bofang_o",
      isPlayRotate: true,
      isLoading: true
    };
  },
  components: {
    musichead
  },
  onLoad(options) {
    this.getMusic(options.songId);
  },
  onUnload() {
    this.cancelLyricIndex();
  },
  onHide() {
    this.cancelLyricIndex();
  },
  methods: {
    getMusic(songId) {
      common_vendor.index.showLoading({
        title: "\u6B63\u5728\u52A0\u8F7DQAQ"
      });
      this.isLoading = true;
      Promise.all([common_api.songDetail(songId), common_api.songSimi(songId), common_api.songComment(songId), common_api.songLyric(songId), common_api.songUrl(songId)]).then((res) => {
        if (res[0].data.code == "200") {
          this.songDetail = res[0].data.songs[0];
        }
        if (res[1].data.code == "200") {
          this.songSimi = res[1].data.songs;
        }
        if (res[2].data.code == "200") {
          this.songComment = res[2].data.hotComments;
        }
        if (res[3].data.code == "200") {
          let lyric = res[3].data.lrc.lyric;
          let re = /\[([^\]]+)\]([^\[]+)/g;
          var result = [];
          lyric.replace(re, ($0, $1, $2) => {
            result.push({ "time": this.formatTimeToSec($1), "lyric": $2 });
          });
          this.songLyric = result;
        }
        if (res[4].data.code == "200") {
          this.bgAudioMannager = common_vendor.index.getBackgroundAudioManager();
          this.bgAudioMannager.title = this.songDetail.name;
          this.bgAudioMannager.src = res[4].data.data[0].url || "";
          this.listenLyricIndex();
          this.bgAudioMannager.onPlay(() => {
            this.iconPlay = "icon-zanting1";
            this.isPlayRotate = true;
            this.listenLyricIndex();
          });
          this.bgAudioMannager.onPause(() => {
            this.iconPlay = "icon-bofang_o";
            this.isPlayRotate = false;
            this.cancelLyricIndex();
          });
        }
        this.isLoading = false;
        common_vendor.index.hideLoading();
      });
    },
    formatTimeToSec(value) {
      let arr = value.split(":");
      return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
    },
    handleToPlay() {
      if (this.bgAudioMannager.paused) {
        this.bgAudioMannager.play();
      } else {
        this.bgAudioMannager.pause();
      }
    },
    listenLyricIndex() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        for (var i = 0; i < this.songLyric.length; i++) {
          if (this.bgAudioMannager.currentTime > this.songLyric[this.songLyric.length - 1].time) {
            this.lyricIndex = this.songLyric.length - 1;
            break;
          }
          if (this.bgAudioMannager.currentTime > this.songLyric[i].time && this.bgAudioMannager.currentTime < this.songLyric[i + 1].time) {
            this.lyricIndex = i;
          }
        }
      }, 500);
    },
    cancelLyricIndex() {
      clearInterval(this.timer);
    },
    handleToSimi(songId) {
      this.getMusic(songId);
    }
  }
};
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  _easycom_musichead2();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
if (!Math) {
  _easycom_musichead();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: "url(" + $data.songDetail.al.picUrl + ")",
    b: common_vendor.p({
      title: $data.songDetail.name,
      icon: true
    }),
    c: $data.songDetail.al.picUrl,
    d: $data.isPlayRotate ? 1 : "",
    e: common_vendor.n($data.iconPlay),
    f: common_vendor.t($data.songDetail.name),
    g: common_vendor.o((...args) => $options.handleToPlay && $options.handleToPlay(...args)),
    h: common_vendor.f($data.songLyric, (item, index, i0) => {
      return {
        a: common_vendor.t(item.lyric),
        b: $data.lyricIndex == index ? 1 : "",
        c: index
      };
    }),
    i: "translateY(" + -($data.lyricIndex - 1) * 82 + "rpx)",
    j: common_vendor.f($data.songSimi, (item, index, i0) => {
      return {
        a: item.album.picUrl,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.album.artists[0].name),
        d: common_vendor.t(item.name),
        e: index,
        f: common_vendor.o(($event) => $options.handleToSimi(item.id))
      };
    }),
    k: common_vendor.f($data.songComment, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickname),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.likedCount),
        e: common_vendor.t(item.content),
        f: index
      };
    }),
    l: !$data.isLoading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e159eb4"], ["__file", "C:/Users/Windows/Desktop/\u7F51\u6613music/Tn-Sweet/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
