"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: common_vendor.mapState({
    ledChecked: (state) => state.ledChecked,
    fanList: (state) => state.fanList,
    ledList: (state) => state.ledList
  }),
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.ledList[0].ledChecked0 == 0
  }, _ctx.ledList[0].ledChecked0 == 0 ? {} : {}, {
    b: _ctx.ledList[0].ledChecked0,
    c: common_vendor.o(($event) => _ctx.controlDevice("led0")),
    d: _ctx.fanList[0].fanChecked0 == 0
  }, _ctx.fanList[0].fanChecked0 == 0 ? {} : {}, {
    e: _ctx.fanList[0].fanChecked0,
    f: common_vendor.o(($event) => _ctx.controlDevice("fan0"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/control/control.vue"]]);
wx.createPage(MiniProgramPage);
