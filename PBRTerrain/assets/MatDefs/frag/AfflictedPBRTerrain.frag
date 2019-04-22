#import "Common/ShaderLib/GLSLCompat.glsllib"
#import "Common/ShaderLib/PBR.glsllib"
#import "Common/ShaderLib/Parallax.glsllib"
#import "Common/ShaderLib/Lighting.glsllib"
#import "MatDefs/ShaderLib/AfflictionLib.glsllib"

uniform vec4 g_LightData[NB_LIGHTS];

varying vec3 wPosition;

#ifdef INDIRECT_LIGHTING
//  uniform sampler2D m_IntegrateBRDF;
  uniform samplerCube g_PrefEnvMap;
  uniform samplerCube g_IrradianceMap;
  uniform vec3 g_ShCoeffs[9];
  uniform vec4 g_LightProbeData;
#endif




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

#if defined(NORMALMAP_0) || defined(NORMALMAP_1) || defined(NORMALMAP_2) || defined(NORMALMAP_3) || defined(NORMALMAP_4) || defined(NORMALMAP_5) || defined(NORMALMAP_6) || defined(NORMALMAP_7) || defined(PLAGUEDNORMALMAP)
    varying vec4 wTangent;
#endif


varying vec2 texCoord;


uniform vec3 g_CameraPosition;


float Metallic;
float Roughness;


float hour = 0;



varying vec3 vPosition;
varying vec3 vnPosition;
varying vec3 vViewDir;
varying vec4 vLightDir;
varying vec4 vnLightDir;
varying vec3 lightVec;

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


#ifdef AFFLICTIONTEXTURE
    uniform sampler2D m_AfflictionTexture;
#endif

