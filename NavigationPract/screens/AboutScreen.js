import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen({route}){
    const navigation = useNavigation()
    return(
        <View style={aboutStyle.aboutContainer}>
            <Text style={aboutStyle.aboutText}> About Screen </Text>
            <Button title="Go Back" onPress={()=> navigation.navigate('Home')}/>
        </View>
    )
}


const aboutStyle = StyleSheet.create({
    aboutContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    aboutText:{
        fontSize:24,
        fontWeight:'bold'
    }
})