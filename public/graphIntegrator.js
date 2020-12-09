import sceneGraph from './js/scene/sceneGraph.js';
import SceneParameters from './js/ui/SceneParameters.js';
import cylinderScene from './js/cylinderScene';
import graphData from './sampleData.json';

const maxParticleCount = 500;
const sceneParams = new SceneParameters(maxParticleCount);
AFRAME.registerComponent('globe-scene', {
    init: function () {
        const sceneZ = -12;
        sceneGraph(this.el.object3D, sceneParams, sceneZ);
    }
});

AFRAME.registerComponent('cylinder-scene', {
    init: function () {
        cylinderScene(this.el.object3D, null, null, graphData, this.el);
    }
});
