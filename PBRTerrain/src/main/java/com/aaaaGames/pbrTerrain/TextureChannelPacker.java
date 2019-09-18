package com.aaaaGames.pbrTerrain;


import com.jme3.app.SimpleApplication;
import com.jme3.asset.AssetManager;
import com.jme3.math.ColorRGBA;
import com.jme3.system.JmeSystem;
import com.jme3.texture.Image;
import com.jme3.texture.Image.Format;
import com.jme3.texture.Texture;
import com.jme3.texture.Texture2D;
import com.jme3.texture.image.ColorSpace;
import com.jme3.texture.image.ImageRaster;
import com.jme3.util.BufferUtils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

/**
 *
 * @author ryan
 */
public class TextureChannelPacker {
    
    private Format imageFormat = Image.Format.RGBA8;
    public void setImageFormat(Format imgFormat){ imageFormat = imgFormat; }
    
    public int[] mipMapSizes = null;
    public void setMipMapSizes(int[] mipMaps){   mipMapSizes = mipMaps ;}
    
    private SimpleApplication app;
    private AssetManager assetManager;
    
    private String assetDirectory;
    
    public enum TextureChannel{
        R,
        G,
        B,
        A
    }
    
    public TextureChannelPacker(SimpleApplication app, String assetDirectory){
        this.assetDirectory = assetDirectory;
        this.app = app;
        assetManager = app.getAssetManager();
        
  
        
    }
   
   

    
    
    public Image packChannelFromTo(Image fromImage, TextureChannel fromChannel, Image toImage, TextureChannel toChannel, ColorSpace colorSpace) throws IOException{
        
        Image imageToPack = null;
        
        int width = fromImage.getWidth();
        int height = fromImage.getHeight();
        
        
        if(toImage == null){
            toImage = fromImage.clone();
        }
        
        
         
         
         if(toImage.getHeight() != height || toImage.getWidth() != width){  //images need to be same size
             String sizeErr = "ERROR PACKING TEXTURE :  Both textures must be the same size";
             System.err.println(sizeErr);
             
             
           
         }
         else{
             
          
             
             
            imageToPack = toImage;
            ImageRaster newRaster = ImageRaster.create(imageToPack);
            
            ImageRaster fromRaster = ImageRaster.create(fromImage);
            ImageRaster toRaster = ImageRaster.create(toImage);

            for(int x = 0; x < width; x++){
                for(int y = 0; y < height; y++){
                    
                    
                    
                        ColorRGBA newCol = toRaster.getPixel(x, y).clone(); //get the final color before modifying a channel
                        
                        
                        ColorRGBA fromCol = fromRaster.getPixel(x, y);//get new value from designated channel
                        double newChannelValue = 1.0; 
                        if(fromChannel.equals(TextureChannel.A) && colorSpace.equals(ColorSpace.Linear)){
                             newChannelValue = fromCol.getAlpha();
                        }
                        else if(fromChannel.equals(TextureChannel.R)){
                            newChannelValue = fromCol.getRed();
                        }
                        else if(fromChannel.equals(TextureChannel.G)){
                             newChannelValue = fromCol.getGreen();
                        }
                        else if(fromChannel.equals(TextureChannel.B)){
                             newChannelValue = fromCol.getBlue();
                        }
                        else{
                            String errText = "ERROR PACKING TEXTURE : You must assign a valid source and target TextureChannel for the corresponding image type and color space";
                            System.err.println(errText);
                        }

                         
                        
                        //modify the destination image's designated channel
                         if(toChannel.equals(TextureChannel.A) && colorSpace.equals(ColorSpace.Linear)){
                             newCol.set(newCol.getRed(), newCol.getGreen(), newCol.getBlue(), (float) newChannelValue);
                        }
                        else if(toChannel.equals(TextureChannel.R)){
                            newCol.set((float) newChannelValue, newCol.getGreen(), newCol.getBlue(), newCol.getAlpha());
                        }
                        else if(toChannel.equals(TextureChannel.G)){
                             newCol.set(newCol.getRed(), (float) newChannelValue, newCol.getBlue(), newCol.getAlpha());
                        }
                        else if(toChannel.equals(TextureChannel.B)){
                             newCol.set(newCol.getRed(), newCol.getGreen(), (float) newChannelValue, newCol.getAlpha());
                        }
                         else{
                            String errText = "ERROR PACKING TEXTURE : You must assign a valid source and target TextureChannel for the corresponding image type and color space.";
                            System.err.println(errText);
                        }
                         
                        
                        newRaster.setPixel(x, y, newCol);
                        
                        
                        

                }
            }

            
            
             
             

             
        
         }
         
        return imageToPack;
    }
    //Packs:
    
