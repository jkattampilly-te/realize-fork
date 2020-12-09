import sceneGraph from './js/scene/sceneGraph.js';
import SceneParameters from './js/ui/SceneParameters.js';
import cylinderScene from './js/cylinderScene';
import graphData1 from './sampleData.json';

const graphDataKeyToValue = {
    test1: graphData1,
    test2: {
        nodes: [],
        links: [],
    }
}

const maxParticleCount = 500;
const sceneParams = new SceneParameters(maxParticleCount);
AFRAME.registerComponent('globe-scene', {
    init: function () {
        const sceneZ = -12;
        const group = sceneGraph(this.el.object3D, sceneParams, sceneZ);

        animate(group);
        function animate() {
            group.animate();
            requestAnimationFrame(animate);
        }
    }
});

AFRAME.registerComponent('cylinder-scene', {
    init: function () {
        loadCylinderScene(this.el);
    },
});

AFRAME.registerComponent('test-button', {
    dependencies: ['super-hands', 'raycaster'],
    init: function () {
        const graphKey = this.el.getAttribute('data-graph');
        this.el.addEventListener('grab-end', () => {
            const cylinder = document.querySelector('#cylinder-scene');
            const currentKey = cylinder.getAttribute('data-graph');
            if (currentKey !== graphKey) {
                loadCylinderScene(cylinder, graphKey)
            }
        });
    }
});


function loadCylinderScene(el, graphKey) {
    const graphDataKey = graphKey || el.getAttribute('data-graph');
    const graphData = graphDataKeyToValue[graphDataKey];
    cylinderScene(el, graphData);
}
