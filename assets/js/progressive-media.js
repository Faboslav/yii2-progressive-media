function isInViewport(element) {
    var offset = window.innerHeight / 2

    var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - offset;
    var scrollBottom = scrollTop + window.innerHeight + offset;

    var rect = element.getBoundingClientRect();
    var elementTop = rect.top + scrollTop;
    var elementBottom = elementTop + element.clientHeight;

    return (elementTop > scrollTop && elementTop < scrollBottom) || (elementBottom > scrollTop && elementBottom < scrollBottom);
}

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
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
    return function () {
        var context = this, args = arguments;
        var later = function () {
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
    $('.progressive-media:not(.progressive-media-loaded):not(.progressive-media-loading)').each(function (index) {
        if (isInViewport($(this)[0])) {
            var progressiveMedia = $(this);
            progressiveMedia.removeClass('progressive-media-unloaded');
            progressiveMedia.addClass('progressive-media-loading');

            if ($(this).hasClass('progressive-media-image')) {
                var progressiveMediaImageAspectRatioInner = $('.progressive-media-aspect .progressive-media-aspect-inner', progressiveMedia);

                var image = new Image();
                image.src = $(this).data('img-src');
                image.className = 'progressive-media-image-original progressive-media-content';
                image.onload = function () {
                    $(progressiveMediaImageAspectRatioInner).append(image);
                    progressiveMedia.removeClass('progressive-media-loading');
                    progressiveMedia.addClass('progressive-media-loaded');
                };
            } else if ($(this).hasClass('progressive-media-iframe')) {
                this.querySelector('.progressive-media-aspect-inner').insertAdjacentHTML('beforeend', this.querySelector('noscript').innerText.trim());
                this.classList.remove('progressive-media-loading');
                this.classList.add('progressive-media-loaded');
            }
        }
    });
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
} catch (e) {
}

loadProgressiveMedia();
window.addEventListener('DOMContentLoaded', loadProgressiveMedia());
window.addEventListener('scroll', throttle(loadProgressiveMedia, 250), supportsPassive ? {capture: true, passive: true} : false);
window.addEventListener("resize", debounce(loadProgressiveMedia, 500), supportsPassive ? {capture: true, passive: true} : false);