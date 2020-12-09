function createMinButton() {

}

AFRAME.registerComponent('hud', {
    dependencies: ['super-hands', 'raycaster'],
    init: function () {
        // const sceneEl = document.querySelector('a-scene');
        const elem = this.el;

        // Create dash element
        const hud = document.createElement('a-entity');
        hud.setAttribute('geometry', {
            primitive: 'box',
            width: 0.15,
            height: 0.15,
            depth: 0.01
        });

        // Position when rigged
        hud.setAttribute('position', '-0.333 -0.333 -1.5');
        hud.setAttribute('rotation', '-30 30 0');

        hud.setAttribute('class', 'collidable');
        hud.setAttribute('hoverable');
        hud.setAttribute('clickable');
        hud.setAttribute('material', {
            color: '#f00'
        });

        elem.appendChild(hud);
        hud.addEventListener('hover-start', function (event) {
            console.log('something happened');
            hud.setAttribute('material', {
                color: '#0f0'
            });
            event.preventDefault();
        });

        hud.addEventListener('hover-end', function (event) {
            console.log('something happened');
            hud.setAttribute('material', {
                color: '#f00'
            });
            event.preventDefault();
        });

        hud.addEventListener('grab-start', function (event) {
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
