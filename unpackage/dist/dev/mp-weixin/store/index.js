"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    fanList: [
      {
        fanChecked0: false
      },
      {
        fanChecked1: false
      },
      {
        fanChecked2: false
      },
      {
        fanChecked3: false
      }
    ],
    ledList: [
      {
        ledChecked0: false
      },
      {
        ledChecked1: false
      },
      {
        ledChecked2: false
      },
      {
        ledChecked3: false
      }
    ],
    temperature: 0,
    humidity: 0,
    loginChecked: false,
    mqttChecked: false,
    nickName: "***",
    account: "***",
    headUrl: ""
  },
  mutations: {
    changeFanState(state) {
      state.fanList[0].fanChecked0 = !state.fanList[0].fanChecked0;
    },
    changeNickName(state, payload) {
      state.nickName = payload.nickName;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setHeadUrl(state, url) {
      state.headUrl = url;
    }
  }
});
exports.store = store;
