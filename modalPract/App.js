import { StyleSheet, Text, View, Button, Modal } from "react-native";
import { useState } from "react";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 30 }}>Modal Practice</Text>
      <Button title="View Modal" onPress={()=> setModalVisible(true)}/>
      
      <Modal style={styles.modal} visible={isModalVisible} onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>This is a Modal</Text>
          <Button title="Back" onPress={()=> setModalVisible(false)}/>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "plum",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems:'center',
    justifyContent:'center'
  },
  modalText:{
    fontSize:22,
    fontWeight:'bold'
  }
});
