export default function(el, graphData) {
    const group = el.object3D;
    const { nodes, links } = graphData;

    const offsets = {
        x: 0,
        y: -600,
        z: 0,
    };

    const scale = .01;
    const nodeKeyToSphere = {};
    const selected = {};
    const yScale = .8;

    const colors = [
        '#08A4BA',
        '#33DAEC',
        '#03475E',
        '#A6D5B0'
    ];
    nodes.forEach(({ key, x, y }) => {
        const r = 300 + (Math.random() - 0.5) * 50;
        const pos = {}
        pos.x = scale * (r * Math.cos(x * 2 * Math.PI / 1200 + (Math.PI/3)) + offsets.x);
        pos.y = yScale * scale * (y + offsets.y);
        pos.z = scale * (r * Math.sin(x * 2 * Math.PI / 1200 + (Math.PI/3)) + offsets.z);

        const sphereEl = document.createElement('a-sphere');
        sphereEl.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`)

        const radius = .03 + Math.random() * 0.03;
        const color = pickRandom(colors);
        sphereEl.setAttribute('radius', radius);
        sphereEl.setAttribute('color', color);
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
                sphereEl.setAttribute('color', color);
                sphereEl.setAttribute('radius', radius);
            }
        });

        sphereEl.onclick = function(event) {
            const tipElem = document.querySelector('#node-tip');

            if (selected[key]) {
                sphereEl.setAttribute('color', color);
                sphereEl.setAttribute('radius', radius);
                tipElem.setAttribute('visible', false);
            }
            else {
                sphereEl.setAttribute('color', '#fca903');
                sphereEl.setAttribute('radius', .07);
                tipElem.setAttribute('visible', true);

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


function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
