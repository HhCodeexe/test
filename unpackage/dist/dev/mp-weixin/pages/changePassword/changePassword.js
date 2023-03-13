"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.As.database();
const _sfc_main = {
  data() {
    return {
      passwordData: {
        account: "",
        password: "",
        repassword: ""
      },
      rules: {
        account: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u8D26\u53F7"
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u5BC6\u7801"
            }
          ]
        },
        repassword: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u786E\u8BA4\u5BC6\u7801"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value != data.password) {
                  callback("\u524D\u540E\u5BC6\u7801\u4E0D\u4E00\u81F4");
                }
                return true;
              }
            }
          ]
        }
      }
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    submit(form) {
      this.$refs.form.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        db.collection("myusers").where({ name: res.account }).update({ password: res.repassword }).then((res2) => {
          console.log("\u6570\u636E\u5E93\u8FD4\u56DE\u7ED3\u679C", res2.result.updated);
          if (res2.result.updated == 0) {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u5931\u8D25\uFF01",
              icon: "success"
            });
          } else {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u6210\u529F\uFF01",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/ucenter/ucenter"
              });
            }, 2e3);
          }
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.passwordData.account,
    b: common_vendor.o(($event) => $data.passwordData.account = $event.detail.value),
    c: common_vendor.p({
      label: "\u8D26\u53F7:",
      name: "account"
    }),
    d: $data.passwordData.password,
    e: common_vendor.o(($event) => $data.passwordData.password = $event.detail.value),
    f: common_vendor.p({
      label: "\u65B0\u5BC6\u7801:",
      name: "password"
    }),
    g: $data.passwordData.repassword,
    h: common_vendor.o(($event) => $data.passwordData.repassword = $event.detail.value),
    i: common_vendor.p({
      label: "\u786E\u8BA4\u5BC6\u7801:",
      name: "repassword"
    }),
    j: common_vendor.sr("form", "484e51ce-0"),
    k: common_vendor.p({
      modelValue: $data.passwordData,
      rules: $data.rules
    }),
    l: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/changePassword/changePassword.vue"]]);
wx.createPage(MiniProgramPage);
