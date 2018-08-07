/*
* @Author: 有猫的程序员
* @Date:   2018-08-07 15:10:49
* @Last Modified by:   有猫的程序员
* @Last Modified time: 2018-08-07 21:35:00
*/

+function($) {
    // 严格模式
    'use strict';

    // 构造函数
    var TakeOut = function(options) {
        this.options = $.extend({}, TakeOut.DEFAULTS, options);
        var _this = this;
        this.options.computeBtn.click(function() {
            _this.getParams();
        });
    };

    // 版本号
    TakeOut.VERSION = '1.0.0';

    // 默认配置
    TakeOut.DEFAULTS = {

    };

    // 原型方法
    /**
     * [toArray 字符串格式化为数组]
     * @return {[type]} [description]
     */
    TakeOut.prototype.toArray = function(str) {
        str = str.replace(/，/g, ',');
        return str.split(',');
    };

    /**
     * [getParams 获取表单数据]
     * @return {[type]} [description]
     */
    TakeOut.prototype.getParams = function() {
        var params = this.serializeJson();
        var paramObj = {
            names: this.toArray(params.names) || [],                        // 姓名
            totals: this.toArray(params.totals) || [],                      // 价格
            numbers: Number(params.numbers) || 1,                           // 点餐人数
            packingCost: Number(params.packingCost) || 0,                   // 打包盒
            deliveryCost: Number(params.deliveryCost) || 0,                 // 配送费
            extraCost: Number(params.extraCost) || 0,                       // 其他费用
            restaurantDiscount: Number(params.restaurantDiscount) || 0,     // 店铺优惠
            luckDiscount: Number(params.luckDiscount) || 0,                 // 红包优惠
            extraDiscount: Number(params.extraDiscount) || 0                // 其他优惠
        };

        var res = this.showMsg(paramObj);
        this.showPriceList(paramObj, res);
    };

    /**
     * [showMsg 优惠信息]
     * @param  {[type]} discount [description]
     * @param  {[type]} cost     [description]
     * @return {[type]}          [description]
     */
    TakeOut.prototype.showMsg = function(obj) {
        // 总优惠
        var dTotal = this.discountTotal(obj);
        // 总花费（打包盒+配送费+其他费用）
        var cTotal = this.costTotal(obj);
        var res = this.getFloat((dTotal - cTotal) / obj.numbers, 1);
        var resMsg = '';
        if (res > 0) {
            resMsg = '恭喜，省钱了！';
        } else if (res < 0) {
            resMsg = '抱歉，得倒贴钱！';
        } else {
            resMsg = '还行吧，不赔不赚！';
        }
        this.options.resWrapper.fadeIn();
        this.options.resMsg.find('h2').html(resMsg);
        this.options.resMsg.find('.price').html(res);
        return res;
    };

    /**
     * [showPriceList 价格列表]
     * @return {[type]} [description]
     */
    TakeOut.prototype.showPriceList = function(obj, res) {
        var totals = obj.totals;
        var personObj = {};
        var str = '';
        for (var i = 0; i < totals.length; i++) {
            personObj = {
                name: obj.names[i] || 'xxx' + i,
                originalCost: totals[i],
                afterDiscount: this.getFloat(totals[i] - res, 1)
            };
            str += '<tr>'
                    + '<td>'+ personObj.name +'</td>'
                    + '<td>'+ personObj.originalCost +'</td>'
                    + '<td>'+ personObj.afterDiscount +'</td>'
                + '</tr>';
        }
        this.options.resList.html(str);
        var random = this.getRandom(0, obj.numbers-1) || 0;
        var who = obj.names[random] || 'xxx';
        this.options.who.html(who + '大佬');
    };

    /**
     * [getRandom 给定范围生成随机数]
     * @param  {[type]} startNum [description]
     * @param  {[type]} endNum   [description]
     * @return {[type]}          [description]
     */
    TakeOut.prototype.getRandom = function(min, max) {
        min = min || 0;
        var range = max - min;
        var rand = Math.random();
        var num = min + Math.round(rand * range); // 四舍五入
        return num;
    };

    /**
     * [getFloat 四舍五入，保留一位小数]
     * @param  {[type]} number [description]
     * @param  {[type]} n      [description]
     * @return {[type]}        [description]
     */
    TakeOut.prototype.getFloat = function(number, n) {
        n = Number(n) || 1;
        return Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
    };

    /**
     * [discountTotal 计算优惠总价]
     * @return {[type]} [description]
     */
    TakeOut.prototype.discountTotal = function(obj) {
        return obj.restaurantDiscount + obj.luckDiscount + obj.extraDiscount;
    };

    /**
     * [costTotal 计算打包盒配送费总价]
     * @param  {[type]} ob [description]
     * @return {[type]}    [description]
     */
    TakeOut.prototype.costTotal = function(obj) {
        return obj.packingCost + obj.deliveryCost + obj.extraCost;
    };

    /**
     * [serializeJson 表单数据处理为 JSON 对象]
     * @return {[type]} [description]
     */
    TakeOut.prototype.serializeJson = function() {
        var serializeObj = {};
        var array = this.options.takeOutForm.serializeArray();
        // 遍历数组
        $(array).each(function() {
            // 判断对象中是否已经存在name
            if (!serializeObj[this.name]) {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };

    $(function() {
        // 初始化
        new TakeOut({
            takeOutForm: $('#takeOutForm'),
            computeBtn: $('#computeBtn'),
            resWrapper: $('#resWrapper'),
            resMsg: $('#resMsg'),
            resList: $('#resList'),
            who: $('#who')
        });
    });
}(jQuery);
