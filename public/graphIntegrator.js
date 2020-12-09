import sceneGraph from './js/scene/sceneGraph.js';
import SceneParameters from './js/ui/SceneParameters.js';
import cylinderScene from './js/cylinderScene';
import graphData1 from './sampleData.json';

const graphDataKeyToValue = {
    test1: graphData1,
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

        this.el.addEventListener('componentchanged', function (evt) {
            if (evt.detail.name === 'data-graph') {
                loadCylinderScene(this.el)
            }
        });
    },
});


function loadCylinderScene(el) {
    const graphDataKey = el.getAttribute('data-graph');
    const graphData = graphDataKeyToValue[graphDataKey];
    cylinderScene(el, graphData);
}
