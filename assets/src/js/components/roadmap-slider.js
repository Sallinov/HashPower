import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

function initRoadmapSlider () {
    const $subPagination = document.querySelector('.js-roadmap-sub-pagination')
    const swiper = new Swiper(
        '.js-roadmap-slider',
        {
            modules: [Navigation, Pagination],
            pagination: {
                clickable: true,
                el: '.swiper-pagination',
                renderBullet: function (index, className) {
                    $subPagination.innerHTML += `
                        <li data-index="${index}" class="roadmap__sub-tab ${index === 0 ? 'active' : ''}"></li>
                    `
                    return `<li class="${className} roadmap__tab">
                        STAGE ${index + 1}
                    </li>`
                },
            },
            navigation: {
                nextEl: '.js-roadmap-btn-next',
                prevEl: '.js-roadmap-btn-prev',
            },
            on: {
                realIndexChange: function () {
                    const $bullets = document.querySelectorAll('.swiper-pagination-bullet')
                    const $subBullets = document.querySelectorAll('.roadmap__sub-tab')
                    $bullets.forEach(($bullet, key) => {
                        if (key === this.activeIndex) {
                            $subBullets[key].classList.add('active')
                        } else {
                            $subBullets[key].classList.remove('active')
                        }
                    })
                }
            }
        }
    )
    $subPagination.addEventListener('click', event => {
        if (event.target.closest('[data-index]')) {
            const $tab = event.target.closest('[data-index]')
            swiper.slideTo(parseInt($tab.dataset.index))
        }
    })
}

export default {
    init: initRoadmapSlider
}