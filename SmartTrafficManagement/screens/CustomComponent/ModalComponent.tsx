import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import Modal from "react-native-modal";

export default function CustomConfirmDialog({ navigation }: any) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);

    const handleLogout = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
            })
        );
        toggleModal(); // Close the modal after confirming
    };

    return (
        <View style={styles.container}>
            {/* Your App Content */}
            <TouchableOpacity onPress={toggleModal} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            {/* Custom Modal */}
            <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut" backdropColor="rgba(0, 0, 0, 0.5)" backdropOpacity={0.7}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirm</Text>
                    <Text style={styles.modalMessage}>Do you really want to logout?</Text>
                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    logoutButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 250,
        elevation: 5, // for Android shadow
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#333",
        fontWeight: "500",
    },
    confirmButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
