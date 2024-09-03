import { View,Text, StyleSheet } from "react-native";

export default function DetailsScreen({route}){
    const {pokemonName, pokemonURL} = route.params
    return(
        <View style={detailStyle.detailContainer}>
            <Text style={detailStyle.detailText}>{pokemonName}</Text>
        </View>
    )
}

const detailStyle = StyleSheet.create({
    detailContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    detailText:{
        fontSize:24,
        fontWeight:'bold'
    }
})