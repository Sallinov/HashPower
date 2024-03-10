import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const $dimer = document.querySelector('.js-dimer')
const $header = document.querySelector('.js-header')
const $marker = $header.querySelector('.js-marker')
let $activeLink = $header.querySelector('.active').closest('.header__list-item')
let burgerStatus = window.innerWidth <= 959

function markerPositionChange ($link) {
    let indent, ratio, result
    if (burgerStatus) {
        indent = $link.offsetTop
        ratio = $link.offsetHeight + ($marker.offsetHeight / 2)
        result = indent - (ratio)
    } else {
        indent = $link.offsetLeft
        ratio = $link.offsetWidth - $marker.offsetWidth
        result = indent + (ratio / 2)
    }
    $marker.style.transform = `translate${burgerStatus ? 'Y' : 'X'}(${result}px)`
}

function toggleHeader () {
    $header.classList.toggle('open')
    $dimer.classList.toggle('show')
    if ($header.classList.contains('open')) {
        disableBodyScroll(document.body)
    } else {
        enableBodyScroll(document.body)
    }
}

function initHeader () {
    setTimeout( () => markerPositionChange($activeLink), 0 )
    setTimeout( () => $header.classList.remove('no-animate') , 222 )

    $header.addEventListener('click', event => {
        if (event.target.closest('.header__link:not(.active)')) {
            const $link = event.target.closest('.header__link')
            $header.querySelector('.active').classList.remove('active')
            $link.classList.add('active')
            $activeLink = $link.closest('.header__list-item')
            markerPositionChange($activeLink)
            toggleHeader()
        }
        if (event.target.closest('.js-header-btn')) {
            toggleHeader()
        }
    })

    document.body.addEventListener('click', event => {
        if (event.target.closest('.js-dimer.show') && $header.classList.contains('open')) {
            toggleHeader()
        }
    })

    window.addEventListener('resize', () => {
        burgerStatus = window.innerWidth <= 959
        $header.classList.remove('open')
        markerPositionChange($activeLink)
    })
}

export default {
    init: initHeader
}