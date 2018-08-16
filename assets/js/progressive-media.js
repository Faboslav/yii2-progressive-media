loadProgressiveMedia();
window.addEventListener('DOMContentLoaded', loadProgressiveMedia());
window.addEventListener('scroll', throttle(loadProgressiveMedia, 250));
window.addEventListener("resize", debounce(loadProgressiveMedia, 500));

function isInViewport(element) {
    const offset = window.innerHeight/2

    var elementTop = element.offsetTop - offset;
    var elementBottom = elementTop + element.clientHeight + offset;
    var viewportTop = window.scrollY;
    var viewportBottom = viewportTop + window.innerHeight;

    return elementBottom > viewportTop && elementTop < viewportBottom;
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
            var progressiveMedia = $(this);
            progressiveMedia.removeClass('progressive-media-unloaded');
            progressiveMedia.addClass('progressive-media-loading');

            if ($(this).hasClass('progressive-media-image')) {
                var progressiveMediaImageAspectRatioInner = $('.aspect .aspect-inner', progressiveMedia);

                var image = new Image();
                image.src = $(this).data('img-src');
                image.className = 'progressive-media-image-original progressive-media-content';
                image.onload = function () {
                    $(progressiveMediaImageAspectRatioInner).append(image);
                    progressiveMedia.removeClass('progressive-media-loading');
                    progressiveMedia.addClass('progressive-media-loaded');
                };
            } else if ($(this).hasClass('progressive-media-iframe')) {
                this.querySelector('.aspect-inner').insertAdjacentHTML('beforeend', this.querySelector('noscript').innerText.trim());
                this.classList.remove('progressive-media-loading');
                this.classList.add('progressive-media-loaded');
            }
        }
    });
}