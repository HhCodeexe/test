"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        name: "LiMing",
        email: "dcloud@email.com"
      },
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u59D3\u540D"
            },
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "\u59D3\u540D\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"
            }
          ]
        },
        email: {
          rules: [{
            format: "email",
            errorMessage: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u5730\u5740"
          }]
        }
      }
    };
  },
  created() {
    this.aliyun_connect();
  },
  methods: {}
};
if (!Array) {
  const _component_uni_easyinput = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_component_uni_easyinput + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.name = $event),
    b: common_vendor.p({
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.formData.name
    }),
    c: common_vendor.p({
      label: "\u59D3\u540D",
      name: "name"
    }),
    d: common_vendor.o([($event) => $data.formData.email = $event.detail.value, ($event) => _ctx.binddata("email", $event.detail.value)]),
    e: $data.formData.email,
    f: common_vendor.p({
      label: "\u90AE\u7BB1",
      name: "email"
    }),
    g: common_vendor.sr("form", "6c5758ae-0"),
    h: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    }),
    i: common_vendor.o((...args) => _ctx.submit && _ctx.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
