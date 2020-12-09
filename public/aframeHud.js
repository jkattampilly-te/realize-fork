AFRAME.registerComponent('switch-scene', {
    dependencies: ['super-hands', 'raycaster'],
    init: function () {
        this.el.addEventListener('grab-end', () => {
            const globe = document.querySelector('#globe-scene');
            const cylinder = document.querySelector('#cylinder-scene');
            const showGlobe = !globe.getAttribute('visible');
            if (showGlobe) {
                globe.setAttribute('visible', true);
                cylinder.setAttribute('visible', false);
            } else {
                globe.setAttribute('visible', false);
                cylinder.setAttribute('visible', true);
            }
        });
    }
});

AFRAME.registerComponent('test-button', {
    dependencies: ['super-hands', 'raycaster'],
    init: function () {
        const graphKey = this.el.getAttribute('data-graph');
        debugger
        this.el.addEventListener('grab-end', () => {
            const cylinder = document.querySelector('#cylinder-scene');
            const currentKey = cylinder.getAttribute('data-graph');
            if (currentKey !== graphKey) {
                cylinder.setAttribute('data-graph-key', graphKey);
            }
        });
    }
});

AFRAME.registerComponent('custom-super-hand', {
    schema: {
        hand: { type: 'string', default: '' }
    },
    init: function () {
        let elem = this.el;
        let data = this.data;
        elem.setAttribute('super-hands', `colliderEvent: raycaster-intersection;colliderEventProperty: els;colliderEndEvent: raycaster-intersection-cleared;colliderEndEventProperty: clearedEls`);
        elem.setAttribute('hand-controls', 'hand: ' + data.hand);
        elem.setAttribute('raycaster', 'objects: .collidable; far: 100; showLine: true');
        const cursorEl = document.createElement('a-cursor');
        cursorEl.setAttribute('raycaster', 'objects: .collidable');
        elem.appendChild(cursorEl);
    }
})

AFRAME.registerComponent('thumbstick-logging',{
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function (evt) {
        const camRig = document.querySelector('#cameraRig');
        const camRigPosition = camRig.getAttribute('position');
        camRig.setAttribute('position', {
            x: camRigPosition.x + evt.detail.x,
            y: camRigPosition.y,
            z: camRigPosition.z + + evt.detail.y
        })
    }
});
