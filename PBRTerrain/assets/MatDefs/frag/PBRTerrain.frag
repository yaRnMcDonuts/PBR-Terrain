#import "Common/ShaderLib/GLSLCompat.glsllib"
#import "Common/ShaderLib/PBR.glsllib"
#import "Common/ShaderLib/Parallax.glsllib"
#import "Common/ShaderLib/Lighting.glsllib"
#import "MatDefs/ShaderLib/AfflictionLib.glsllib"

uniform vec4 g_LightData[NB_LIGHTS];

varying vec3 wPosition;

//#if NB_PROBES >= 1
  uniform samplerCube g_PrefEnvMap;
  uniform vec3 g_ShCoeffs[9];
  uniform mat4 g_LightProbeData;
//#endif
#if NB_PROBES >= 2
  uniform samplerCube g_PrefEnvMap2;
  uniform vec3 g_ShCoeffs2[9];
  uniform mat4 g_LightProbeData2;
#endif
#if NB_PROBES == 3
  uniform samplerCube g_PrefEnvMap3;
  uniform vec3 g_ShCoeffs3[9];
  uniform mat4 g_LightProbeData3;
#endif


uniform vec4 g_AmbientLightColor;



///TODO LIST

// include plaguedEmissiveColor to be multiplied by the EI channel in packedMRAoEi map



#ifdef EMISSIVE
    uniform vec4 m_Emissive;
#endif
#ifdef EMISSIVEMAP
    uniform sampler2D m_EmissiveMap;
#endif
#if defined(EMISSIVE) || defined(EMISSIVEMAP)
    uniform float m_EmissivePower;
    uniform float m_EmissiveIntensity;
#endif 

#ifdef SPECGLOSSPIPELINE
  uniform sampler2D m_SpecularMap;
  uniform sampler2D m_GlossMap;
#endif

#ifdef LIGHTMAP
  uniform sampler2D m_LightMap;
#endif

varying vec3 vNormal;

//#if defined(NORMALMAP_0) || defined(NORMALMAP_1) || defined(NORMALMAP_2) || defined(NORMALMAP_3) || defined(NORMALMAP_4) || defined(NORMALMAP_5) || defined(NORMALMAP_6) || defined(NORMALMAP_7) || defined(PLAGUEDNORMALMAP)
    varying vec4 wTangent;
//#endif


varying vec2 texCoord;


uniform vec3 g_CameraPosition;


float Metallic;
float Roughness;


float hour = 0;


vec3 norm;



#ifdef USE_FOG
#import "MatDefs/ShaderLib/MaterialFog.glsllib"
uniform vec4 m_FogColor;
float fogDistance;

uniform vec2 m_LinearFog;
#endif

#ifdef FOG_EXP
uniform float m_ExpFog;
#endif

#ifdef FOG_EXPSQ
uniform float m_ExpSqFog;
#endif




varying vec3 vPosition;
varying vec3 vnPosition;
varying vec3 vViewDir;
varying vec4 vLightDir;
varying vec4 vnLightDir;
varying vec3 lightVec;
varying vec3 inNormal;

uniform int m_AfflictionMode_0;
uniform int m_AfflictionMode_1;
uniform int m_AfflictionMode_2;
uniform int m_AfflictionMode_3;
uniform int m_AfflictionMode_4;
uniform int m_AfflictionMode_5;
uniform int m_AfflictionMode_6;
uniform int m_AfflictionMode_7;
uniform int m_AfflictionMode_8;
uniform int m_AfflictionMode_9;
uniform int m_AfflictionMode_10;
uniform int m_AfflictionMode_11;

uniform float m_Roughness_0;
uniform float m_Roughness_1;
uniform float m_Roughness_2;
uniform float m_Roughness_3;
uniform float m_Roughness_4;
uniform float m_Roughness_5;
uniform float m_Roughness_6;
uniform float m_Roughness_7;
uniform float m_Roughness_8;
uniform float m_Roughness_9;
uniform float m_Roughness_10;
uniform float m_Roughness_11;

uniform float m_Metallic_0;
uniform float m_Metallic_1;
uniform float m_Metallic_2;
uniform float m_Metallic_3;
uniform float m_Metallic_4;
uniform float m_Metallic_5;
uniform float m_Metallic_6;
uniform float m_Metallic_7;
uniform float m_Metallic_8;
uniform float m_Metallic_9;
uniform float m_Metallic_10;
uniform float m_Metallic_11;



   mat3 tbnMat;

#ifdef AFFLICTIONTEXTURE
    uniform sampler2D m_AfflictionTexture;
#endif

//defined for sub terrains that arent equal to each map tile size for optional affliction splatting
#ifdef TILELOCATION
    uniform float m_TileWidth;
    uniform vec3 m_TileLocation;
#endif

uniform int m_PlaguedMapScale;
#ifdef PLAGUEDALBEDOMAP
    uniform sampler2D m_PlaguedAlbedoMap;
#endif

