import {loadImage} from './load';

// HTML： <img src="//mtshop1.meitudata.com/5b45d14bd95a367297.gif" lazy-original="https://mtshop1.meitudata.com/5aa7a73004bae16152.jpg" class="img-lazyload j-lazyload" />
// 加载可视区域的图片
export const lazyLoadImage = () => {
    let $domLazyImages = $('.j-lazyload').toArray();
    // let $domLazyImages = document.querySelectorAll('.lazy-image')
    let height = $(window).height();

    $domLazyImages.map(function (item, index) {
        let $dom = $(item);
        let {top, bottom} = $dom[0].getBoundingClientRect();

        // 正在加载中、已经加载、不在可视区则不重复加载
        if ($dom.hasClass('img-lazyloading') || $dom.hasClass('img-lazyloaded') || top > height || bottom <= 0) {
            return false;
        }

        $dom.addClass('img-lazyloading');
        let imageSrc = $dom.attr('lazy-original');
        loadImage([imageSrc]).then(() => {
            $dom.attr('src', imageSrc);
            $dom.removeClass('j-lazyload').removeClass('img-lazyloading').addClass('img-lazyloaded');
        });
    });
};