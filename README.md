# Important Notes:

- To generate a PBR Terrain with code, see this example
https://github.com/yaRnMcDonuts/AfflictedPbrTerrainConverter/blob/master/PBRTerrain/TestPBRTerrain.java#L59


- To use the AfflictedPBRTerrain shader with an existing Terrain loaded from a j3o file (i.e. terrains created with the SDK), you can use the TerrainShaderConversion object in order to register roughness and metallic values to each texture slot, and finally generate a new PBR material for your Terrain.


1.) Initiate a new TerrainShaderConversion object

   >TerrainShaderConversion converter = new TerrainShaderConversion(String pbrAssetPath, String phongAssetPath)


2.) Use this method to register a roughness and metallic value to the texture, as well as the desired texture scale
   (int aliveVar can be ignored)
   > public void registerPBRParamsForTexture(String texKey, int aliveVar, float rough, float metal, float scale)
 
 example:
   > converter.registerPBRParamsForTexture("Textures/ancientRoad1.jpg", 0, .99f, .09f, 32f);
   > converter.registerPBRParamsForTexture("Textures/sandDunes0.jpg", 0, .89f, .2f, 32f);
 
3.) convert the terrain with the convertToPBROnLoad() method

   >converter.convertToPBROnLoad(terrain, assetManager);


 
