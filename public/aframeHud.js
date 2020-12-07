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
            let positionStart = '0.2 0 -1.5';
            let positionEnd = '0.4 0 -1.5';
            let scaleStart = '1.2 0.8 0.05';
            let scaleEnd = '0.08 0.08 0.05';
            if (!isMinimized) {
                    hud.setAttribute('animation', {
                    property: 'scale',
                    from: scaleStart,
                    to: scaleEnd,
                    dur: '400'
                });
                
                hud.setAttribute('animation__2', {
                    property: 'position',
                    from: positionStart,
                    to: positionEnd,
                    dur: '400'
                });
                isMinimized = true;
            }
            else {
                hud.setAttribute('animation', {
                    property: 'scale',
                    from: scaleEnd,
                    to: scaleStart
                });
                hud.setAttribute('animation__2', {
                    property: 'position',
                    from: positionEnd,
                    to: positionStart,
                    dur: '400'
                });
                isMinimized = false;
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
