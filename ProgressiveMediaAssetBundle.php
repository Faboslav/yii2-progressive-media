<?php

namespace faboslav\progressivemedia;

use yii\web\AssetBundle;

class ProgressiveMediaAssetBundle extends AssetBundle
{
    public $sourcePath = '@vendor/faboslav/yii2-progressive-media/assets';

    public $js = [
        'js/progressive-media.min.js',
    ];

    public $css = [
        'css/progressive-media.min.css'
    ];
}