#ifdef PLAGUEDNORMALMAP
    uniform sampler2D m_PlaguedNormalMap;
#endif

#ifdef PLAGUEDROUGHNESSMETALLICMAP
    uniform sampler2D m_PlaguedRoughnessMetallicMap;
#endif


#ifdef ALBEDOMAP_0
  uniform sampler2D m_AlbedoMap_0;
#endif
#ifdef ALBEDOMAP_1
  uniform sampler2D m_AlbedoMap_1;
#endif
#ifdef ALBEDOMAP_2
  uniform sampler2D m_AlbedoMap_2;
#endif
#ifdef ALBEDOMAP_3
  uniform sampler2D m_AlbedoMap_3;
#endif
#ifdef ALBEDOMAP_4
  uniform sampler2D m_AlbedoMap_4;
#endif
#ifdef ALBEDOMAP_5
  uniform sampler2D m_AlbedoMap_5;
#endif
#ifdef ALBEDOMAP_6
  uniform sampler2D m_AlbedoMap_6;
#endif
#ifdef ALBEDOMAP_7
  uniform sampler2D m_AlbedoMap_7;
#endif
#ifdef ALBEDOMAP_8
  uniform sampler2D m_AlbedoMap_8;
#endif
#ifdef ALBEDOMAP_9
  uniform sampler2D m_AlbedoMap_9;
#endif
#ifdef ALBEDOMAP_10
  uniform sampler2D m_AlbedoMap_10;
#endif
#ifdef ALBEDOMAP_11
  uniform sampler2D m_AlbedoMap_11;
#endif


#ifdef ALBEDOMAP_0_SCALE
  uniform float m_AlbedoMap_0_scale;
#endif
#ifdef ALBEDOMAP_1_SCALE
  uniform float m_AlbedoMap_1_scale;
#endif
#ifdef ALBEDOMAP_2_SCALE
  uniform float m_AlbedoMap_2_scale;
#endif
#ifdef ALBEDOMAP_3_SCALE
  uniform float m_AlbedoMap_3_scale;
#endif
#ifdef ALBEDOMAP_4_SCALE
  uniform float m_AlbedoMap_4_scale;
#endif
#ifdef ALBEDOMAP_5_SCALE
  uniform float m_AlbedoMap_5_scale;
#endif
#ifdef ALBEDOMAP_6_SCALE
  uniform float m_AlbedoMap_6_scale;
#endif
#ifdef ALBEDOMAP_7_SCALE
  uniform float m_AlbedoMap_7_scale;
#endif
#ifdef ALBEDOMAP_8_SCALE
  uniform float m_AlbedoMap_8_scale;
#endif
#ifdef ALBEDOMAP_9_SCALE
  uniform float m_AlbedoMap_9_scale;
#endif
#ifdef ALBEDOMAP_10_SCALE
  uniform float m_AlbedoMap_10_scale;
#endif
#ifdef ALBEDOMAP_11_SCALE
  uniform float m_AlbedoMap_11_scale;
#endif


#ifdef ALPHAMAP
  uniform sampler2D m_AlphaMap;
#endif
#ifdef ALPHAMAP_1
  uniform sampler2D m_AlphaMap_1;
#endif
#ifdef ALPHAMAP_2
  uniform sampler2D m_AlphaMap_2;
#endif

#ifdef NORMALMAP_0
  uniform sampler2D m_NormalMap_0;
#endif
#ifdef NORMALMAP_1
  uniform sampler2D m_NormalMap_1;
#endif
#ifdef NORMALMAP_2
  uniform sampler2D m_NormalMap_2;
#endif
#ifdef NORMALMAP_3
  uniform sampler2D m_NormalMap_3;
#endif
#ifdef NORMALMAP_4
  uniform sampler2D m_NormalMap_4;
#endif
#ifdef NORMALMAP_5
  uniform sampler2D m_NormalMap_5;
#endif
#ifdef NORMALMAP_6
  uniform sampler2D m_NormalMap_6;
#endif
#ifdef NORMALMAP_7
  uniform sampler2D m_NormalMap_7;
#endif
#ifdef NORMALMAP_8
  uniform sampler2D m_NormalMap_8;
#endif
#ifdef NORMALMAP_9
  uniform sampler2D m_NormalMap_9;
#endif
#ifdef NORMALMAP_10
  uniform sampler2D m_NormalMap_10;
#endif
#ifdef NORMALMAP_11
  uniform sampler2D m_NormalMap_11;
#endif





vec4 emissive;
vec4 afflictionVector;



  varying vec3 wNormal;

//ifdef TRI_PLANAR_MAPPING
  varying vec4 wVertex;


 
//#endif

vec2 coord;
vec4 albedo;
vec4 tempAlbedo, tempNormal;
float noiseHash;
float livelinessValue;
float plaguedValue;
int afflictionMode = 1;
vec3 normal = vec3(0.5,0.5,1);
vec3 newNormal;

   


#define DEFINE_COORD(index) vec2 coord##index = texCoord * m_AlbedoMap##index##_scale;

