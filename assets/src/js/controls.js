import header from './components/header'
import roadmapSlider from './components/roadmap-slider'
import coppyElem from './components/coppy-elem'
import anchor from './components/anchor'


const controls = {
	components: {
		anchor,
		header,
		coppyElem,
		roadmapSlider
	},
	init () {
		Object.values(this.components)
			.forEach(ct => typeof ct.init === 'function' && ct.init())
	}
}

export default controls