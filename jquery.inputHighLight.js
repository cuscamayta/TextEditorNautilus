$.fn.highlight = function (options) {
    var opts = $.extend({}, $.fn.highlight.defaults, options);

    this.each(function () {
        $(this).focus(function () {
            $(this).css({ 'background': opts.background });
        });

        $(this).blur(function () {
            $(this).css({ 'background': 'white' });
        });
    });
}

$.fn.highlight.defaults = {
    background: '#a6cdec'
};