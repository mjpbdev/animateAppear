  
$(function(){

  $.fn.extend({
        animateCss: function(animationName) {
            $(this).attr('class', '');
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    $(".btn-animate").on('click', function() {
        var animation = $(this).attr('data-animate-class');
        var img = $(this).attr('data-img');
        $("#" + img).animateCss(animation);
    });


    window.prettyPrint && prettyPrint();

  $('[data-animation-name]').animateAppear();
});
