"use strict";
var common_vendor = require("../../common/vendor.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      playlist: {
        coverImgurl: "",
        subscribers: {
          avatarUrl: ""
        }
      },
      isLoading: true
    };
  },
  components: {
    musichead
  },
  onLoad(options) {
    common_vendor.index.showLoading({
      title: "\u6B63\u5728\u52A0\u8F7DQAQ"
    });
    common_api.list(options.listId).then((res) => {
      if (res.data.code == "200") {
        this.playlist = res.data.playlist;
        this.isLoading = false;
        common_vendor.index.hideLoading();
      }
    });
  },
  methods: {
    handleToDetail(songId) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?songId=" + songId
      });
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
    a: common_vendor.p({
      title: "Tn-sweet",
      icon: true
    }),
    b: common_vendor.t($data.playlist.playCount),
    c: common_vendor.t($data.playlist.name),
    d: $data.playlist.coverImgUrl,
    e: common_vendor.t($data.playlist.description),
    f: common_vendor.t($data.playlist.trackCount),
    g: common_vendor.f($data.playlist.tracks, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.ar[0].name),
        d: common_vendor.t(item.name),
        e: index,
        f: common_vendor.o(($event) => $options.handleToDetail(item.id))
      };
    }),
    h: !$data.isLoading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d5e07c6"], ["__file", "C:/Users/Windows/Desktop/\u7F51\u6613music/Tn-Sweet/pages/list/list.vue"]]);
wx.createPage(MiniProgramPage);
