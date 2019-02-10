/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CoreAppClasses.Settings.ShaderConverter;

import com.jme3.asset.AssetManager;
import com.jme3.scene.Geometry;

/**
 *
 * @author ryan
 */
public interface ConversionRelationship {

    public String getPbrString();  
    public String getPhongString(); 

    public void convertToPhong(Geometry geo, AssetManager assetManager);
    public void revertToPBR(Geometry geo, AssetManager assetManager);
    
    
}
