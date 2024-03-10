function initCoppy () {
    const $copyElems = document.querySelectorAll('.js-copy')
    $copyElems.forEach($elem => {
        $elem.onclick = event => {
            const $btn = event.target.closest('.js-copy')
            const $taret = $btn.querySelector(`${$btn.dataset.target}`)
            const $result = $btn.querySelector('.js-copy-result')
            let coppiedVal
            if ($btn.dataset.target.includes('field') || $btn.dataset.target.includes('input')) {
                coppiedVal = $taret.value
            } else {
                coppiedVal = $taret.innerHTML
            }
            navigator.clipboard.writeText(coppiedVal)
            if ($result) {
                $result.classList.add('show')
                setTimeout( () => $result.classList.remove('show'), 1000 )
            }
        }
    })
}

export default {
    init: initCoppy
}