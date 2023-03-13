"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const iot = require("./dist/alibabacloud-iot-device-sdk.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: common_vendor.mapState({
    nickName: (state) => state.nickName,
    account: (state) => state.account,
    headUrl: (state) => state.headUrl
  }),
  methods: {
    aliyun_connect() {
      console.log("\u5F00\u59CB\u8FDE\u63A5\uFF1A");
      const device = iot.device({
        productKey: `a1BB9kEIEnc`,
        deviceName: `WeChat`,
        deviceSecret: `b8cc45e8cb58eb67f776e63d8b53fa4a`
      });
      device.on("connect", () => {
        console.log("connect successfully!");
      });
      device.on("message", (topic, payload) => {
        console.log(topic, payload.toString());
      });
    },
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    confirm(value) {
      console.log(value);
      this.changeNickName(value);
      this.$refs.popup.close();
    },
    changeNickName(value) {
      store_index.store.commit({
        type: "changeNickName",
        nickName: value
      });
    },
    setHeadUrl(value) {
      store_index.store.commit("setHeadUrl", value);
    },
    navigateTo() {
      common_vendor.index.navigateTo({
        url: "/pages/changePassword/changePassword"
      });
    },
    upLoadHead() {
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          console.log("\u56FE\u7247\u9009\u62E9", res);
          if (res.tempFilePaths.length > 0) {
            common_vendor.index.showLoading({
              title: "\u4E0A\u4F20\u4E2D..."
            });
            let filePath = res.tempFilePaths[0];
            common_vendor.As.uploadFile({
              filePath,
              cloudPath: that.account + ".jpg",
              onUploadProgress: function(progressEvent) {
                console.log("\u4F20\u8F93\u7ED3\u679C", progressEvent);
                Math.round(
                  progressEvent.loaded * 100 / progressEvent.total
                );
              },
              success() {
                that.setHeadUrl(res.tempFilePaths);
                common_vendor.As.callFunction({
                  name: "changeHeadUrl",
                  data: {
                    headUrl: res.tempFilePaths
                  },
                  success() {
                    common_vendor.index.showLoading({
                      title: "\u4E0A\u4F20\u6210\u529F\uFF01"
                    });
                    setTimeout(function() {
                      common_vendor.index.hideLoading();
                    }, 1500);
                  }
                });
                console.log("\u6210\u529F\u7ED3\u679C", res.tempFilePaths);
              },
              fail() {
                common_vendor.index.showLoading({
                  title: "\u4E0A\u4F20\u5931\u8D25\uFF01"
                });
                setTimeout(function() {
                  common_vendor.index.hideLoading();
                }, 2e3);
                console.log("\u5931\u8D25\u7ED3\u679C", res);
              },
              complete() {
              }
            });
          }
        }
      });
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
  return {
    a: _ctx.headUrl,
    b: common_vendor.t(_ctx.nickName),
    c: common_vendor.t(_ctx.account),
    d: _ctx.headUrl,
    e: common_vendor.o((...args) => $options.upLoadHead && $options.upLoadHead(...args)),
    f: common_vendor.o((...args) => $options.open && $options.open(...args)),
    g: common_vendor.o($options.close),
    h: common_vendor.o($options.confirm),
    i: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u6635\u79F0:",
      message: "\u6210\u529F\u6D88\u606F",
      duration: 2e3,
      ["before-close"]: true
    }),
    j: common_vendor.sr("popup", "e80e84f8-0"),
    k: common_vendor.p({
      type: "dialog"
    }),
    l: common_vendor.o((...args) => $options.navigateTo && $options.navigateTo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/ucenter/ucenter.vue"]]);
wx.createPage(MiniProgramPage);
