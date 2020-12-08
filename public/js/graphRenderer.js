import * as THREE from 'three/build/three.module.js';;
import navContext from './navContext.js';
import sceneGraph from './scene/sceneGraph.js';
import uiControls from './ui/uiControls.js';
import FogGUIHelper from './ui/FogUIHelper.js';
import SceneParameters from './ui/SceneParameters.js';


export default async function(maxParticleCount, sceneZ) {

    const sceneParams = new SceneParameters(maxParticleCount);

    const onShowPointsChange = value => group.showPointCloud(value);
    const onShowLinesChange = value => group.showLineMesh(value);

    const context = await navContext('container', sceneZ);
    const fogHelper = new FogGUIHelper(context.getScene());

    const controls = uiControls(fogHelper, sceneParams, onShowPointsChange, onShowLinesChange);

    const group = sceneGraph(sceneParams, sceneZ);
    context.setSceneRoot(group);

    animate();

    function animate() {
        group.animate();
        requestAnimationFrame(animate);
        context.render();
    }
}
