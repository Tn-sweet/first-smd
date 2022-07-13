"use strict";
var common_vendor = require("../../common/vendor.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      topList: []
    };
  },
  components: {
    musichead
  },
  onLoad() {
    common_api.topList().then((res) => {
      if (res.length) {
        this.topList = res;
      }
    });
  },
  methods: {
    handleToList(listId) {
      common_vendor.index.navigateTo({
        url: "/pages/list/list?listId=" + listId
      });
    },
    handleTosearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
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
      title: "Tn-Sweet",
      icon: false
    }),
    b: common_vendor.o(($event) => $options.handleTosearch()),
    c: common_vendor.f($data.topList, (item, index, i0) => {
      return {
        a: item.coverImgUrl,
        b: common_vendor.t(item.updateFrequency),
        c: common_vendor.f(item.tracks, (item2, index2, i1) => {
          return {
            a: common_vendor.t(index2 + 1),
            b: common_vendor.t(item2.first),
            c: common_vendor.t(item2.second),
            d: index2
          };
        }),
        d: index,
        e: common_vendor.o(($event) => $options.handleToList(item.listId))
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "C:/Users/Windows/Desktop/\u7F51\u6613music/Tn-Sweet/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
