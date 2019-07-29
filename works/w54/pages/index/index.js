//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        activeIndex: 1,

        // 理财收益计算
        money1: 50000,
        rate1: 4.2,
        days1: 90,
        payoff1: 0,
        dayPayoff1: 0,
        showError: false,
        errorMsg: '请输入本金',

        // 理财转让计算
        money: 50000,
        rate: 4.2,
        transferRate: 3.9,
        days: 90,
        transferDays: 30,
        dayPayoff: 0,
        transferPayoff: 0,
        transferMoney: 0,
        hasDays: 0, // 持有天数
        hasDaysPayoff: 0,
        differ: 0,
        charges: 25,
        finalMoney: 0
    },
    onReady: function() {
        this.submit1();
        this.submit();
    },
    selectType: function(e) {
        let val = e.currentTarget.dataset.type;
        this.setData({
            activeIndex: val
        });
    },
    inputWatch: function(e) {
        let item = e.currentTarget.dataset.model;
        this.setData({
            [item]: e.detail.value,
            payoff1: '--',
            dayPayoff1: '--',
            hasDays: '--',
            payoff: '--',
            hasDaysPayoff: '--',
            transferPayoff: '--',
            transferMoney: '--',
            differ: '--',
            charges: '--',
            finalMoney: '--'
        });
    },
    submit1: function() {
        let payoff1 = (this.data.money1 * (this.data.rate1 / 100) * (this.data.days1 / 365)).toFixed(2);
        let dayPayoff1 = (payoff1 / this.data.days1).toFixed(2);
        this.setData({
            payoff1: payoff1,
            dayPayoff1: dayPayoff1
        });
    },
    submit: function() {
        let hasDays = this.data.days - this.data.transferDays;
        let payoff = (this.data.money * (this.data.rate / 100) * (this.data.days / 365)).toFixed(2);
        let hasDaysPayoff = (this.data.money * (this.data.rate / 100) * (hasDays / 365)).toFixed(2);
        let transferPayoff = (this.data.money * (this.data.transferRate / 100) * (this.data.transferDays / 365)).toFixed(2);
        let transferMoney = Number(this.data.money) + (payoff - transferPayoff);
        let differ = (payoff - transferPayoff - hasDaysPayoff).toFixed(2);
        let charges = (transferMoney * 0.05 / 100).toFixed(2);
        if (charges < 25) {
            charges = 25;
        }
        let finalMoney = (transferMoney - charges).toFixed(2);
        this.setData({
            hasDays: hasDays,
            payoff: payoff,
            hasDaysPayoff: hasDaysPayoff,
            transferPayoff: transferPayoff,
            transferMoney: transferMoney,
            differ: differ,
            charges: charges,
            finalMoney: finalMoney
        });
    }
})