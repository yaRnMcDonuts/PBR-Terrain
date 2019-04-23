package com.aaaaGames.pbrTerrain.test;
import com.jme3.app.SimpleApplication;
import com.jme3.asset.TextureKey;
import com.jme3.bounding.BoundingBox;
import com.jme3.bounding.BoundingSphere;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.light.DirectionalLight;
import com.jme3.light.LightProbe;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.math.Vector4f;
import com.jme3.scene.Node;
import com.jme3.system.AppSettings;
import com.jme3.terrain.geomipmap.TerrainLodControl;
import com.jme3.terrain.geomipmap.TerrainQuad;
import com.jme3.terrain.geomipmap.lodcalc.DistanceLodCalculator;
import com.jme3.terrain.heightmap.AbstractHeightMap;
import com.jme3.terrain.heightmap.ImageBasedHeightMap;
import com.jme3.texture.Texture;
import com.jme3.texture.Texture.WrapMode;


public class TestPBRTerrain extends SimpleApplication {

    private TerrainQuad terrain;
    Material matTerrain;
    boolean triPlanar = false;
    private float dirtScale = 16;
    private float darkRockScale = 32;
    private float pinkRockScale = 32;
    private float riverRockScale = 80;
    private float grassScale = 32;
    private float brickScale = 128;
    private float roadScale = 200;

    public static void main(String[] args) {
        TestPBRTerrain app = new TestPBRTerrain();
        AppSettings s = new AppSettings(true);
        s.setRenderer(AppSettings.LWJGL_OPENGL3);
        s.put("FrameRate", 140);
        
        app.setSettings(s);
        app.start();
        
        
       
        
       
    }

    @Override
    public void simpleInitApp() {
        setupKeys();

        // TERRAIN TEXTURE material
        matTerrain = new Material(assetManager, "MatDefs/shaders/AfflictedPBRTerrain.j3md");
        matTerrain.setBoolean("useTriPlanarMapping", false);
        matTerrain.setVector4("ProbeColor", new Vector4f(1, 1, 1, 1));

        // ALPHA map (for splat textures)
        matTerrain.setTexture("AlphaMap", assetManager.loadTexture("Textures/Terrain/splat/alpha1.png"));
        matTerrain.setTexture("AlphaMap_1", assetManager.loadTexture("Textures/Terrain/splat/alpha2.png"));
        // this material also supports 'AlphaMap_2', so you can get up to 12 diffuse textures

        // HEIGHTMAP image (for the terrain heightmap)
        TextureKey hmKey = new TextureKey("Textures/Terrain/splat/mountains512.png", false);
        Texture heightMapImage = assetManager.loadTexture(hmKey);

        // DIRT texture, Diffuse textures 0 to 3 use the first AlphaMap
        Texture dirt = assetManager.loadTexture("Textures/Terrain/splat/dirt.jpg");
        dirt.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_0", dirt);
        matTerrain.setFloat("AlbedoMap_0_scale", dirtScale);
        matTerrain.setFloat("Roughness_0", 1);
        matTerrain.setFloat("Metallic_0", 0);
        //matTerrain.setInt("AfflictionMode_0", 0);

        // DARK ROCK texture
        Texture darkRock = assetManager.loadTexture("Textures/Terrain/Rock2/rock.jpg");
        darkRock.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_1", darkRock);
        matTerrain.setFloat("AlbedoMap_1_scale", darkRockScale);
        matTerrain.setFloat("Roughness_1", 1);
        matTerrain.setFloat("Metallic_1", 0);
        //matTerrain.setInt("AfflictionMode_1", 0);

        // PINK ROCK texture
        Texture pinkRock = assetManager.loadTexture("Textures/Terrain/Rock/Rock.PNG");
        pinkRock.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_2", pinkRock);
        matTerrain.setFloat("AlbedoMap_2_scale", pinkRockScale);
        matTerrain.setFloat("Roughness_2", 1);
        matTerrain.setFloat("Metallic_2", 0);
        //matTerrain.setInt("AfflictionMode_2", 0);

        // RIVER ROCK texture, this texture will use the next alphaMap: AlphaMap_1
        Texture riverRock = assetManager.loadTexture("Textures/Terrain/Pond/Pond.jpg");
        riverRock.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_3", riverRock);
        matTerrain.setFloat("AlbedoMap_3_scale", riverRockScale);
        matTerrain.setFloat("Roughness_3", 1);
        matTerrain.setFloat("Metallic_3", 0);
        //matTerrain.setInt("AfflictionMode_3", 0);

        // GRASS texture
        Texture grass = assetManager.loadTexture("Textures/Terrain/splat/grass.jpg");
        grass.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_4", grass);
        matTerrain.setFloat("AlbedoMap_4_scale", grassScale);
        matTerrain.setFloat("Roughness_4", 1);
        matTerrain.setFloat("Metallic_4", 0);
        //matTerrain.setInt("AfflictionMode_4", 0);

        // BRICK texture
        Texture brick = assetManager.loadTexture("Textures/Terrain/BrickWall/BrickWall.jpg");
        brick.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_5", brick);
        matTerrain.setFloat("AlbedoMap_5_scale", brickScale);
        matTerrain.setFloat("Roughness_5", 1);
        matTerrain.setFloat("Metallic_5", 0);
        //matTerrain.setInt("AfflictionMode_5", 0);

        // ROAD texture
        Texture road = assetManager.loadTexture("Textures/Terrain/splat/road.jpg");
        road.setWrap(WrapMode.Repeat);
        matTerrain.setTexture("AlbedoMap_6", road);
        matTerrain.setFloat("AlbedoMap_6_scale", roadScale);
        matTerrain.setFloat("Roughness_6", 1);
        matTerrain.setFloat("Metallic_6", 0);
        //matTerrain.setInt("AfflictionMode_6", 0);

        // NORMAL MAPS
        Texture normalMapDirt = assetManager.loadTexture("Textures/Terrain/splat/dirt_normal.png");
        normalMapDirt.setWrap(WrapMode.Repeat);
        Texture normalMapPinkRock = assetManager.loadTexture("Textures/Terrain/Rock/Rock_normal.png");
        normalMapPinkRock.setWrap(WrapMode.Repeat);
        Texture normalMapGrass = assetManager.loadTexture("Textures/Terrain/splat/grass_normal.jpg");
        normalMapGrass.setWrap(WrapMode.Repeat);
        Texture normalMapRoad = assetManager.loadTexture("Textures/Terrain/splat/road_normal.png");
        normalMapRoad.setWrap(WrapMode.Repeat);
//        matTerrain.setTexture("NormalMap_0", normalMapDirt);
//        matTerrain.setTexture("NormalMap_1", normalMapPinkRock);
//        matTerrain.setTexture("NormalMap_2", normalMapPinkRock);
//        matTerrain.setTexture("NormalMap_4", normalMapGrass);
//        matTerrain.setTexture("NormalMap_6", normalMapRoad);

        // CREATE HEIGHTMAP
        AbstractHeightMap heightmap = null;
        try {
            heightmap = new ImageBasedHeightMap(heightMapImage.getImage(), 0.3f);
            heightmap.load();
            heightmap.smooth(0.9f, 1);

        } catch (Exception e) {
            e.printStackTrace();
        }

        
        terrain = new TerrainQuad("terrain", 65, 513, heightmap.getHeightMap());//, new LodPerspectiveCalculatorFactory(getCamera(), 4)); // add this in to see it use entropy for LOD calculations
        TerrainLodControl control = new TerrainLodControl(terrain, getCamera());
        control.setLodCalculator(new DistanceLodCalculator(65, 2.7f)); // patch size, and a multiplier
        terrain.addControl(control);
        terrain.setMaterial(matTerrain);
        terrain.setModelBound(new BoundingBox());
        terrain.updateModelBound();
        terrain.setLocalTranslation(0, -100, 0);
        terrain.setLocalScale(1f, 1f, 1f);
        rootNode.attachChild(terrain);

        Node probeNode = (Node) assetManager.loadModel("Scenes/lightprobe/fantasy-sky.j3o");
        LightProbe probe = (LightProbe) probeNode.getLocalLightList().iterator().next();
        probe.setPosition(new Vector3f(0, 0, 0));
        
        probe.setBounds(new BoundingSphere(500, probe.getPosition()));
        
        rootNode.addLight(probe);
        
        DirectionalLight light = new DirectionalLight();
        light.setDirection((new Vector3f(-0.1f, -0.1f, -0.1f)).normalize());
        light.setColor(ColorRGBA.White);
        rootNode.addLight(light);

        cam.setLocation(new Vector3f(0, 10, -10));
        cam.lookAtDirection(new Vector3f(0, -1.5f, -1).normalizeLocal(), Vector3f.UNIT_Y);
        flyCam.setMoveSpeed(400);
    }

