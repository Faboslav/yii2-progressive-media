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