//defined for sub terrains that arent equal to each map tile size
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
    normal.rgb = mix(normal.xyz, wNormal.xyz, ab);\
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
    newNormal = texture2D(m_NormalMap##index, coord##index).xyz;\
    normal = mix(normal, newNormal, ab);

//BLEND METHODS FOR TRIPLANAR...  
#define TRI_BLEND(index, ab, worldCoords, blending)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo = getTriPlanarBlend(worldCoords, blending, m_AlbedoMap##index, m_AlbedoMap##index##_scale);\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo = mix( albedo, tempAlbedo ,ab );\
    Metallic = mix(Metallic, m_Metallic##index, ab);\
    normal.rgb = mix(normal.xyz, wNormal.xyz, ab);\
    Roughness = mix(Roughness, m_Roughness##index, ab);    

   

#define TRI_BLEND_NORMAL(index, ab, worldCoords, blending)\
    afflictionMode = m_AfflictionMode##index;\
    tempAlbedo.rgb = getTriPlanarBlend(worldCoords, blending, m_AlbedoMap##index, m_AlbedoMap##index##_scale).rgb;\
    tempNormal.rgb = getTriPlanarBlend(worldCoords, blending, m_NormalMap##index, m_AlbedoMap##index##_scale).rgb;\
    tempAlbedo.rgb = alterLiveliness(tempAlbedo.rgb, livelinessValue, afflictionMode);\
    albedo.rgb = mix( albedo.rgb, tempAlbedo.rgb ,ab );\
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


   mat3 tbnMat;
vec3 norm;


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




#if defined(USE_VERTEX_COLORS_AS_SUN_INTENSITY) 
    varying vec4 vertColors; //probably wont happen for rock tower, but leave code here so its consistent to afflictedPbr.frag and just in case you make a custom rock tower with vert colors ever
#endif

#ifdef STATIC_SUN_INTENSITY
    uniform float m_StaticSunIntensity;
#endif

float brightestPointLight = 1.0;

#ifdef PROBE_COLOR
    uniform vec4 m_ProbeColor;
#endif

void main(){
    
    
    float indoorSunLightExposure = 1.0;//scale this to match R channel of vertex colors

    vec3 probeColorMult = vec3(1.0);
    float timeOfDayScale = 1.0;
    #ifdef PROBE_COLOR
            timeOfDayScale = m_ProbeColor.w; // time of day is stored in alpha value of the ProbeColor vec4. this way the rgb vec3 can be used for scaling probe color
            probeColorMult = m_ProbeColor.xyz;
     #endif
    
    
    
    vec3 viewDir = normalize(g_CameraPosition - wPosition);

    vec3 norm = normalize(wNormal);
    normal = norm;
 //   norm = vec3(0.5, 0.5, 1.0);
    #if defined(NORMALMAP_0) || defined(PARALLAXMAP) || defined(PLAGUEDNORMALMAP)
        vec3 tan = normalize(wTangent.xyz);
   //     tbnMat = mat3(tan, wTangent.w * cross( (wNormal), (tan)), norm);

      mat3 tbnMat = mat3(tan, wTangent.w * cross( (norm), (tan)), norm);
   

    #endif

    afflictionVector = vec4(1.0, 0.0, 0.0, 0.0);
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
             blending = abs( wNormal );
                blending = (blending -0.2) * 0.7;
                blending = normalize(max(blending, 0.00001));      // Force weights to sum to 1.0 (very important!)
                float b = (blending.x + blending.y + blending.z);
                blending /= vec3(b, b, b);


            albedo = calculateTriPlanarAlbedoBlend(wNormal, wVertex, texCoord, blending);
            
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

      normal += norm * 0.9;

normal = normalize(normal * vec3(2.0) - vec3(1.0));

    #else

      
       normal = normalize(norm * vec3(2.0) - vec3(1.0));

       normal = wNormal;
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


    plaguedNormal = normalize((plaguedNormal.xyz * vec3(2.0) - vec3(1.0)));
    plaguedNormal = normalize(tbnMat * plaguedNormal);
#else
    plaguedNormal = norm; 

#endif


float plaguedMetallic;
float plaguedRoughness;
#ifdef PLAGUEDROUGHNESSMETALLICMAP
    plaguedMetallic = 0.262;
    plaguedRoughness = 0.753;
//    plaguedRoughness = texture2D(m_PlaguedRoughnessMetallicMap, newScaledCoords).g;
#else
    plaguedMetallic = 0.262;
    plaguedRoughness = 0.753;
#endif

vec4 plaguedGlowColor = vec4(0.87, 0.95, 0.1, 1.0);

    noiseHash = getStaticNoiseVar0(wPosition, plaguedValue);
    Roughness = alterPlaguedRoughness(plaguedValue, Roughness, plaguedRoughness, noiseHash * plaguedAlbedo.a);
    Metallic = alterPlaguedMetallic(plaguedValue, Metallic,  plaguedMetallic, noiseHash * plaguedAlbedo.a);//use the alpha channel of albedo map to alter opcaity for the matching plagued normals, roughness, and metalicness at each pixel
    albedo = alterPlaguedColor(plaguedValue, albedo, plaguedAlbedo, noiseHash * plaguedAlbedo.a);
    normal = alterPlaguedNormals(plaguedValue, normal, plaguedNormal, noiseHash * plaguedAlbedo.a);
    plaguedGlowColor = alterPlaguedGlow(plaguedValue, plaguedGlowColor, noiseHash);

plaguedGlowColor = vec4(0);



//END PLAGUEDNESS BEING APPLIED

    float specular = 0.5;
    #ifdef SPECGLOSSPIPELINE

        #ifdef USE_PACKED_SG
            vec4 specularColor = texture2D(m_SpecularGlossinessMap, texCoord);
            float glossiness = specularColor.a * m_Glossiness;
            specularColor *= m_Specular;
        #else
            #ifdef SPECULARMAP
                vec4 specularColor = texture2D(m_SpecularMap, texCoord);
            #else
                vec4 specularColor = vec4(1.0);
            #endif
            #ifdef GLOSSINESSMAP
                float glossiness = texture2D(m_GlossinesMap, texCoord).r * m_Glossiness;
            #else
                float glossiness = m_Glossiness;
            #endif
            specularColor *= m_Specular;
        #endif
        vec4 diffuseColor = albedo;// * (1.0 - max(max(specularColor.r, specularColor.g), specularColor.b));
        Roughness = 1.0 - glossiness;
    #else      
        float nonMetalSpec = 0.08 * specular;
        vec4 specularColor = (nonMetalSpec - nonMetalSpec * Metallic) + albedo * Metallic;
        vec4 diffuseColor = albedo - albedo * Metallic;
    #endif

    gl_FragColor.rgb = vec3(0.0);
    vec3 ao = vec3(1.0);


    ao = alterPlaguedAo(plaguedValue, ao, vec3(1.0), noiseHash); // alter the AO map for plagued values


float sunBrightness = 1.0;   

 //   #ifdef LIGHTMAP
       vec3 lightMapColor;
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
 
 
 
  //SUN EXPOSURE AND TIME OF DAY
    float factoredTimeOfDayScale = timeOfDayScale;
    #ifdef STATIC_SUN_INTENSITY
        indoorSunLightExposure = m_StaticSunIntensity;
        brightestPointLight = 0.0;
    #endif
    #ifdef USE_VERTEX_COLORS_AS_SUN_INTENSITY
        indoorSunLightExposure = vertColors.r * indoorSunLightExposure;             //use R channel of vertexColors... *^.
        brightestPointLight = 0.0;
    #endif
    
    
    
    factoredTimeOfDayScale *= indoorSunLightExposure;  //timeOfDayScale (aka a float to scale lightProbe at night vs day) is only as effective as the indooSunLightExposure
                                                           //it will be 
     

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
        
        PBR_ComputeDirectLight(normal, lightDir.xyz, viewDir,
                            lightColor.rgb,specular, Roughness, ndotv,
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
        minVertLighting = 0.0833; //brighten shadows so that caves which are naturally covered from the DL shadows are not way too dark compared to when shadows are off
    #else
        minVertLighting = 0.0533;
    
    #endif
    
    factoredTimeOfDayScale = max(factoredTimeOfDayScale, brightestPointLight);
    
    factoredTimeOfDayScale = max(factoredTimeOfDayScale, minVertLighting); //essentially just the vertColors.r (aka indoor liht exposure) multiplied by the time of day scale.
    
    

    #ifdef INDIRECT_LIGHTING
        vec3 rv = reflect(-viewDir.xyz, normal.xyz);
        //prallax fix for spherical bounds from https://seblagarde.wordpress.com/2012/09/29/image-based-lighting-approaches-and-parallax-corrected-cubemap/
        // g_LightProbeData.w is 1/probe radius + nbMipMaps, g_LightProbeData.xyz is the position of the lightProbe.

        float invRadius = fract( g_LightProbeData.w );
        float nbMipMaps = g_LightProbeData.w - invRadius;
        rv = invRadius * (wPosition - g_LightProbeData.xyz) +rv;

         //horizon fade from http://marmosetco.tumblr.com/post/81245981087
        float horiz = dot(rv , norm);
        float horizFadePower = 1.0 - Roughness;
        horiz = clamp( 1.0 + horizFadePower * horiz, 0.0, 1.0 );
        horiz *= horiz;

        vec3 indirectDiffuse = vec3(0.0);
        vec3 indirectSpecular = vec3(0.0);
        indirectDiffuse = sphericalHarmonics(normal.xyz, g_ShCoeffs) * diffuseColor.rgb;
        vec3 dominantR = getSpecularDominantDir( normal, rv.xyz, Roughness*Roughness ) ;
        indirectSpecular = ApproximateSpecularIBLPolynomial(g_PrefEnvMap, specularColor.rgb , Roughness, ndotv, dominantR, nbMipMaps);
        indirectSpecular *= vec3(horiz);
        
        vec3 indirectLighting = (indirectDiffuse  + indirectSpecular) * probeColorMult * ao * factoredTimeOfDayScale;  //multiply the probeColor and time of day scale by final inderectLighting value from lightProbe

        gl_FragColor.rgb = gl_FragColor.rgb + indirectLighting  * step( 0.0, g_LightProbeData.w ) ;
    #endif
 
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



    gl_FragColor.a = 1.0;


}
