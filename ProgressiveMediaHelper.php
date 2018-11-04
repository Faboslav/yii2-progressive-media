<?php

namespace faboslav\progressivemedia;

use Yii;
use yii\helpers\Html;

class ProgressiveMediaHelper
{
    /**
     * @param string $imgSrc
     * @param string $placeholderImgSrc
     * @param int $width
     * @param int $height
     * @param array $options
     * @return string
     */
    public static function img(string $imgSrc, string $placeholderImgSrc, int $width, int $height, array $options = []) : string
    {
        $aspectRatio = ($height / $width) * 100;

        // Create img placeholder
        $imgPlaceholder = Html::tag('img', '', [
            'src' => $placeholderImgSrc,
            'crossorigin' => 'anonymous',
            'class' => 'progressive-media-image-placeholder progressive-media-content progressive-media-blur'
        ]);

        // Create img placeholder
        $imgPlaceholderEdges = Html::tag('img', '', [
            'src' => $placeholderImgSrc,
            'crossorigin' => 'anonymous',
            'class' => 'progressive-media-image-placeholder progressive-media-image-placeholder-edge progressive-media-content'
        ]);

        // Create image
        $noScriptImg = Html::tag('img', '', merge(['src' => $imgSrc, 'class' => 'progressive-media-image-original progressive-media-content'], $options));

        // Create noScript fallback
        $noScript = Html::tag('noscript', $noScriptImg);

        $aspectInner = Html::tag('div', $imgPlaceholder . $imgPlaceholderEdges . $noScript, [
            'class' => 'progressive-media-aspect-inner'
        ]);

        $aspect = Html::tag('div', $aspectInner, [
            'class' => 'progressive-media-aspect',
            'style' => 'padding-bottom: ' . $aspectRatio . '%;',
        ]);

        $style = Html::cssStyleToArray($options['style']);

        if(!isset($style['max-width'])) {
            $style['max-width'] = $width . 'px';
        }

        if (!isset($style['max-height'])) {
            $style['max-height'] = $height . 'px';
        }

        return Html::tag('div', $aspect, [
            'class' => 'progressive-media progressive-media-image progressive-media-unloaded',
            'style' => Html::cssStyleFromArray($style),
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
        $iframe = Html::tag('iframe', '', merge(['src' => $src, 'class' => 'progressive-media-content'], $options));

        // Create noScript fallback
        $noScript = Html::tag('noscript', $iframe);

        $aspectInner = Html::tag('div', $noScript, [
            'class' => 'progressive-media-aspect-inner'
        ]);

        $aspect = Html::tag('div', $aspectInner, [
            'class' => 'progressive-media-aspect',
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