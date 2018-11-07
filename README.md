ProgressiveMedia is a fast, optimalized and lightweight library written in plain vanilla javascript. 

It's focus is on eliminating unnecessary loading of non visible images and iframes and thus speeding up the web application.
Only images and iframes which are visible in the viewport and it's configured offset are smoothly loaded, loading is also considered in the resize event.

Progressive media is always auto initialized.
You can [configure](https://github.com/Faboslav/progressive-media#configurables) ProgressiveMedia by setting up the `progressiveMediaOptions` variable

Loading process of images is heavely inspired by the [Medium](https://medium.com/) website. Here is a preview:

![Yii2 Progressive Media Preview](https://i.imgur.com/rg3fBtT.gif)

## Installation
The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer require faboslav/yii2-progressive-media "1.0.0"
```

or add

```
"faboslav/yii2-progressive-media ": "1.0.0"
```

to the `require` section of `composer.json` file.

## Usage
Register asset bundle
```php
\faboslav\progressivemedia\ProgressiveMediaAssetBundle::register(\Yii::$app->view);
```

### Rendering images
Recommended resolution for image placeholders is maximum of 44x44px.

#### Rendering using ProgressiveMediaHelper
```php
echo \faboslav\progressivemedia\ProgressiveMediaHelper::img($imageUrl, $placeholderImgUrl, $width, $height, $options);
```

#### Rendering manually
```html
<div class="progressive-media progressive-media-image progressive-media-unloaded" style="max-width: {WIDTH}px; max-height: {HEIGHT}px;" data-img-src="{IMG_URL}">
    <div class="progressive-media-aspect" style="padding-bottom: {WIDTH_x_HEIGHT_ASPECT_RATIO}%;">
        <div class="progressive-media-aspect-inner">
            <img class="progressive-media-image-placeholder progressive-media-content progressive-media-blur" src="{PLACEHOLDER_IMG_URL}">
            <img class="progressive-media-image-placeholder progressive-media-image-placeholder-edge progressive-media-content" src="{PLACEHOLDER_IMG_URL}">
            <noscript>
                <img src="{IMG_URL}" class="progressive-media-image-original progressive-media-content">
            </noscript>
        </div>
    </div>
</div>
```

### Rendering iframes

#### Using ProgressiveMediaHelper
```php
echo \faboslav\progressivemedia\ProgressiveMediaHelper::iframe($iframeSrc, $width, $height, $options);
```

#### Rendering manually
```html
<div class="progressive-media progressive-media-iframe progressive-media-unloaded" data-src="{IFRAME_URL}">
    <div class="progressive-media-aspect" style="padding-bottom: {WIDTH_x_HEIGHT_ASPECT_RATIO}%;">
        <div class="progressive-media-aspect-inner">
            <noscript>
                <iframe src="{IFRAME_URL}" class="progressive-media-content"></iframe>
            </noscript>
         </div>
    </div>
</div>
```

## License
MIT
