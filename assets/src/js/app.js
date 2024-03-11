import '../scss/app.scss'
import './helpers/initSvgSprite'
import controls from './controls'

document.addEventListener('readystatechange', event => { 
    if (event.target.readyState.includes('complete')) {
        controls.init()
    }
})