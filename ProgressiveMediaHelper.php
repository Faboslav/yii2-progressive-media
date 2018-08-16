<?php

namespace faboslav\progressivemedia;

use Yii;
use yii\helpers\Html;

class ProgressiveMediaHelper
{
    public static function img(string $imgSrc, string $placeholderImgSrc, int $width, int $height, array $options = []) : string
    {
        $aspectRatio = ($height / $width) * 100;

        // Create img placeholder
        $imgPlaceholder = Html::tag('img', '', [
            'src' => $placeholderImgSrc,
            'crossorigin' => 'anonymous',
            'class' => 'progressive-media-image-placeholder progressive-media-content progressive-media-blur'
        ]);

        // Create image
        $img = Html::tag('img', '', merge(['src' => $src], $options));

        // Create noScript fallback
        $noScript = Html::tag('noscript', $imgSrc);
        $noScript = '';

        $aspectInner = Html::tag('div', $imgPlaceholder . $noScript, [
            'class' => 'aspect-inner'
        ]);

        $aspect = Html::tag('div', $aspectInner, [
            'class' => 'aspect',
            'style' => 'padding-bottom: ' . $aspectRatio . '%;',
        ]);

        return Html::tag('div', $aspect, [
            'class' => 'progressive-media progressive-media-image progressive-media-unloaded',
            'style' => 'max-width:' . $width . 'px; max-height:' . $height . 'px;',
            'data' => [
                'img-src' => $imgSrc,
            ]
        ]);
    }

    /**
     * @param string $src Link of the iframe
     * @param int $width
     * @param int $height
     * @param array $options
     * @return string
     */
    public static function iframe(string $src, int $width, int $height, array $options = []): string
    {
        $aspectRatio = ($height / $width) * 100;

        Html::addCssClass($options, 'progressive-media-content');

        // Create Iframe
        $iframe = Html::tag('iframe', '', merge(['src' => $src], $options));

        // Create noScript fallback
        $noScript = Html::tag('noscript', $iframe);

        $aspectInner = Html::tag('div', $noScript, [
            'class' => 'aspect-inner'
        ]);

        $aspect = Html::tag('div', $aspectInner, [
            'class' => 'aspect',
            'style' => 'padding-bottom: ' . $aspectRatio . '%;',
        ]);

        return Html::tag('div', $aspect, [
            'class' => 'progressive-media progressive-media-iframe progressive-media-unloaded',
            'data' => [
                'src' => $src,
            ]
        ]);
    }
}