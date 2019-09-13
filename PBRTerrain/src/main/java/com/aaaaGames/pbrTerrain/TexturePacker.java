package Utilities.TextureUtilities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.jme3.app.SimpleApplication;
import com.jme3.asset.AssetManager;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.system.JmeSystem;
import com.jme3.texture.Image;
import com.jme3.texture.Image.Format;
import com.jme3.texture.Texture;
import com.jme3.texture.Texture2D;
import com.jme3.texture.image.ColorSpace;
import com.jme3.texture.image.ImageRaster;
import com.jme3.util.BufferUtils;
import com.simsilica.lemur.Container;
import com.simsilica.lemur.GuiGlobals;
import com.simsilica.lemur.Insets3f;
import com.simsilica.lemur.Label;
import com.simsilica.lemur.component.QuadBackgroundComponent;
import com.simsilica.lemur.style.BaseStyles;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import javax.imageio.ImageIO;

/**
 *
 * @author ryan
 */
public class TexturePacker {
    
    private Format imageFormat = Image.Format.RGB8; //default to not use the alpha channel - change tp RGBA8 and use ColorSace.linear if you want to pack alpha as well
    public void setImageFormat(Format imgFormat){ imageFormat = imgFormat; }
    
    public int[] mipMapSizes = null;
    public void setMipMapSizes(int[] mipMaps){   mipMapSizes = mipMaps ;}
    
    private SimpleApplication app;
    private AssetManager assetManager;
    
    public enum TextureChannel{
        R,
        G,
        B,
        A
    }
    
    private ImageWriter imageWriter;
    
    private Container window;
    private Container metallicPic, roughnessPic, aoPic, emissivePic, outputPic;
    private Label errorLabel;
    
    float screenHeight, screenWidth;
     
    private String assetDirectory;
    
    public TexturePacker(SimpleApplication app, String assetDirectory){
        imageWriter = new ImageWriter();
        
        this.assetDirectory = assetDirectory;
        this.app = app;
        assetManager = app.getAssetManager();
        
        window = new Container();
        
        GuiGlobals.getInstance().getStyles().setDefaultStyle("glass");
        
        GraphicsDevice device = GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice();
        
        screenHeight = device.getDisplayMode().getHeight();
        screenWidth = device.getDisplayMode().getWidth();
        window.setBackground(new QuadBackgroundComponent(assetManager.loadTexture("Interface/InterfaceElements/fadedParchmentBackDrop.png")));
         
        window.setPreferredSize(new Vector3f(screenWidth * 0.7f, screenHeight * 0.5f, 1.0f));
        window.setLocalTranslation(new Vector3f(screenWidth * 0.1f, screenHeight * 0.8f, 0f));
        
        outputPic = new Container();
        roughnessPic = new Container();
        aoPic = new Container();
        metallicPic = new Container();
        emissivePic = new Container();
        
        errorLabel = new Label("Info");
        
      
        
     //   app.getGuiNode().attachChild(window);
        
        window.addChild(errorLabel, 0, 0);
        
        
        
        window.addChild(getPicContainer(aoPic, "AO Map"), 1, 0);
        window.addChild(getPicContainer(roughnessPic, "Roughness Map"), 1, 1);
        window.addChild(getPicContainer(metallicPic, "Metallic Map"), 1, 2);
        window.addChild(getPicContainer(emissivePic, "EmissivePower Map"), 1, 3);        
        
        window.addChild(getPicContainer(outputPic, "Packed Ao/Rough/Metal/EmissPow"), 1, 4);
    }
   
    private Container getPicContainer(Container imgBox, String title){
        Container picContainer = new Container();
        
        Label titleLabel = new Label(title);
        titleLabel.setColor(ColorRGBA.Black);
        
        picContainer.addChild(titleLabel, 0,0);
        picContainer.addChild(imgBox, 1,0);
        
        imgBox.setPreferredSize(new Vector3f(screenWidth * 0.14f, screenHeight * 0.2f, 0));
        imgBox.setInsets(new Insets3f(0, 10, 5, 0));
        
        return picContainer;
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
             throwErrorMessage(sizeErr);
             
             
           
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
                            throwErrorMessage(errText);
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
                            throwErrorMessage(errText);
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
            metallicPic.setBackground(new QuadBackgroundComponent(metallicMap));
         }if(roughnessMap != null){
            bufferSize = getBufferSize(colorSpace, roughnessMap.getImage());
            height = roughnessMap.getImage().getHeight();
            width = roughnessMap.getImage().getWidth();
            roughnessPic.setBackground(new QuadBackgroundComponent(roughnessMap));
        }if(aoMap != null){
            bufferSize = getBufferSize(colorSpace, aoMap.getImage());
            height = aoMap.getImage().getHeight();
            width = aoMap.getImage().getWidth();
            aoPic.setBackground(new QuadBackgroundComponent(aoMap));
         }
        if(emissiveMap != null){
            bufferSize = getBufferSize(colorSpace, emissiveMap.getImage());
            height = emissiveMap.getImage().getHeight();
            width = emissiveMap.getImage().getWidth();
            emissivePic.setBackground(new QuadBackgroundComponent(emissiveMap));
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
//                if(!file.exists()){
//                    file.mkdirs();                    
//                }

           //     imageWriter.writeImage(metallicRoughnessAoEmissiveMap.getImage(), file);
                ImageIO.write(ImageWriter.getRGB8ImageFrom(metallicRoughnessAoEmissiveMap.getImage()), "png", file);
            }
             
             outputPic.setBackground(new QuadBackgroundComponent(metallicRoughnessAoEmissiveMap));
             
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
            metallicPic.setBackground(new QuadBackgroundComponent(normalMap)); //for debugging purposes
         }if(parallaxMap != null){
            bufferSize = getBufferSize(colorSpace, parallaxMap.getImage());
            height = parallaxMap.getImage().getHeight();
            width = parallaxMap.getImage().getWidth();
            roughnessPic.setBackground(new QuadBackgroundComponent(parallaxMap)); //for debugging purposes
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
            if(parallaxMap != null){ //a
                packChannelFromTo(parallaxMap.getImage(), TextureChannel.R, newPackedImage, TextureChannel.A, colorSpace);                
            }
            
            
            
            
             if(savePath != null){
                
            //    savePng(savePath, metallicRoughnessAoEmissiveMap.getImage());
                File file = new File(assetDirectory + savePath);
                if(!file.exists()){
                    file.mkdirs();                    
                }
                
                ImageIO.write(ImageWriter.getRGB8ImageFrom(normalParallaxMap.getImage()), "png", file);
              //  imageWriter.writeImage(normalParallaxMap.getImage(), file);
            }
             
             outputPic.setBackground(new QuadBackgroundComponent(normalParallaxMap));
             
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

            
      
      private void throwErrorMessage(String errStr){
          if(errorLabel != null){
                 errorLabel.setText(errStr);
         }
         System.err.println(errStr);
      }
      
      
      
      
    public Container getEmissivePic() {
        return emissivePic;
    }
      
    public Container getOutputPic() {
        return outputPic;
    }
      
    public Container getRoughnessPic() {
        return roughnessPic;
    }
      
    public Container getMetallicPic() {
        return metallicPic;
    }
      
      

    public void showDebug(){
        app.getGuiNode().attachChild(window);
    }
      
    
      
          
      
  

}
