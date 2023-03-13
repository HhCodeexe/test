"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      words: [{
        "robot": "\u4F60\u597D\uFF01\u6211\u662F\u86CB\u9EC4\u6D3E\u6D3E\uFF0C\u8DDF\u6211\u804A\u5929\u53EF\u4EE5\u966A\u4F60\u95F2\u804A\u89E3\u95F7\uFF0C\u5FEB\u6765\u8DDF\u6211\u804A\u5929\u5427~",
        "isay": "\u4F60\u597D\u5440~"
      }],
      inputValue: "",
      headLeft: "/static/image/xiaopai.png"
    };
  },
  computed: common_vendor.mapState({
    nickName: (state) => state.nickName,
    avatarUrl: (state) => state.avatarUrl,
    ledChecked: (state) => state.ledChecked,
    fanChecked: (state) => state.fanChecked,
    loginChecked: (state) => state.loginChecked
  }),
  methods: {
    controlDevice(isay) {
      this.inputValue = "";
      if (/开.*灯/g.test(isay)) {
        this.$store.state.ledList[0].ledChecked0 = 1;
        this.onPublishDevice();
        this.words.push({
          "robot": "\u706F\u5DF2\u7ECF\u6253\u5F00\u5566~",
          "isay": isay
        });
      } else if (/关.*灯/g.test(isay)) {
        this.$store.state.ledList[0].ledChecked0 = 0;
        this.onPublishDevice();
        this.words.push({
          "robot": "\u706F\u5DF2\u7ECF\u5173\u95ED\u5566~",
          "isay": isay
        });
      } else if (/开.*风扇/g.test(isay)) {
        this.$store.state.fanList[0].fanChecked0 = 1;
        this.onPublishDevice();
        this.words.push({
          "robot": "\u98CE\u6247\u5DF2\u7ECF\u6253\u5F00\u5566~",
          "isay": isay
        });
      } else if (/关.*风扇/g.test(isay)) {
        this.$store.state.fanList[0].fanChecked0 = 0;
        this.onPublishDevice();
        this.words.push({
          "robot": "\u98CE\u6247\u5DF2\u7ECF\u5173\u95ED\u5566~",
          "isay": isay
        });
      } else if (/温湿度/g.test(isay)) {
        this.words.push({
          "robot": "\u5BA4\u5185\u6E29\u5EA6:" + this.$store.state.temperature + ",\u5BA4\u5185\u6E7F\u5EA6:" + this.$store.state.humidity,
          "isay": isay
        });
      } else {
        this.converSation(isay);
      }
    },
    converSation(isay) {
      let that = this;
      let obj = {};
      that.inputValue = "";
      const key = "";
      wx.request({
        url: "http://www.tuling123.com/openapi/api?key=" + key + "&info=" + isay + "&userid=\u6682\u65E0",
        success(res) {
          console.log(res);
          obj.robot = res.data.text;
          obj.isay = isay;
          that.words.push(obj);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.nickName),
    b: common_vendor.f($data.words, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.isay)
      }, _ctx.loginChecked ? {
        b: _ctx.avatarUrl
      } : {}, {
        c: common_vendor.t(item.robot),
        d: item
      });
    }),
    c: _ctx.loginChecked,
    d: $data.headLeft,
    e: common_vendor.o(($event) => $options.controlDevice($data.inputValue)),
    f: $data.inputValue,
    g: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    h: common_vendor.o(($event) => $options.controlDevice($data.inputValue))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/talk/talk.vue"]]);
wx.createPage(MiniProgramPage);