    // AO        - r
    // Roughness - g
    // Metallic  - b
    // Emissive  - a 
    public Texture packMetallicRoughnessAoEmissiveMap(Texture metallicMap, Texture roughnessMap, Texture aoMap, Texture emissiveMap, String savePath, ColorSpace colorSpace, Texture destinationTexture) throws IOException{
        int bufferSize = 0;
        int height = 0, width = 0;
        if(destinationTexture != null){
            bufferSize = getBufferSize(colorSpace, destinationTexture.getImage());
            height = destinationTexture.getImage().getHeight();
            width = destinationTexture.getImage().getWidth();
        }
        if(metallicMap != null){
            bufferSize = getBufferSize(colorSpace, metallicMap.getImage());
            height = metallicMap.getImage().getHeight();
            width = metallicMap.getImage().getWidth();
         }if(roughnessMap != null){
            bufferSize = getBufferSize(colorSpace, roughnessMap.getImage());
            height = roughnessMap.getImage().getHeight();
            width = roughnessMap.getImage().getWidth();
        }if(aoMap != null){
            bufferSize = getBufferSize(colorSpace, aoMap.getImage());
            height = aoMap.getImage().getHeight();
            width = aoMap.getImage().getWidth();
         }
        if(emissiveMap != null){
            bufferSize = getBufferSize(colorSpace, emissiveMap.getImage());
            height = emissiveMap.getImage().getHeight();
            width = emissiveMap.getImage().getWidth();
        }

        if(height + width > 1){
            Image newPackedImage;
            if(destinationTexture == null){
                newPackedImage = new Image(imageFormat, width, height, BufferUtils.createByteBuffer(bufferSize), mipMapSizes, colorSpace);                
            }else{
                newPackedImage = destinationTexture.getImage();
            }
            ImageWriter.fillColor(newPackedImage, new ColorRGBA(1.0f, 1.0f, 1.0f, 0.0f));
            
            Texture metallicRoughnessAoEmissiveMap = new Texture2D(newPackedImage);
            
            if(aoMap != null){ //r
                packChannelFromTo(aoMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.R, colorSpace);
            }            
            if(roughnessMap != null){ //g
                packChannelFromTo(roughnessMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.G, colorSpace);
                
            }
            if(metallicMap != null){ //b
                packChannelFromTo(metallicMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.B, colorSpace);
                
            }
            if(emissiveMap != null){ //a
                packChannelFromTo(emissiveMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.A, colorSpace);
            }            
            
             if(savePath != null){
                 File file = new File(assetDirectory + savePath);
                if(!file.exists()){
                    file.mkdirs();                    
                }

                ImageIO.write(ImageWriter.getARGB8ImageFrom(metallicRoughnessAoEmissiveMap.getImage()), "png", file);
            }
             
            return metallicRoughnessAoEmissiveMap;
        }
        
        else{
            return null;
        }
    }
    
    // packs:
    
    //normal map    -  rgb
    //Parallax map  -  a
     public Texture packNormalParallaxMap(Texture normalMap, Texture parallaxMap, String savePath,  ColorSpace colorSpace, Texture destinationTexture) throws IOException{
        int bufferSize = 0;
        int height = 0, width = 0;
        if(destinationTexture != null){
            bufferSize = getBufferSize(colorSpace, destinationTexture.getImage());
            height = destinationTexture.getImage().getHeight();
            width = destinationTexture.getImage().getWidth();
        }
        if(normalMap != null){
            bufferSize = getBufferSize(colorSpace, normalMap.getImage());
            height = normalMap.getImage().getHeight();
            width = normalMap.getImage().getWidth();
         }if(parallaxMap != null){
            bufferSize = getBufferSize(colorSpace, parallaxMap.getImage());
            height = parallaxMap.getImage().getHeight();
            width = parallaxMap.getImage().getWidth();
        }

        if(height + width > 1){
            Image newPackedImage;
            if(destinationTexture == null){
                newPackedImage = new Image(imageFormat, width, height, BufferUtils.createByteBuffer(bufferSize), mipMapSizes, colorSpace);
            }else{
                newPackedImage = destinationTexture.getImage();
            }
            ImageWriter.fillColor(newPackedImage, new ColorRGBA(0.0f, 0.0f, 0.0f, 0.5f)); //what default value should parallax (aka alpha channel) be set to, in case of null parallax map
            
            Texture normalParallaxMap = new Texture2D(newPackedImage);
            
            if(normalMap != null){ //rgb
                packChannelFromTo(normalMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.R, colorSpace);
                packChannelFromTo(normalMap.getImage(), TextureChannel.G, newPackedImage, TextureChannel.G, colorSpace);
                packChannelFromTo(normalMap.getImage(), TextureChannel.B, newPackedImage, TextureChannel.B, colorSpace);                
            }               
            
            
            
             if(savePath != null){
                File file = new File(assetDirectory + savePath);
                if(!file.exists()){
                    file.mkdirs();                    
                }
                
                ImageIO.write(ImageWriter.getARGB8ImageFrom(normalParallaxMap.getImage()), "png", file);
            }
             
             
            return normalParallaxMap;
        }
        
        else{
            return null;
        }
       
    }
    
    
    private int getBufferSize(ColorSpace colorSpace, Image img){
        int bufferSize = img.getWidth() * img.getHeight();
                
        if(colorSpace.equals(ColorSpace.Linear)){
            bufferSize*= 4;
        }
        else{
           bufferSize *= 3;
        }
        
        return bufferSize;
    }

    
    public void savePng(String path, Image img ) throws IOException {
        File f = new File(path);
        
        
        
        FileOutputStream out = new FileOutputStream(f);
        try {            
            JmeSystem.writeImageFile(out, "png", img.getData(0), img.getWidth(), img.getHeight());  
        } finally {
            out.close();
        }             
    }      
  

}

