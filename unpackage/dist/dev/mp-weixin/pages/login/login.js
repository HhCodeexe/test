"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const db = common_vendor.As.database();
const _sfc_main = {
  data() {
    return {
      flag: true,
      title: "Hello",
      username: "",
      password: ""
    };
  },
  methods: {
    setAccount(value) {
      store_index.store.commit("setAccount", value);
    },
    setHeadUrl(value) {
      store_index.store.commit("setHeadUrl", value);
    },
    usersubmit: function() {
      console.log(this.username);
      console.log(this.password);
      db.collection("myusers").where({
        name: this.username,
        password: this.password
      }).get().then((res) => {
        console.log("\u6570\u636E\u5E93\u8FD4\u56DE\u7ED3\u679C", res.result);
        if (res.result.data.length == 1) {
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u6210\u529F\uFF01",
            icon: "success"
          });
          this.setAccount(res.result.data[0].name);
          this.setHeadUrl(res.result.data[0].headUrl);
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/ucenter/ucenter"
            });
          }, 2e3);
        } else {
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u5931\u8D25\uFF01",
            icon: "error",
            duration: 3e3
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    userregister: function() {
      if (this.username == "") {
        common_vendor.index.showToast({
          title: "\u7528\u6237\u540D\u4E3A\u7A7A\uFF01",
          icon: "error",
          duration: 2500
        });
      } else if (this.password == "") {
        common_vendor.index.showToast({
          title: "\u5BC6\u7801\u4E3A\u7A7A\uFF01",
          icon: "error",
          duration: 2500
        });
      } else if (this.password != this.repassword) {
        common_vendor.index.showToast({
          title: "\u524D\u540E\u5BC6\u7801\u4E0D\u4E00\u81F4",
          icon: "error",
          duration: 2500
        });
      } else {
        db.collection("myusers").where({ name: this.username }).count().then((res) => {
          console.log(res);
          if (res.result.affectedDocs == 1) {
            common_vendor.index.showToast({
              title: "\u7528\u6237\u540D\u5DF2\u5B58\u5728\uFF01",
              icon: "error",
              duration: 2500
            });
          } else {
            db.collection("myusers").add({
              name: this.username,
              password: this.password
            }).then((res2) => {
              console.log(res2);
              if (res2.result.errCode == 0) {
                common_vendor.index.showToast({
                  title: "\u6CE8\u518C\u6210\u529F\uFF01",
                  icon: "success"
                });
                this.setAccount(res2.result.data[0].name);
                this.setHeadUrl(res2.result.data[0].headUrl);
                setTimeout(() => {
                  common_vendor.index.switchTab({
                    url: "/pages/ucenter/ucenter"
                  });
                }, 2500);
              } else {
                common_vendor.index.showToast({
                  title: "\u6CE8\u518C\u5931\u8D25\uFF01",
                  icon: "error",
                  duration: 3e3
                });
              }
            }).catch((err) => {
              console.log(err);
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.flag
  }, $data.flag ? {
    b: common_vendor.t($data.title),
    c: $data.username,
    d: common_vendor.o(($event) => $data.username = $event.detail.value),
    e: $data.password,
    f: common_vendor.o(($event) => $data.password = $event.detail.value),
    g: common_vendor.o((...args) => $options.usersubmit && $options.usersubmit(...args)),
    h: common_vendor.o(($event) => $data.flag = !$data.flag)
  } : {
    i: $data.username,
    j: common_vendor.o(($event) => $data.username = $event.detail.value),
    k: $data.password,
    l: common_vendor.o(($event) => $data.password = $event.detail.value),
    m: _ctx.repassword,
    n: common_vendor.o(($event) => _ctx.repassword = $event.detail.value),
    o: common_vendor.o((...args) => $options.userregister && $options.userregister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/studysoftware/HBuilder/aSmartHome/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
