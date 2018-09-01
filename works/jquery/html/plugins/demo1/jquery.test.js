;(function($) {
    'use strice';
    $.fn.test = function(options) {
        var defaults = {
            color: 'red',
            fontSize: '12px'
        };
        options = $.extend({}, defaults, options || {});

        console.log(defaults);
        console.log(options);

        return this.each(function() {
            $(this).css({
                'color': options.color,
                'font-size': options.fontSize
            });
        });
    };
})(jQuery);
