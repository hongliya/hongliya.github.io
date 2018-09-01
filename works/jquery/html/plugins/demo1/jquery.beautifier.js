;(function($) {
    'use strice';
    var Beautifier = function(ele, opts) {
        this.$element = ele;
        this.defaults = {
            backgroundColor: '#000',
            color: 'red',
            fontSize: '12px'
        };
        this.options = $.extend({}, this.defaults, opts);
    };

    Beautifier.prototype.beautify = function() {
        return this.$element.css({
            'background-color': this.options.backgroundColor,
            'color': this.options.color,
            'font-size': this.options.fontSize
        });
    }

    $.fn.beautifier = function(options) {
        var bifier = new Beautifier(this, options);
        return bifier.beautify();
    };
})(jQuery);
