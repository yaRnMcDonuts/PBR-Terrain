# AfflictedPbrTerrainConverter
PBR Terrain shader and a converter class for generating PBR material based off of a standard Phong terrain in JMonkjeyEngine3

1.) Initiate a new TerrainShaderConverter object

   >TerrainShaderConversion converter = new TerrainShaderConversion(String pbrAssetPath, String phongAssetPath)


2.) call this method to register a roughness and metallic value to the texture, as well as the desired texture scale
   (aliveVar can be ignored)
   > public void registerPBRParamsForTexture(String texKey, int aliveVar, float rough, float metal, float scale)
 
 example:
   >registerPBRParamsForTexture("Textures/ancientRoad1.jpg", 0, .99f, .09f, 32f);
 
3.) convert your terrin!

   >converter.convertToPBROnLoad(terrain, assetManager);
