import React,{useEffect,useState} from 'react';
import {Dimensions,TouchableOpacity,ScrollView,Image,StyleSheet, Text, View } from 'react-native';

import {Swipeable} from 'react-native-gesture-handler'

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from 'react-navigation-stack';

import ContentLoader,{Rect} from 'react-content-loader/native'

import {AppLoading} from 'expo'

import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window')

 function Home() {

const [data,setData]=useState([])
const [loading,isLoading]=useState(false)

useEffect(()=>{

  const url='https://rss.itunes.apple.com/api/v1/us/apple-music/coming-soon/all/100/explicit.json'

  fetch(url)
  .then(res=>res.json())
  .then(data1=>{

const arr=[]

// console.log(data1['feed']['results'])

data1['feed']['results'].forEach(x=>{

  const obj={
    artist:x.artistName,
    releaseDate:x.releaseDate,
    name:x.name,
    url:x.artistUrl,
    artworkUrl:x.artworkUrl100
  }

arr.push(obj)
  
})  



setData(arr)

isLoading(true)

  })



},[])  


const RightAction=()=>(
  <View style={{width:width,height:height*0.1}}> 
   
  </View>
)



// useEffect(()=>{

// },[data])


const alterData=(i)=>{
  setData(data.filter(x=>x.name!==i.name).filter(x=>x!==null))
}

  return (



    <View style={styles.container}>


<Text style={{ marginBottom:0.04, borderBottomColor:'#f4f4f4',borderBottomWidth:2, marginTop:height*0.07,width:width,height:height*0.05,textAlign:'center',fontFamily:'Poppins-ExtraBold'}} >

Apple Top 100 Albumns

</Text>

<ScrollView style={{width:width,marginTop:5}} >


{
  loading ?( data.length>0&& data.map((i,k)=>(

i &&(
    <View key={i.name} style={{marginBottom:-190,marginTop:3}} >



<TouchableOpacity>

<Swipeable
renderRightActions={RightAction}
onSwipeableRightOpen={()=>alterData(i)}
>


<View style={{width:width*0.2}} >

<Text style={{textAlign:'center',fontSize:40,fontWeight:'bold',fontFamily:'Poppins-ExtraBold'}}>
  {data.indexOf(i)+1}
  </Text>
  </View>

  <View style={{width:width*0.2,marginLeft:width*0.2}} >

<Image 

source={{uri:i.artworkUrl}}
resizeMode={"contain"}
style={{height:height*0.2,width:width*0.2,position:"relative",bottom:height*0.13}}
/>

</View>


<View style={{display:'flex',width:width*0.5,marginLeft:width*0.5,position:'relative',bottom:height*0.286}}>

<Text style={{fontSize:20,fontWeight:'bold',fontFamily:'Poppins-Bold'}} >
  {i.name}
</Text>

<Text style={{fontWeight:'bold',marginTop:5,fontFamily:'Poppins-Medium'}}>
  {i.artist}
</Text>

<Text style={{marginTop:2,fontFamily:'Poppins-Light'}}>
  {i.releaseDate}
</Text>



</View>


</Swipeable>
</TouchableOpacity>

    </View>

)

  ))):(


 Array.from(Array(10).keys()).map((i,k)=>(




<View key={i}  style={{marginLeft:width*0.09,marginTop:-height*0.04}} >

<ContentLoader 
speed={1}
height={140}
viewBox="0 0 380 70"
backgroundColor={'#eee'}
foregroundColor={'#999'}
>
<Rect x="0" y="0" rx="4" ry="3" width="70" height="65" />
<Rect x="80" y="0" rx="4" ry="3" width="250" height="13" />
<Rect x="80" y="30" rx="4" ry="3" width="170" height="13" />
<Rect x="80" y="50" rx="4" ry="3" width="200" height="13" />

</ContentLoader>  
</View>





//   <View key={i} style={styles.skeleton}>

// <View style={styles.skeleton_avatar}>
  
//   </View>

// <View>

//   <View style={styles.skeleton_name}>
  
//   </View>
  
//   <View style={styles.skeleton_author}>
  
//   </View>
  
//   <View style={styles.skeleton_date}>
  
//   </View>
  
  
//   </View>
//   </View>


))



  )
}



</ScrollView>

    </View>
  );
}


const fetchFonts=()=>{
  return Font.loadAsync({
    'Poppins-ExtraBold':require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Bold':require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Medium':require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light':require('./assets/fonts/Poppins-LightItalic.ttf')
  })
}



// const Stack = createStackNavigator();



 function App() {

const [fontLoaded,setFontLoaded]=useState(false);

if(!fontLoaded){
  return (
    <AppLoading
    startAsync={fetchFonts}
    onFinish={()=>{
      setFontLoaded(true)
    }}
    
    />
  )
}


  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //   >
    //     <Stack.Screen name="Home" component={Home}
    //       options={{ title: 'Apple Top 100 Albumns' }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <Home/>
  );

}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   
  skeleton:{
    height:height*0.12,
    width:width,
    display:'flex',
    flexDirection:'row'
  },

  skeleton_avatar:{
    height:height*0.1,
    width:width*0.2,
    backgroundColor:'linear-gradient(to left, transparent,rgba(255,255,255,0.4),transparent)',
    marginLeft:width*0.2,
    marginTop:height*0.02
  },

  skeleton_name:{
    height:height*0.025,
    width:width*0.3,
    backgroundColor:'linear-gradient(to left, transparent,rgba(255,255,255,0.4),transparent)',
    marginLeft:width*0.1,
    marginTop:height*0.02
  },

  skeleton_author:{
    height:height*0.012,
    width:width*0.15,
    backgroundColor:'linear-gradient(to left, transparent,rgba(255,255,255,0.4),transparent)',
    marginLeft:width*0.1,
    marginTop:height*0.02
  },

  skeleton_date:{
    height:height*0.018,
    width:width*0.2,
    backgroundColor:'linear-gradient(to left, transparent,rgba(255,255,255,0.4),transparent)',
    marginLeft:width*0.1,
    marginTop:height*0.02
  }



});
