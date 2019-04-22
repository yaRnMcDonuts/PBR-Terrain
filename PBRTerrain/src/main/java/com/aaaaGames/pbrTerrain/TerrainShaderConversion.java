/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CoreAppClasses.Settings.ShaderConverter;

import com.jme3.asset.AssetManager;
import com.jme3.material.MatParam;
import com.jme3.material.Material;
import com.jme3.material.MaterialDef;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.Spatial;
import com.jme3.shader.VarType;
import com.jme3.terrain.Terrain;
import com.jme3.texture.Texture;
import com.jme3.util.SafeArrayList;
import java.util.HashMap;

/**
 *
 * @author ryan
 */
public class TerrainShaderConversion implements ConversionRelationship{
    
      
    private String pbrShaderString, phongShaderString;
    
    @Override
    public String getPbrString() { return pbrShaderString;  }
    @Override
    public String getPhongString() {  return phongShaderString; }
    
    
    public TerrainShaderConversion(String pbrAssetPath, String phongAssetPath) {
        pbrShaderString = pbrAssetPath;
        phongShaderString = phongAssetPath;
        
        
        registerTextures();
    }
    
    
    
    private HashMap <String, Integer> textureAliveValues = new HashMap();
    private HashMap <String, Float> textureRoughnessValues = new HashMap();
    private HashMap <String, Float> textureMetallicValues = new HashMap();
    private HashMap <String, Float> textureScales = new HashMap();
    
    
    public void registerTextures(){
        
        
        
        
        //dirt3
        textureAliveValues.put("Textures/dirt3.jpg", 1);
        textureRoughnessValues.put("Textures/dirt3.jpg", 1f);
        textureMetallicValues.put("Textures/dirt3.jpg", .06f);
        textureScales.put("Textures/dirt3.jpg", 24f);
        
        //jungleGrass
        textureAliveValues.put("Textures/jungleGrass.jpg", 2);
        textureRoughnessValues.put("Textures/jungleGrass.jpg", .975f);
        textureMetallicValues.put("Textures/jungleGrass.jpg", .03f);
        textureScales.put("Textures/jungleGrass.jpg", 64f);
        
        //jungleGrass0
        textureAliveValues.put("Textures/jungleGrass0.jpg", 2);
        textureRoughnessValues.put("Textures/jungleGrass0.jpg", .975f);
        textureMetallicValues.put("Textures/jungleGrass0.jpg", .03f);
        textureScales.put("Textures/jungleGrass0.jpg", 64f);
        
        
        
        //grassDirt0
        textureAliveValues.put("Textures/grassDirt0.jpg", 1);
        textureRoughnessValues.put("Textures/grassDirt0.jpg", .98f);
        textureMetallicValues.put("Textures/grassDirt0.jpg", .023f);
        textureScales.put("Textures/grassDirt0.jpg", 32f);
        
        
        //dirt0
        textureAliveValues.put("Textures/dirt0.jpg", 1);
        textureRoughnessValues.put("Textures/dirt0.jpg", 1f);
        textureMetallicValues.put("Textures/dirt0.jpg", .06f);
        textureScales.put("Textures/dirt0.jpg", 16f);
        
         //rock0
        textureAliveValues.put("Textures/rock0.jpg", 4);
        textureRoughnessValues.put("Textures/rock0.jpg", .97f);
        textureMetallicValues.put("Textures/rock0.jpg", .11f);
        textureScales.put("Textures/rock0.jpg", 8f);
        
        //darkRock0
        textureAliveValues.put("Textures/darkRock0.jpg", 4);
        textureRoughnessValues.put("Textures/darkRock0.jpg", .91f);
        textureMetallicValues.put("Textures/darkRock0.jpg", .11f);
        textureScales.put("Textures/darkRock0.jpg", 8f);
        
        //sand0
        textureAliveValues.put("Textures/sand0.jpg", 3);
        textureRoughnessValues.put("Textures/sand0.jpg", .69f);
        textureMetallicValues.put("Textures/sand0.jpg", .14f);
        textureScales.put("Textures/sand0.jpg", 32f);
        
        //rockPath0
        textureAliveValues.put("Textures/rockPath0.jpg", 4);
        textureRoughnessValues.put("Textures/rockPath0.jpg", .96f);
        textureMetallicValues.put("Textures/rockPath0.jpg", .15f);
        textureScales.put("Textures/rockPath0.jpg", 12f);
        
        //ancientRoad0
        textureAliveValues.put("Textures/ancientRoad0.jpg", 0);
        textureRoughnessValues.put("Textures/ancientRoad0.jpg", .99f);
        textureMetallicValues.put("Textures/ancientRoad0.jpg", .09f);
        textureScales.put("Textures/ancientRoad0.jpg", 24f);
        
        
         //grass0.png
        textureAliveValues.put("Textures/grass0.png", 1);
        textureRoughnessValues.put("Textures/grass0.png", .93f);
        textureMetallicValues.put("Textures/grass0.png", .08f);
        textureScales.put("Textures/grass0.png", 32f);
               
        //ancientRoad1
        registerPBRParamsForTexture("Textures/ancientRoad1.jpg", 0, .99f, .09f, 32f);
        
       //crystalRockFace0
        registerPBRParamsForTexture( "Textures/crystalRockFace0.jpg", 0, .48f, .65f, 16);
        
    }
    
