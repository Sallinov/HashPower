function requireAll (r) {
	r.keys().forEach(r)
}

requireAll(require.context('../../imgs/svg-sprite/', true, /\.svg$/))