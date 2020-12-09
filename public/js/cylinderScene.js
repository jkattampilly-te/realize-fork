export default function(group, _, __, graphData, el) {
    const { nodes, links } = graphData;

    const offsets = {
        x: 50,
        y: -600,
        z: 50,
    };

    const scale = .01;
    const nodeKeyToSphere = {};
    const selected = {};
    nodes.forEach(({ key, x, y }) => {
        const r = 200 + (Math.random() - 0.5) * 50;
        const pos = {}
        pos.x = scale * (r * Math.cos(x * 2 * Math.PI / 1500 + (Math.PI/2)) + offsets.x);
        pos.y = scale * (y + offsets.y);
        pos.z = scale * (r * Math.sin(x * 2 * Math.PI / 1500 + (Math.PI/2)) + offsets.z);

        const sphereEl = document.createElement('a-sphere');
        sphereEl.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`)
        sphereEl.setAttribute('radius', .03);
        sphereEl.setAttribute('color', '#a082bf');
        sphereEl.setAttribute('class', 'collidable');

        ['hoverable', 'grabbable', 'stretchable', 'draggable', 'droppable'].forEach(
            prop => sphereEl.setAttribute(prop, true)
        );

        el.appendChild(sphereEl);

        sphereEl.addEventListener('hover-start', function(event) {
            if (!selected[key]) { 
                sphereEl.setAttribute('color', '#FFFFFF');
                sphereEl.setAttribute('radius', .05);
            }
        });

        sphereEl.addEventListener('hover-end', function(event) {
            if (!selected[key]) { 
                sphereEl.setAttribute('color', '#a082bf');
                sphereEl.setAttribute('radius', .03);
            }
        });

        sphereEl.onclick = function(event) {
            if (selected[key]) {
                sphereEl.setAttribute('color', '#a082bf');
                sphereEl.setAttribute('radius', .03);
            }
            else {
                sphereEl.setAttribute('color', '#fca903');
                sphereEl.setAttribute('radius', .07);
                selected[key] = true;
            }
        };

        nodeKeyToSphere[key] = pos;
    });

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x555555
    });


    links.forEach(({ source, target }) => {
        const sourcePos = nodeKeyToSphere[source];
        const targetPos = nodeKeyToSphere[target];
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(sourcePos.x, sourcePos.y, sourcePos.z),
            new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z)
        ]);
        const line = new THREE.Line( geometry, lineMaterial );

        group.add(line);
    });

}
