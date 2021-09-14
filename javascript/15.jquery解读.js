(function(window, undefined){
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context, rootjQuery);
  }

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init:function(selector, context, rootjQuery) {
      if(!selector) {
        return this;
      }

    },
    last: function() {
      return this.eq( -1 );
    },
  }

  jQuery.fn.init.prototype = jQuery.fn;

  // 如果当前是window环境，
  if ( typeof window === "object" && typeof window.document === "object" ) {
    window.jQuery = window.$ = jQuery;
  }
})(window);