/**
 * script.js
 * スクロール時のセクションフェードインアニメーションを実装
 */

document.addEventListener('DOMContentLoaded', () => {
    // ターゲットとなる要素（js-fade-inクラスを持つ要素）を取得
    const fadeInElements = document.querySelectorAll('.js-fade-in');

    // Intersection Observerのオプションを設定
    const observerOptions = {
        root: null, // ビューポートをルートとして使用
        rootMargin: '0px',
        threshold: 0.1 // 要素が10%見えたらコールバックを実行
    };

    /**
     * 要素が見えたときに実行されるコールバック関数
     * @param {IntersectionObserverEntry[]} entries - 監視対象の要素の状態
     * @param {IntersectionObserver} observer - 自身を指すObserverインスタンス
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // 要素がビューポートに入ったら
            if (entry.isIntersecting) {
                // is-visibleクラスを追加してアニメーションを開始
                entry.target.classList.add('is-visible');
                // 一度アニメーションしたら監視を停止
                observer.unobserve(entry.target);
            }
        });
    };

    // Intersection Observerのインスタンスを作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 全てのフェードイン要素を監視対象に追加
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // ヒーローセクション（hero__content）は即座に表示（または小さな遅延で）
    // Intersection Observerで監視対象に含めているため、CSSの初期状態で非表示にし、
    // DOMContentLoaded直後にhero__contentのみにis-visibleを適用
    // （ここではCSSの初期状態で非表示になっているため、スクロールなしで表示させる）
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        // ロード時のアニメーション遅延のためsetTimeoutを使用
        setTimeout(() => {
            heroContent.classList.add('is-visible');
        }, 100); 
    }
});