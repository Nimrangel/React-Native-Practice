import { View, Text, StyleSheet, Button, } from "react-native";


export default function HomeScreen({navigation}){
    return(
        <View style={homeStyle.homeContainer}>
            <Text style={homeStyle.homeText}>Home Screen</Text>
            <Button title="Go to About" onPress={()=> navigation.navigate('About')}/>
        </View>
    )
}

const homeStyle = StyleSheet.create({
    homeContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    homeText:{
        fontSize: 24,
        fontWeight:'bold',
        marginBottom: 50
        
        
    },
    homeTextInput:{
        width:100,
        height:40,
        margin:12,
        padding:10,
        borderWidth:2
    }
})