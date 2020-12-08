import sceneGraph from './js/scene/sceneGraph.js';
import SceneParameters from './js/ui/SceneParameters.js';
import cylinderScene from './js/cylinderScene';
import graphData from './sampleData.json';

AFRAME.registerComponent('graph-demo', {
    init: function () {


        const maxParticleCount = 500;
        const sceneZ = -12;
        const sceneParams = new SceneParameters(maxParticleCount);

        // cylinderScene(this.el.object3D, null, null, graphData);

        sceneGraph(this.el.object3D, sceneParams, sceneZ);
    }
});
