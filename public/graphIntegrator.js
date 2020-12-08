import navContext from './js/navContext.js';
import sceneGraph from './js/scene/sceneGraph.js';
import uiControls from './js/ui/uiControls.js';
import FogGUIHelper from './js/ui/FogUIHelper.js';
import SceneParameters from './js/ui/SceneParameters.js';

AFRAME.registerComponent('graphDemo', {
    init: function () {


        const maxParticleCount = 500;
        const sceneZ = -12;
        const sceneParams = new SceneParameters(maxParticleCount);

        const onShowPointsChange = value => group.showPointCloud(value);
        const onShowLinesChange = value => group.showLineMesh(value);

        const context = navContext('container', sceneZ);
        const fogHelper = new FogGUIHelper(context.getScene());

        const controls = uiControls(fogHelper, sceneParams, onShowPointsChange, onShowLinesChange);

        const group = sceneGraph(sceneParams, sceneZ);
        context.setSceneRoot(group);

        animate();

        this.el.setObject3D(context.getScene());

        function animate() {
            group.animate();
            requestAnimationFrame(animate);
            context.render();
        }
    }
});