    public void registerPBRParamsForTexture(String texKey, int aliveVar, float rough, float metal, float scale){
        textureAliveValues.put(texKey, aliveVar);
        textureRoughnessValues.put(texKey, rough);
        textureMetallicValues.put(texKey, metal);
        textureScales.put(texKey, scale);
    }

    @Override
    public void convertToPhong(Geometry geo, AssetManager assetManager) {
       
        
    }

    @Override
    public void revertToPBR(Geometry geo, AssetManager assetManager) {
       
        
    }
    

    //returns material, in case its needed for shizz like AfflictedZones quest, or if textures are needed else wehre for stuff like a wind texture map
    public Material convertToPBROnLoad(Terrain terrain, AssetManager assetManager) {
        Material afflictedPbrMat = createPbrTerrainMaterial(terrain.getMaterial(), assetManager);
        
        setupTerrainMaterials((Spatial) terrain, afflictedPbrMat);
        
        return afflictedPbrMat;
    }
    
       public Material createPbrTerrainMaterial(Material oldMat, AssetManager assetManager){
           
            Material afflictedTerrainMat = new Material((MaterialDef) assetManager.loadAsset(pbrShaderString));
            
            
            
            
            if(oldMat.getParam("useTriPlanarMapping") != null){
          //     afflictedTerrainMat.setParam("useTriPlanarMapping", VarType.Boolean, oldMat.getParam("useTriPlanarMapping").getValue());
          afflictedTerrainMat.setParam("useTriPlanarMapping", VarType.Boolean, false);
            }
            
                    //set alpha maps
             for(int a = 0; a < 3; a ++){
                 MatParam param;
                String index = "";  //terrain shader doesnt use 0 index for just the diffuse map
                if(a > 0){
                    index = "_" + a;
                }
                
               param = oldMat.getParam("AlphaMap" + index);
                if(param != null){
                    afflictedTerrainMat.setParam("AlphaMap" + index, VarType.Texture2D, (Texture) param.getValue());
                }
                 
             }
           
            for(int i = 0; i < 12; i ++){
                MatParam param;
                String oldindex = "";  //terrain shader doesnt use 0 index for just the diffuse map
                if(i > 0){
                     oldindex = "_" + i;
                }
                
                String newIndex = "_" + i;
                
               param = oldMat.getParam("DiffuseMap" + oldindex);
                if(param != null){  
                    String texName = ((Texture)param.getValue()).getName();
                    
                    afflictedTerrainMat.setParam("AlbedoMap" + newIndex, VarType.Texture2D, param.getValue());
                    float scale = (float) oldMat.getParam("DiffuseMap_" + i + "_scale").getValue();
                    
                    
                    if(textureScales.get(texName) != null){
                        scale = textureScales.get(texName);
                    }
                    else{
                        scale = 4f;
                    }
                    
                    
                    afflictedTerrainMat.setParam("AlbedoMap_" + i + "_scale", VarType.Float, scale);
                                    
                    
                //sets alive, roughness, and metallic params for AfflictedShader
                    if(textureAliveValues.get(texName) != null){
                        int afflictionMode = 0;
                        afflictionMode = textureAliveValues.get(texName);
                        afflictedTerrainMat.setParam("AfflictionMode_" + i, VarType.Int, afflictionMode);
                    }
                    
                    if(textureRoughnessValues.get(texName) != null){
                        afflictedTerrainMat.setParam("Roughness_" + i, VarType.Float, textureRoughnessValues.get(texName));
                    }
                    
                    if(textureMetallicValues.get(texName) != null){
                        afflictedTerrainMat.setParam("Metallic_" + i, VarType.Float, textureMetallicValues.get(texName));
                    }
                    
                }
                
                 param = oldMat.getParam("NormalMap" + oldindex);
                if(param != null){
                //    afflictedTerrainMat.setParam("NormalMap" + newIndex, VarType.Texture2D, param.getValue());
                }
            }
            MatParam afflictionParam = oldMat.getTextureParam("AfflictionTexture");
            if(afflictionParam != null){
                afflictedTerrainMat.setParam("AfflictionTexture", VarType.Texture2D, afflictionParam.getValue());
            }
            
            MatParam plaguedAlbedoMapParam = oldMat.getTextureParam("PlaguedAlbedoMap");
            if(plaguedAlbedoMapParam != null){
                afflictedTerrainMat.setParam("PlaguedAlbedoMap", VarType.Texture2D, plaguedAlbedoMapParam.getValue());
            }
            
            MatParam plaguedNormalMapParam = oldMat.getTextureParam("PlaguedNormalMap");
            if(plaguedNormalMapParam != null){
                afflictedTerrainMat.setParam("PlaguedNormalMap", VarType.Texture2D, plaguedNormalMapParam.getValue());
            }
            
            
            MatParam plaguedMapScaleParam = oldMat.getParam("PlaguedMapScale");
            if(plaguedMapScaleParam != null){
                afflictedTerrainMat.setParam("PlaguedMapScale", VarType.Int, plaguedMapScaleParam.getValue());
            }
            
            
            return afflictedTerrainMat;
    }
       
