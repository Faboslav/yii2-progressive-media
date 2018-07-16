loadProgressiveMedia();
window.addEventListener('DOMContentLoaded', loadProgressiveMedia());
window.addEventListener('scroll', throttle(loadProgressiveMedia, 250));
window.addEventListener("resize", debounce(loadProgressiveMedia, 500));

function isInViewport(element) {
    const offset = (window.innerHeight)
    const scroll = window.scrollY || window.pageYOffset
    const boundsTop = element.getBoundingClientRect().top + scroll

    const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
    };

    const bounds = {
        top: boundsTop - offset,
        bottom: boundsTop + element.clientHeight + offset,
    };

    return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
        || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
}

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function loadProgressiveMedia() {
    $('.progressive-media:not(.progressive-media-loaded):not(.progressive-media-loading)').each(function( index ) {
        if (isInViewport($(this)[0])) {
            var progressiveMediaImage = $(this);
            progressiveMediaImage.addClass('progressive-media-loading');

            if ($(this).hasClass('progressive-media-image')) {
                var progressiveMediaImageAspectRatioInner = $('.aspect .aspect-inner', progressiveMediaImage);

                var image = new Image();
                image.src = $(this).data('image-src');
                image.className = 'progressive-media-image-original';
                image.onload = function () {
                    $(progressiveMediaImageAspectRatioInner).append(image);
                    progressiveMediaImage.removeClass('progressive-media-loading');
                    progressiveMediaImage.addClass('progressive-media-loaded');
                };
            } else if ($(this).hasClass('progressive-media-iframe')) {
                var iframe = document.createElement('div');
                iframe.innerHTML = this.querySelector('noscript').innerHTML.trim();

                this.querySelector('.aspect-inner').appendChild(iframe.firstChild);
                this.classList.remove('progressive-media-loading');
                this.classList.add('progressive-media-loaded');
            }
        }
    });
}