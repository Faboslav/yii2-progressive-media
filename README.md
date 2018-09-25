# Yii2 Progressive Media
## Installation
The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require faboslav/yii2-progressive-media "*"
```

or add

```
"faboslav/yii2-progressive-media ": "*"
```

to the `require` section of `composer.json` file.

## Usage
Register asset bundle 
```php
\faboslav\progressivemedia\ProgressiveMediaAssetBundle::register(\Yii::$app->view);
```

#### Rendering images
```php
echo \faboslav\progressivemedia\ProgressiveMediaHelper::img($imageUrl, $placeholderImgUrl, $width, $height) ?>
```

### Triggering progressive media (lazy load)
Basic ways to get lazy-load working

#### On load
```javascript
window.addEventListener('DOMContentLoaded', loadProgressiveMedia());
```
#### On scroll event
Basic scroll event listener,
```javascript
window.addEventListener('scroll', loadProgressiveMedia());
```

#### On resize event
Basic scroll event listener,
```javascript
window.addEventListener('scroll', loadProgressiveMedia());
```

#### More optimalized 
Scroll and resize event listeners with throttle/debounce and passive event listeners
```javascript
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

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

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

window.addEventListener('scroll', throttle(loadProgressiveMedia, 250), supportsPassive ? {capture: true, passive: true} : false);
```
