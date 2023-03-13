"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      count: 0
    };
  },
  computed: common_vendor.mapState({
    mqttChecked: (state) => state.mqttChecked,
    temperature: (state) => state.temperature,
    humidity: (state) => state.humidity
  }),
  methods: {
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    confirm(value) {
      this.count++;
      wx.makePhoneCall({
        phoneNumber: "110"
      });
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.mqttChecked
  }, _ctx.mqttChecked ? {} : {}, {
    b: common_vendor.t($data.count),
    c: common_vendor.o((...args) => _ctx.onPlice && _ctx.onPlice(...args)),
    d: common_vendor.o(($event) => $options.open()),
    e: common_vendor.o($options.close),
    f: common_vendor.o($options.confirm),
    g: common_vendor.p({
      mode: "base",
      title: "\u62A5\u8B66!",
      content: "\u62E8\u6253110!",
      duration: 2e3,
      ["before-close"]: true
    }),
    h: common_vendor.sr("popup", "bab853b8-0"),
    i: common_vendor.p({
      type: "dialog"
    }),
    j: _ctx.temperature < 40
  }, _ctx.temperature < 40 ? {} : {}, {
    k: common_vendor.t(_ctx.temperature),
    l: _ctx.humidity < 40
  }, _ctx.humidity < 40 ? {} : {}, {
    m: common_vendor.t(_ctx.humidity)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/monitor/monitor.vue"]]);
wx.createPage(MiniProgramPage);
