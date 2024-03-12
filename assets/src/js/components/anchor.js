import { markerPositionChange } from '../components/header'

const $anchors = document.querySelectorAll('.js-anchor')
const $header = document.querySelector('.js-header')
let statusAnchorClick = false
let buffer_scroll_position = window.scrollY

function activeByScroll () {
    $anchors.forEach($anchor => {
        const topScroll = window.scrollY
        const $target = document.querySelector($anchor.getAttribute('href'))
        const min = $target.offsetTop - ($header.offsetHeight * 2)
        const max = $target.offsetTop + $target.offsetHeight - ($header.offsetHeight * 2)
        if (topScroll >= min && topScroll <= max) {
            markerPositionChange($anchor.closest('.header__list-item'))
        }
    })
}

function doScrolling(elementY, duration) { 
    const startingY = window.scrollY
    const diff = elementY - startingY
    let start
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      const time = timestamp - start
      const percent = Math.min(time / duration, 1)
      window.scrollTo(0, startingY + diff * percent)
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }

function initAnchor () {
    $header.addEventListener('click', event => {
        if (event.target.closest('.js-anchor')) {
            event.preventDefault()
            const $anchor = event.target.closest('.js-anchor')
            statusAnchorClick = true
            const href = $anchor.getAttribute('href')
            doScrolling(
                document.querySelector(href).offsetTop,
                222
            )
        }
    })
    window.addEventListener('scroll', () => {
        if (!statusAnchorClick) {
            activeByScroll()
        } else {
            buffer_scroll_position = window.scrollY
        }
    })

    window.addEventListener('scrollend', () => {
        statusAnchorClick = !buffer_scroll_position === window.scrollY
    })

    window.addEventListener('DOMContentLoaded', activeByScroll())
}

export default {
    init: initAnchor
}