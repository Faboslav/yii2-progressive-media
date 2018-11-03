# Yii2 Progressive Media
## Installation
The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require faboslav/yii2-progressive-media "1.0.0"
```

or add

```
"faboslav/yii2-progressive-media ": "1.0.0"
```

to the `require` section of `composer.json` file.

## Preview
![Yii2 Progressive Media Preview](https://i.imgur.com/rg3fBtT.gif)

This package is primary an attempt to copy lazy loading effect from the Medium website.

Only images and iframes rendered by instructions writed below and visible in the area of viewport of the user are loaded.
Actually there is an half of the viewport offset to top and bottom in addition to the original viewport area in which are the progressive media loading.

For both images and iframes there is no script fallback for cases when javascript is disabled.

##### Images
Blurred placeholder image with resolution of maximum 44x44px is visible until the image with full resolution is loaded and then faded into page.

##### Iframes
Background styled by CSS is visible until iframe is loaded.

## Usage
Register asset bundle
```php
\faboslav\progressivemedia\ProgressiveMediaAssetBundle::register(\Yii::$app->view);
```

##### Rendering images using Progressive Media Helper
```php
echo \faboslav\progressivemedia\ProgressiveMediaHelper::img($imageUrl, $placeholderImgUrl, $width, $height, $options);
```

##### Rendering images manually
```html
<div class="progressive-media progressive-media-image progressive-media-unloaded" style="max-width: {WIDTH}px; max-height: {HEIGHT}px;" data-img-src="{IMG_URL}">
    <div class="progressive-media-aspect" style="padding-bottom: {WIDTH_x_HEIGHT_ASPECT_RATIO}%;">
        <div class="progressive-media-aspect-inner">
            <img class="progressive-media-image-placeholder progressive-media-content progressive-media-blur" src="{PLACEHOLDER_IMG_URL}">
            <img class="progressive-media-image-placeholder progressive-media-image-placeholder-edge progressive-media-content" src="{PLACEHOLDER_IMG_URL}">
        </div>
    </div>
</div>
```

##### Rendering images using Progressive Media Helper
```php
echo \faboslav\progressivemedia\ProgressiveMediaHelper::iframe($iframeSrc, $width, $height, $options);
```

##### Rendering iframes manually
```html
<div class="progressive-media progressive-media-iframe progressive-media-unloaded" data-src="{IFRAME_URL}">
    <div class="progressive-media-aspect" style="padding-bottom: {WIDTH_x_HEIGHT_ASPECT_RATIO}%;">
        <div class="progressive-media-aspect-inner">
            <noscript>
                <iframe class="progressive-media-content" src="{IFRAME_URL}"></iframe>
            </noscript>
         </div>
    </div>
</div>
```

## License
MIT