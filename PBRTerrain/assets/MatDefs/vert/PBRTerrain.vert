#import "Common/ShaderLib/GLSLCompat.glsllib"
#import "Common/ShaderLib/Instancing.glsllib"

attribute vec3 inPosition;
attribute vec3 inNormal;
attribute vec2 inTexCoord;

varying vec2 texCoord;
varying vec3 wPosition;
varying vec3 wNormal;



#ifdef TRI_PLANAR_MAPPING
  varying vec4 wVertex;
#endif


#if defined(NORMALMAP_0) || defined(NORMALMAP_1) || defined(NORMALMAP_2) || defined(NORMALMAP_3) || defined(NORMALMAP_4) || defined(PLAGUEDNORMALMAP)
    attribute vec4 inTangent;
    varying vec4 wTangent;
#endif

void main(){
    vec4 modelSpacePos = vec4(inPosition, 1.0);

    gl_Position = TransformWorldViewProjection(modelSpacePos);

    texCoord = inTexCoord;

    wPosition = TransformWorld(modelSpacePos).xyz;
    
    
    wNormal  = normalize(TransformWorldNormal(inNormal));
   #if  defined(NORMALMAP_0) || defined(NORMALMAP_1) || defined(NORMALMAP_2) || defined(NORMALMAP_3) || defined(NORMALMAP_4) || defined(NORMALMAP_5) || defined(NORMALMAP_6) || defined(NORMALMAP_7)  || defined(PLAGUEDNORMALMAP)
        wTangent = vec4(TransformWorldNormal(inTangent.xyz),inTangent.w);
    #endif

    #ifdef TRI_PLANAR_MAPPING
       wVertex = vec4(inPosition,0.0);
       wNormal = inNormal;
    #endif
    
    
  
    
}