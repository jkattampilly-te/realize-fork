function createMinButton() {
    
}

AFRAME.registerComponent('hud', {
    dependencies: ['super-hands', 'raycaster'],
    init: function () {
        let sceneEl = document.querySelector('a-scene');
        let elem = this.el;
        let isMinimized = false;
        
        // Create dash element
        let hud = document.createElement('a-entity');
        hud.setAttribute('geometry', {
				primitive: 'box',
				width: 1,
				height: 1,
				depth: 1
			});
        // Position when rigged
        hud.setAttribute('position', '0.2 0 -1.5');
        // dash.setAttribute('position', '0.2 1 -1.5');
        hud.setAttribute('class', 'collidable');
        hud.setAttribute('hoverable');
        hud.setAttribute('clickable');
        hud.setAttribute('material', {
            color: '#323436'
        });
        hud.setAttribute('scale', {
            x: '1.2',
            y: '0.8',
            z: '0.05',
        });
        elem.appendChild(hud);
        hud.addEventListener('hover-start', function(event) {
            console.log('something happened');
            hud.setAttribute('material', {
                color: '#f8f8f8'
            });
            event.preventDefault();
        });
        
        hud.addEventListener('hover-end', function(event) {
            console.log('something happened');
            hud.setAttribute('material', {
                color: '#323436'
            });
            event.preventDefault();
        });
        
        hud.addEventListener('grab-start', function(event) {
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
        hand: {type: 'string', default: ''}
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