     public Material createPhongTerrainMaterial(Material oldMat, AssetManager assetManager){
           
            Material afflictedTerrainMat = new Material((MaterialDef) assetManager.loadAsset(phongShaderString));
            
            
            
            
            if(oldMat.getParam("useTriPlanarMapping") != null){
          //     afflictedTerrainMat.setParam("useTriPlanarMapping", VarType.Boolean, oldMat.getParam("useTriPlanarMapping").getValue());
          afflictedTerrainMat.setParam("useTriPlanarMapping", VarType.Boolean, false);
            }
            
                    //set alpha maps
             for(int a = 0; a < 3; a ++){
                 MatParam param;
                String index = "";  //old terrain shader doesnt use 0 index for just the diffuse map
                if(a > 0){
                    index = "_" + a;
                }
                
               param = oldMat.getParam("AlphaMap" + index);
                if(param != null){
                    afflictedTerrainMat.setParam("AlphaMap" + index, VarType.Texture2D, (Texture) param.getValue());
                }
                 
             }
           
            for(int i = 0; i < 12; i ++){
                MatParam param;
                String oldIndex = "";  //old terrain shader doesnt use 0 index for just the diffuse map
                if(i > 0){
                     oldIndex = "_" + i;
                }
                
                String newIndex = "_" + i;
                
               param = oldMat.getParam("AlbedoMap" + newIndex);
               
               
                if(param != null){  
                    
                    String texName = ((Texture)param.getValue()).getName();
                    
                    afflictedTerrainMat.setParam("DiffuseMap" + oldIndex, VarType.Texture2D, param.getValue());
                    float scale = (float) oldMat.getParam("AlbedoMap_" + i + "_scale").getValue();
                    
                    
                    if(textureScales.get(texName) != null){
                        scale = textureScales.get(texName);
                    }
                    else{
                        scale = 4f;
                    }
                    
                    
                    afflictedTerrainMat.setParam("DiffuseMap_" + i + "_scale", VarType.Float, scale);
                                    
                    
                //sets alive, roughness, and metallic params for AfflictedShader
                    if(textureAliveValues.get(texName) != null){
                        int afflictionMode = 0;
                        afflictionMode = textureAliveValues.get(texName);
                        afflictedTerrainMat.setParam("AfflictionMode_" + i, VarType.Int, afflictionMode);
                    }
//                  
                }
                
                 param = oldMat.getParam("NormalMap" + newIndex);
                if(param != null){
                    afflictedTerrainMat.setParam("NormalMap" + oldIndex, VarType.Texture2D, param.getValue());
                }
                
                
                
            }
            
             MatParam afflictionParam = oldMat.getTextureParam("AfflictionTexture");
            if(afflictionParam != null){
                afflictedTerrainMat.setParam("AfflictionTexture", VarType.Texture2D, afflictionParam.getValue());
            }
            
            MatParam plaguedAlbedoMapParam = oldMat.getTextureParam("PlaguedAlbedoMap");
            if(plaguedAlbedoMapParam != null){
                afflictedTerrainMat.setParam("PlaguedAlbedoMap", VarType.Texture2D, plaguedAlbedoMapParam.getValue());
            }
            
            MatParam plaguedNormalMapParam = oldMat.getTextureParam("PlaguedNormalMap");
            if(plaguedNormalMapParam != null){
                afflictedTerrainMat.setParam("PlaguedNormalMap", VarType.Texture2D, plaguedNormalMapParam.getValue());
            }
            
            
            MatParam plaguedMapScaleParam = oldMat.getParam("PlaguedMapScale");
            if(plaguedMapScaleParam != null){
                afflictedTerrainMat.setParam("PlaguedMapScale", VarType.Int, plaguedMapScaleParam.getValue());
            }
            
            
            
            return afflictedTerrainMat;
    }
       
       
       
       
       
       
       //necessary or naw? \|/
    public void setupTerrainMaterials(Spatial spatial, Material material){
//       spatial.setMaterial(material);  


        if(spatial instanceof Node){
            
            SafeArrayList<Spatial> terrainChildren = (SafeArrayList<Spatial>) ((Node)spatial).getChildren();
            for(Spatial nodeSpatial: terrainChildren){
                setupTerrainMaterials(nodeSpatial, material);
            }
        }else{
            
            Geometry patchGeo = (Geometry)spatial;
            patchGeo.setMaterial(material);
            
        }
        
    }
}
