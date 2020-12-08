export default function(group, _, __, graphData) {
    const { nodes, links } = graphData;

    const sphereGeometry = new THREE.SphereGeometry(.03, 5, 5, 0, Math.PI * 2, 0, Math.PI * 2);
    const sphereMaterial = new THREE.MeshNormalMaterial();

    const nodeKeyToSphere = {};

    const offsets = {
    x: 0,
    y: -500,
    z: 0,
    };

    const scale = .01;
    nodes.forEach(({ key, x, y }) => {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const r = 200 + (Math.random() - 0.5) * 50;
        sphere.position.x = scale * (r * Math.cos(x * 2 * Math.PI / 1500 + (Math.PI/2)) + offsets.x);
        sphere.position.y = scale * (y + offsets.y);
        sphere.position.z = scale * (r * Math.sin(x * 2 * Math.PI / 1500 + (Math.PI/2)) + offsets.z);
        nodeKeyToSphere[key] = sphere;
        group.add(sphere);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x555555
    });


    links.forEach(({ source, target }) => {
        const sourcePos = nodeKeyToSphere[source].position;
        const targetPos = nodeKeyToSphere[target].position;
        const geometry = new THREE.BufferGeometry().setFromPoints([
            sourcePos, targetPos
        ]);
        const line = new THREE.Line( geometry, lineMaterial );

        group.add(line);
    });

}