    private void setupKeys() {
        flyCam.setMoveSpeed(50);
        inputManager.addMapping("triPlanar", new KeyTrigger(KeyInput.KEY_P));
        inputManager.addListener(actionListener, "triPlanar");
    }
    private ActionListener actionListener = new ActionListener() {

        public void onAction(String name, boolean pressed, float tpf) {
            if (name.equals("triPlanar") && !pressed) {
                triPlanar = !triPlanar;
                if (triPlanar) {
                    matTerrain.setBoolean("useTriPlanarMapping", true);
                    // planar textures don't use the mesh's texture coordinates but real world coordinates,
                    // so we need to convert these texture coordinate scales into real world scales so it looks
                    // the same when we switch to/from tr-planar mode (1024f is the alphamap size)
                    matTerrain.setFloat("AlbedoMap_0_scale", 1f / (float) (1024f / dirtScale));
                    matTerrain.setFloat("AlbedoMap_1_scale", 1f / (float) (1024f / darkRockScale));
                    matTerrain.setFloat("AlbedoMap_2_scale", 1f / (float) (1024f / pinkRockScale));
                    matTerrain.setFloat("AlbedoMap_3_scale", 1f / (float) (1024f / riverRockScale));
                    matTerrain.setFloat("AlbedoMap_4_scale", 1f / (float) (1024f / grassScale));
                    matTerrain.setFloat("AlbedoMap_5_scale", 1f / (float) (1024f / brickScale));
                    matTerrain.setFloat("AlbedoMap_6_scale", 1f / (float) (1024f / roadScale));
                } else {
                    matTerrain.setBoolean("useTriPlanarMapping", false);

                    matTerrain.setFloat("AlbedoMap_0_scale", dirtScale);
                    matTerrain.setFloat("AlbedoMap_1_scale", darkRockScale);
                    matTerrain.setFloat("AlbedoMap_2_scale", pinkRockScale);
                    matTerrain.setFloat("AlbedoMap_3_scale", riverRockScale);
                    matTerrain.setFloat("AlbedoMap_4_scale", grassScale);
                    matTerrain.setFloat("AlbedoMap_5_scale", brickScale);
                    matTerrain.setFloat("AlbedoMap_6_scale", roadScale);

                }
            }
        }
    };
}
