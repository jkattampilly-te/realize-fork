import sceneGraph from './js/scene/sceneGraph.js';
import SceneParameters from './js/ui/SceneParameters.js';

AFRAME.registerComponent('graph-demo', {
    init: function () {


        const maxParticleCount = 500;
        const sceneZ = -12;
        const sceneParams = new SceneParameters(maxParticleCount);


        sceneGraph(this.el.object3D, sceneParams, sceneZ);
    }
});