#define BLEND(index, ab)\
    DEFINE_COORD(index)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo.rgb = texture2D(m_AlbedoMap##index, coord##index).rgb;\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo.rgb = mix( albedo.rgb, tempAlbedo.rgb ,ab );\
    normal.rgb = mix(normal.xyz, wNormal.rgb, ab);\
    Metallic = mix(Metallic, m_Metallic##index, ab);\
    Roughness = mix(Roughness, m_Roughness##index, ab);

    
    

#define BLEND_NORMAL(index, ab)\
    DEFINE_COORD(index)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo.rgb = texture2D(m_AlbedoMap##index, coord##index).rgb;\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo.rgb = mix( albedo.rgb, tempAlbedo.rgb ,ab );\
    Metallic = mix(Metallic, m_Metallic##index, ab);\
    Roughness = mix(Roughness, m_Roughness##index, ab);\
    tempNormal.xyz = texture2D(m_NormalMap##index, coord##index).xyz;\
    tempNormal.rgb = mixNormals(tempNormal.rgb, wNormal);\
    normal.rgb = mix(normal.xyz, tempNormal.xyz, ab);

//BLEND METHODS FOR TRIPLANAR...  
#define TRI_BLEND(index, ab, worldCoords, blending)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo = getTriPlanarBlend(worldCoords, blending, m_AlbedoMap##index, m_AlbedoMap##index##_scale);\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo = mix( albedo, tempAlbedo ,ab );\
    normal.rgb = mix(normal.rgb, wNormal.rgb, ab);\
    Metallic = mix(Metallic, m_Metallic##index, ab);\
    Roughness = mix(Roughness, m_Roughness##index, ab);    


#define TRI_BLEND_NORMAL(index, ab, worldCoords, blending)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo.rgb = getTriPlanarBlend(worldCoords, blending, m_AlbedoMap##index, m_AlbedoMap##index##_scale).rgb;\
    tempNormal.rgb = getTriPlanarBlend(worldCoords, blending, m_NormalMap##index, m_AlbedoMap##index##_scale).rgb;\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo.rgb = mix( albedo.rgb, tempAlbedo.rgb ,ab );\
    tempNormal.rgb = mixNormals(tempNormal.rgb, wNormal);\
    normal.rgb = mix(normal.xyz, tempNormal.xyz, ab);\
    Metallic = mix(Metallic, m_Metallic##index, ab);\
    Roughness = mix(Roughness, m_Roughness##index, ab);

#ifdef ALPHAMAP

vec4 calculateAlbedoBlend(in vec2 texCoord) {
    vec4 alphaBlend = texture2D( m_AlphaMap, texCoord.xy );
    vec4 albedo = vec4(1.0);
    
    

    Roughness = m_Roughness_0;
    Metallic = m_Metallic_0 ;

 vec3 blending = abs( wNormal );
        blending = (blending -0.2) * 0.7;
        blending = normalize(max(blending, 0.00001));      // Force weights to sum to 1.0 (very important!)
        float b = (blending.x + blending.y + blending.z);
        blending /= vec3(b, b, b);


    #ifdef ALPHAMAP_1
      vec4 alphaBlend1   = texture2D( m_AlphaMap_1, texCoord.xy );
    #endif
    #ifdef ALPHAMAP_2
      vec4 alphaBlend2   = texture2D( m_AlphaMap_2, texCoord.xy );
    #endif
    #ifdef ALBEDOMAP_0   
                    //NOTE! the old (phong) terrain shaders do not have an "_0" for the first diffuse map, it is just "DiffuseMap"
        #ifdef NORMALMAP_0
            BLEND_NORMAL(_0,  alphaBlend.r)
        #else
            BLEND(_0,  alphaBlend.r)
        #endif
        
    #endif
    #ifdef ALBEDOMAP_1
        #ifdef NORMALMAP_1
            BLEND_NORMAL(_1,  alphaBlend.g)
        #else
            BLEND(_1,  alphaBlend.g)
        #endif
        
    #endif
    #ifdef ALBEDOMAP_2
        #ifdef NORMALMAP_2
            BLEND_NORMAL(_2,  alphaBlend.b)
        #else
            BLEND(_2,  alphaBlend.b)
        #endif
        
    #endif
    #ifdef ALBEDOMAP_3 
        #ifdef NORMALMAP_3
            BLEND_NORMAL(_3,  alphaBlend.a)
        #else
            BLEND(_3,  alphaBlend.a)
        #endif
       
    #endif

    #ifdef ALPHAMAP_1
        #ifdef ALBEDOMAP_4
            #ifdef NORMALMAP_4
                BLEND_NORMAL(_4,  alphaBlend1.r)
            #else
                BLEND(_4,  alphaBlend1.r)
            #endif
           
        #endif
        #ifdef ALBEDOMAP_5
            #ifdef NORMALMAP_5
                BLEND_NORMAL(_5,  alphaBlend1.g)
            #else
                BLEND(_5,  alphaBlend1.g)
            #endif
             
        #endif
        #ifdef ALBEDOMAP_6
            #ifdef NORMALMAP_6
                BLEND_NORMAL(_6,  alphaBlend1.b)
            #else
                BLEND(_6,  alphaBlend1.b)
            #endif
             
        #endif
        #ifdef ALBEDOMAP_7
            #ifdef NORMALMAP_7
                BLEND_NORMAL(_7,  alphaBlend1.a)
            #else
                BLEND(_7,  alphaBlend1.a)
            #endif
             
        #endif
    #endif

    #ifdef ALPHAMAP_2
        #ifdef ALBEDOMAP_8
             #ifdef NORMALMAP_8
                BLEND_NORMAL(_8,  alphaBlend2.r)
            #else
                BLEND(_8,  alphaBlend2.r)
            #endif
             
        #endif
        #ifdef ALBEDOMAP_9
             #ifdef NORMALMAP_9
                BLEND_NORMAL(_9,  alphaBlend2.g)
            #else
                BLEND(_9,  alphaBlend2.g)
            #endif
             
        #endif
        #ifdef ALBEDOMAP_10
            #ifdef NORMALMAP_10
                BLEND_NORMAL(_10,  alphaBlend2.b)
            #else
                BLEND(_10,  alphaBlend2.b)
            #endif
             
        #endif
        #ifdef ALBEDOMAP_11
             #ifdef NORMALMAP_11
                BLEND_NORMAL(_11,  alphaBlend2.a)
            #else
                BLEND(_11,  alphaBlend2.a)
            #endif
             
        #endif                   
    #endif

    return albedo;
  }



// TRI PLANAR ALPHA MAP TEXTURES_ _ _ _    \/

  #ifdef TRI_PLANAR_MAPPING


    vec4 calculateTriPlanarAlbedoBlend(in vec3 wNorm, in vec4 wVert, in vec2 texCoord, vec3 blending) {
            // tri-planar texture bending factor for this fragment's normal
         vec4 alphaBlend = texture2D( m_AlphaMap, texCoord.xy );
        vec4 albedo = vec4(1.0);



        Roughness = m_Roughness_0;
        Metallic = m_Metallic_0 ;

    


        #ifdef ALPHAMAP_1
          vec4 alphaBlend1   = texture2D( m_AlphaMap_1, texCoord.xy );
        #endif
        #ifdef ALPHAMAP_2
          vec4 alphaBlend2   = texture2D( m_AlphaMap_2, texCoord.xy );
        #endif
        #ifdef ALBEDOMAP_0   
                        //NOTE! the old (phong) terrain shaders do not have an "_0" for the first diffuse map, it is just "DiffuseMap"
            #ifdef NORMALMAP_0
                TRI_BLEND_NORMAL(_0,  alphaBlend.r, wVertex, blending)
            #else
                TRI_BLEND(_0,  alphaBlend.r, wVertex, blending)
            #endif

        #endif
        #ifdef ALBEDOMAP_1
            #ifdef NORMALMAP_1
                TRI_BLEND_NORMAL(_1,  alphaBlend.g, wVertex, blending)
            #else
                TRI_BLEND(_1,  alphaBlend.g, wVertex, blending)
            #endif

        #endif
        #ifdef ALBEDOMAP_2
            #ifdef NORMALMAP_2
                TRI_BLEND_NORMAL(_2,  alphaBlend.b, wVertex, blending)
            #else
                TRI_BLEND(_2,  alphaBlend.b, wVertex, blending)
            #endif

        #endif
        #ifdef ALBEDOMAP_3 
            #ifdef NORMALMAP_3
                TRI_BLEND_NORMAL(_3,  alphaBlend.a, wVertex, blending)
            #else
                TRI_BLEND(_3,  alphaBlend.a, wVertex, blending)
            #endif

        #endif

        #ifdef ALPHAMAP_1
            #ifdef ALBEDOMAP_4
                #ifdef NORMALMAP_4
                    TRI_BLEND_NORMAL(_4,  alphaBlend1.r, wVertex, blending)
                #else
                    TRI_BLEND(_4,  alphaBlend1.r, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_5
                #ifdef NORMALMAP_5
                    TRI_BLEND_NORMAL(_5,  alphaBlend1.g, wVertex, blending)
                #else
                    TRI_BLEND(_5,  alphaBlend1.g, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_6
                #ifdef NORMALMAP_6
                    TRI_BLEND_NORMAL(_6,  alphaBlend1.b, wVertex, blending)
                #else
                    TRI_BLEND(_6,  alphaBlend1.b, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_7
                #ifdef NORMALMAP_7
                    TRI_BLEND_NORMAL(_7,  alphaBlend1.a, wVertex, blending)
                #else
                    TRI_BLEND(_7,  alphaBlend1.a, wVertex, blending)
                #endif

            #endif
        #endif

        #ifdef ALPHAMAP_2
            #ifdef ALBEDOMAP_8
                 #ifdef NORMALMAP_8
                    TRI_BLEND_NORMAL(_8,  alphaBlend2.r, wVertex, blending)
                #else
                    TRI_BLEND(_8,  alphaBlend2.r, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_9
                 #ifdef NORMALMAP_9
                    TRI_BLEND_NORMAL(_9,  alphaBlend2.g, wVertex, blending)
                #else
                    TRI_BLEND(_9,  alphaBlend2.g, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_10
                #ifdef NORMALMAP_10
                    TRI_BLEND_NORMAL(_10,  alphaBlend2.b, wVertex, blending)
                #else
                    TRI_BLEND(_10,  alphaBlend2.b, wVertex, blending)
                #endif

            #endif
            #ifdef ALBEDOMAP_11
                 #ifdef NORMALMAP_11
                    TRI_BLEND_NORMAL(_11,  alphaBlend2.a, wVertex, blending)
                #else
                    TRI_BLEND(_11,  alphaBlend2.a, wVertex, blending)
                #endif

            #endif                   
        #endif
        


        return albedo;
    }

    
  #endif

#endif



//sun intensity is essentially a secondary AO value that can be painted per-vertex in the red channel of the 
// vertex colors, or it can be set as a static value for an entire material
#if defined(USE_VERTEX_COLORS_AS_SUN_INTENSITY) 
    varying vec4 vertColors; 
#endif

#ifdef STATIC_SUN_INTENSITY
    uniform float m_StaticSunIntensity;
#endif
//sun intensity AO value is only applied to the directional light, not to point lights, so it is important to track if the 
//sun is more/less bright than the brightest point light to determine how the light probe's ambient light should be scaled later on..
float brightestPointLight = 0.0;


//used for scaling a probes color, and for scaling a probe's brightness in 3.2 - note that in 3.3, ambient light
//is changed to now affect the probes brightness for day/night.. but this can still be useful for color multiplying if
// a scene needs to drastically shift colors.
#ifdef PROBE_COLOR
    uniform vec4 m_ProbeColor;
#endif
void main(){
    
    
    
     #ifdef USE_FOG
        fogDistance = distance(g_CameraPosition, wPosition.xyz);
        
     //    fogDistance = distance(g_CameraPosition, wPosition.xyz);
    #endif
    
    float indoorSunLightExposure = 1.0;//scale this to match R channel of vertex colors

    vec3 probeColorMult = vec3(1.0);
    float timeOfDayScale = 1.0;
    #ifdef PROBE_COLOR
            timeOfDayScale = m_ProbeColor.w; // time of day is stored in alpha value of the ProbeColor vec4. this way the rgb vec3 can be used for scaling probe color
            probeColorMult = m_ProbeColor.xyz;
            
     #endif
     
    
    
    vec3 viewDir = normalize(g_CameraPosition - wPosition);

    vec3 norm = normalize(wNormal);
    normal.rgb = norm.rgb;
 //   norm = vec3(0.5, 0.5, 1.0);
 //   #if defined(NORMALMAP_0) || defined(PARALLAXMAP) || defined(PLAGUEDNORMALMAP)
        vec3 tan = normalize(wTangent.xyz);
   //     tbnMat = mat3(tan, wTangent.w * cross( (wNormal), (tan)), norm);

   //   mat3 tbnMat = mat3(tan, wTangent.w * cross( (norm), (tan)), norm);
   

 //   #endif

    afflictionVector = vec4(1.0, 0.0, 1.0, 0.0);
    #ifdef AFFLICTIONTEXTURE
    
        #ifdef TILELOCATION 
        //subterrains that are not centred in tile or equal to tile width in total size need to have m_TileWidth pre-set.
            vec2 tileCoords;
            float xPos, zPos;

            vec3 locInTile = (wPosition - m_TileLocation);

             locInTile += vec3(m_TileWidth/2, 0, m_TileWidth/2);

             xPos = (locInTile.x / m_TileWidth);
             zPos = 1 - (locInTile.z / m_TileWidth);

            tileCoords = vec2(xPos, zPos);

            afflictionVector = texture2D(m_AfflictionTexture, tileCoords).rgba;
        
        
        //othrewise, the terrain's texCoords can be used for easiest texel fetching
        #else
            afflictionVector = texture2D(m_AfflictionTexture, texCoord.xy).rgba;
        #endif
    #endif

    livelinessValue = afflictionVector.r;
    plaguedValue = afflictionVector.g;


//get the 0,0 pixel at first corner of texture, and use this as sunlight value

    //----------------------
    // albedo calculations
    //----------------------
    
//always calculated since the
    vec3 blending;
    #ifdef ALBEDOMAP_0
      #ifdef ALPHAMAP
        #ifdef TRI_PLANAR_MAPPING
             blending = abs( norm );
                blending = (blending -0.2) * 0.7;
                blending = normalize(max(blending, 0.00001));      // Force weights to sum to 1.0 (very important!)
                float b = (blending.x + blending.y + blending.z);
                blending /= vec3(b, b, b);


            albedo = calculateTriPlanarAlbedoBlend(norm, wVertex, texCoord, blending);
            
        #else
            albedo = calculateAlbedoBlend(texCoord);
        #endif
      #else
        albedo = texture2D(m_AlbedoMap_0, texCoord);
      #endif
    #endif

        if(albedo.a <= 0.1){
            albedo.r = 1.0;
            
            discard;
         }








    #ifdef ROUGHNESSMAP
        Roughness = texture2D(m_RoughnessMap, texCoord).r * Roughness;
    #endif
    Roughness = max(Roughness, 1e-4);
    #ifdef METALLICMAP   
        Metallic = texture2D(m_MetallicMap, texCoord).r;
    #endif

    #ifdef METALLICMAP
        Metallic = texture2D(m_MetallicMap, texCoord).r * max(Metallic, 0.0);
    #else
        Metallic =  max(Metallic, 0.0);
    #endif
    


    //---------------------
    // normal calculations
    //---------------------
    
     
    #if defined(NORMALMAP_0) || defined(NORMALMAP_1) || defined(NORMALMAP_2) || defined(NORMALMAP_3) || defined(NORMALMAP_4) || defined(NORMALMAP_5) || defined(NORMALMAP_6) || defined(NORMALMAP_7) || defined(NORMALMAP_8) || defined(NORMALMAP_9) || defined(NORMALMAP_10) || defined(NORMALMAP_11)
  
   

    #ifdef TRI_PLANAR_MAPPING
    //    normal = calculateNormalTriPlanar(wNormal, wVertex, texCoord);

      #else
    //    normal = calculateNormal(texCoord);
      #endif

      
      
   //   normal+= norm;


    #else


      
   //    normal = normalize(norm * vec3(2.0) - vec3(1.0));

       normal = norm;
    #endif
 //   normal = normalize(normal * vec3(2.0) - vec3(1.0));

//APPLY PLAGUEDNESS TO THE PIXEL

vec4 plaguedAlbedo;    


float newPlagueScale = m_PlaguedMapScale; //manually assigned as of now, since running into bugs...
vec2 newScaledCoords;

#ifdef PLAGUEDALBEDOMAP
    #ifdef TRI_PLANAR_MAPPING
        newPlagueScale = newPlagueScale / 256;
        plaguedAlbedo = getTriPlanarBlend(wVertex, blending, m_PlaguedAlbedoMap, newPlagueScale);

    #else
        newScaledCoords = mod(wPosition.xz / m_PlaguedMapScale, 0.985);
        plaguedAlbedo = texture2D(m_PlaguedAlbedoMap, newScaledCoords);
    #endif
   
#else
    plaguedAlbedo = vec4(0.55, 0.8, 0.00, 1.0);
#endif

vec3 plaguedNormal;
#ifdef PLAGUEDNORMALMAP
    #ifdef TRI_PLANAR_MAPPING

        plaguedNormal = getTriPlanarBlend(wVertex, blending, m_PlaguedNormalMap, newPlagueScale).rgb;

    #else
        plaguedNormal = texture2D(m_PlaguedNormalMap, newScaledCoords).rgb;
    #endif


//   plaguedNormal = normalize((plaguedNormal.xyz * vec3(2.0) - vec3(1.0)));
//    plaguedNormal = normalize(tbnMat * plaguedNormal);
#else
    plaguedNormal = wNormal; 

#endif


float plaguedMetallic = 0.0;  
float plaguedRoughness = 0.0;
float plaguedAo = 1.0;
float plaguedEmissiveIntensity = 0.0;

#ifdef PLAGUEDROUGHNESSMETALLICMAP    
    vec4 metallicRoughnessAoEiVec = texture2D(m_PlaguedRoughnessMetallicMap, newScaledCoords);
    plaguedRoughness = metallicRoughnessAoEiVec.g;
    plaguedMetallic = metallicRoughnessAoEiVec.b;
    plaguedAo = metallicRoughnessAoEiVec.r;
    plaguedEmissiveIntensity = metallicRoughnessAoEiVec.a;
    
#else
    plaguedMetallic = 0.262;
    plaguedRoughness = 0.753; //note that these should be material params, and be multiplied by the plagued mrao map
                               // if it exists, or used as static values if there is not value in the map.
#endif


    
vec4 plaguedGlowColor = vec4(0.87, 0.95, 0.1, 1.0);

    noiseHash = getStaticNoiseVar0(wPosition, plaguedValue);
    Roughness = alterPlaguedRoughness(plaguedValue, Roughness, plaguedRoughness, noiseHash * plaguedAlbedo.a);
    Metallic = alterPlaguedMetallic(plaguedValue, Metallic,  plaguedMetallic, noiseHash * plaguedAlbedo.a);//use the alpha channel of albedo map to alter opcaity for the matching plagued normals, roughness, and metalicness at each pixel
    albedo = alterPlaguedColor(plaguedValue, albedo, plaguedAlbedo, noiseHash * plaguedAlbedo.a);
    normal = alterPlaguedNormalsForTerrain(plaguedValue, normal, plaguedNormal, noiseHash * plaguedAlbedo.a, wNormal);
    plaguedGlowColor = alterPlaguedGlow(plaguedValue, plaguedGlowColor, noiseHash);




plaguedGlowColor = vec4(0);



//END PLAGUEDNESS BEING APPLIED


//is this necissary to keep still? since spec gloss pipeline most likely will never be supported for this terrain shader...
    #ifdef SPECGLOSSPIPELINE

        #ifdef USE_PACKED_SG
            vec4 specularColor = texture2D(m_SpecularGlossinessMap, newTexCoord);
            float glossiness = specularColor.a * m_Glossiness;
            specularColor *= m_Specular;
        #else
            #ifdef SPECULARMAP
                vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
            #else
                vec4 specularColor = vec4(1.0);
            #endif
            #ifdef GLOSSINESSMAP
                float glossiness = texture2D(m_GlossinessMap, newTexCoord).r * m_Glossiness;
            #else
                float glossiness = m_Glossiness;
            #endif
            specularColor *= m_Specular;
        #endif
        vec4 diffuseColor = albedo;// * (1.0 - max(max(specularColor.r, specularColor.g), specularColor.b));
        Roughness = 1.0 - glossiness;
        vec3 fZero = specularColor.xyz;
    #else
        float specular = 0.5;
        float nonMetalSpec = 0.08 * specular;
        vec4 specularColor = (nonMetalSpec - nonMetalSpec * Metallic) + albedo * Metallic;
        vec4 diffuseColor = albedo - albedo * Metallic;
        vec3 fZero = vec3(specular);
    #endif


    gl_FragColor.rgb = vec3(0.0);
    
    vec3 ao = vec3(1.0);

 //   #ifdef LIGHTMAP
       vec3 lightMapColor = vec3(1.0);//vec3(0.8142); 
       lightMapColor = alterPlaguedAo(plaguedValue, lightMapColor, vec3(plaguedAo), noiseHash); // alter the AO map for plagued values
       #ifdef SEPARATE_TEXCOORD
        #ifdef AFFLICTIONTEXTURE
    //      lightMapColor = texture2D(m_AfflictionTexture, texCoord2).rgb;
          #endif
       #else
        #ifdef AFFLICTIONTEXTURE
    //      lightMapColor = texture2D(m_AfflictionTexture, texCoord).rgb;
          #endif
       #endif
 //      #ifdef AO_MAP
         lightMapColor.gb = lightMapColor.rr;
         ao = lightMapColor * 1.4;
         ao = max(ao, 1.0);
     //  #else
    //     gl_FragColor.rgb += diffuseColor.rgb * lightMapColor;
   //    #endif
       specularColor.rgb *= lightMapColor;
 //   #endif
    
  //SUN EXPOSURE AND TIME OF DAY - even though ambient lighting support day/night brightness scaling,
  //the timeOfDayScale will not affect anything as long as probeColor is not defined
    float factoredTimeOfDayScale = timeOfDayScale;
    #ifdef STATIC_SUN_INTENSITY
        indoorSunLightExposure = m_StaticSunIntensity;
    #endif
    #ifdef USE_VERTEX_COLORS_AS_SUN_INTENSITY
        indoorSunLightExposure = vertColors.r * indoorSunLightExposure;             //use R channel of vertexColors... *^.
        
    #endif
    brightestPointLight = 0.0;
    
    
    factoredTimeOfDayScale *= indoorSunLightExposure;  //indoor sun-light exposure is scaled by time of day's brightness as well..

    float ndotv = max( dot( normal, viewDir ),0.0);
    for( int i = 0;i < NB_LIGHTS; i+=3){
        vec4 lightColor = g_LightData[i];
        vec4 lightData1 = g_LightData[i+1];                
        vec4 lightDir;
        vec3 lightVec;            
        lightComputeDir(wPosition, lightColor.w, lightData1, lightDir, lightVec);

        float fallOff = 1.0;
        #if __VERSION__ >= 110
            // allow use of control flow
        if(lightColor.w > 1.0){
        #endif
            fallOff =  computeSpotFalloff(g_LightData[i+2], lightVec);
        #if __VERSION__ >= 110
        }
        #endif
        //point light attenuation
        fallOff *= lightDir.w;

        lightDir.xyz = normalize(lightDir.xyz);            
        vec3 directDiffuse;
        vec3 directSpecular;
        
         float hdotv = PBR_ComputeDirectLight(normal, lightDir.xyz, viewDir,
                            lightColor.rgb, fZero, Roughness, ndotv,
                            directDiffuse,  directSpecular);

        vec3 directLighting = diffuseColor.rgb *directDiffuse + directSpecular;
        
     //   #if defined(USE_VERTEX_COLORS_AS_SUN_INTENSITY) || defined(STATIC_SUN_INTENSITY)
            
            if(fallOff == 1.0){
                directLighting.rgb *= indoorSunLightExposure;// ... *^. to scale down how intense just the sun is (ambient and direct light are 1.0 fallOff)
                
            }
            else{
                    brightestPointLight = max(fallOff, brightestPointLight);
          
           }
   //     #endif
        
        
        
        gl_FragColor.rgb += directLighting * fallOff;
        
     
    }
    
    float minVertLighting;
    #ifdef BRIGHTEN_INDOOR_SHADOWS
        minVertLighting = 0.0833; //brighten shadows so that near pitch-dark caves which are naturally covered with DL shadows are not way too dark compared to when shadows are off
    #else
        minVertLighting = 0.0533;
    
    #endif
    
    factoredTimeOfDayScale = max(factoredTimeOfDayScale, brightestPointLight);
    
    factoredTimeOfDayScale = max(factoredTimeOfDayScale, minVertLighting); //essentially just the vertColors.r (aka indoor liht exposure) multiplied by the time of day scale.
    
    

    

   // #if NB_PROBES >= 1
        vec3 color1 = vec3(0.0);
        vec3 color2 = vec3(0.0);
        vec3 color3 = vec3(0.0);
        float weight1 = 1.0;
        float weight2 = 0.0;
        float weight3 = 0.0;

        float ndf = renderProbe(viewDir, wPosition, normal, norm, Roughness, diffuseColor, specularColor, ndotv, ao, g_LightProbeData, g_ShCoeffs, g_PrefEnvMap, color1);
        #if NB_PROBES >= 2
            float ndf2 = renderProbe(viewDir, wPosition, normal, norm, Roughness, diffuseColor, specularColor, ndotv, ao, g_LightProbeData2, g_ShCoeffs2, g_PrefEnvMap2, color2);
        #endif
        #if NB_PROBES == 3
            float ndf3 = renderProbe(viewDir, wPosition, normal, norm, Roughness, diffuseColor, specularColor, ndotv, ao, g_LightProbeData3, g_ShCoeffs3, g_PrefEnvMap3, color3);
        #endif

         #if NB_PROBES >= 2
            float invNdf =  max(1.0 - ndf,0.0);
            float invNdf2 =  max(1.0 - ndf2,0.0);
            float sumNdf = ndf + ndf2;
            float sumInvNdf = invNdf + invNdf2;
            #if NB_PROBES == 3
                float invNdf3 = max(1.0 - ndf3,0.0);
                sumNdf += ndf3;
                sumInvNdf += invNdf3;
                weight3 =  ((1.0 - (ndf3 / sumNdf)) / (NB_PROBES - 1)) *  (invNdf3 / sumInvNdf);
            #endif

            weight1 = ((1.0 - (ndf / sumNdf)) / (NB_PROBES - 1)) *  (invNdf / sumInvNdf);
            weight2 = ((1.0 - (ndf2 / sumNdf)) / (NB_PROBES - 1)) *  (invNdf2 / sumInvNdf);

            float weightSum = weight1 + weight2 + weight3;

            weight1 /= weightSum;
            weight2 /= weightSum;
            weight3 /= weightSum;
        #endif
        
        #ifdef USE_AMBIENT_LIGHT
            color1.rgb *= g_AmbientLightColor.rgb;
            color2.rgb *= g_AmbientLightColor.rgb;
            color3.rgb *= g_AmbientLightColor.rgb;
        #endif
        
        gl_FragColor.rgb += color1 * clamp(weight1,0.0,1.0) + color2 * clamp(weight2,0.0,1.0) + color3 * clamp(weight3,0.0,1.0);


     //   gl_FragColor.rgb = vec3(1.0);
 //   #endif
 
    #if defined(EMISSIVE) || defined (EMISSIVEMAP)
        #ifdef EMISSIVEMAP
            emissive = texture2D(m_EmissiveMap, texCoord);
        #else
            emissive = m_Emissive;
        #endif

        gl_FragColor += emissive * pow(emissive.a, m_EmissivePower) * m_EmissiveIntensity;

    #else
   //     gl_FragColor += emissive * pow(emissive.a,  2) * 1;
    
    #endif

    gl_FragColor += plaguedGlowColor * pow(plaguedValue * 1.3, plaguedGlowColor.a) * (plaguedValue *1.5);


    // add the fog after the lighting for pbr
    #ifdef USE_FOG
        #ifdef FOG_LINEAR
            gl_FragColor = getFogLinear(gl_FragColor, m_FogColor, m_LinearFog.x, m_LinearFog.y, fogDistance);
        #endif
        #ifdef FOG_EXP
            gl_FragColor = getFogExp(gl_FragColor, m_FogColor, m_ExpFog, fogDistance);
        #endif
        #ifdef FOG_EXPSQ
            gl_FragColor = getFogExpSquare(gl_FragColor, m_FogColor, m_ExpSqFog, fogDistance);
        #endif
    #endif 
    


    gl_FragColor.a = 1.0;


}
