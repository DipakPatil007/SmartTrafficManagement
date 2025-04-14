import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getUserByEmail } from "../Utilities/DatabaseManager";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateField = (field: string, value: string) => {
        let errorMessage = "";
        if (!value) {
            errorMessage = `${field === "email" ? "Email" : "Password"} is required`;
        }
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const handleLogin = async () => {
        validateField("email", email);
        validateField("password", password);

        if (!email || !password) return;

        const storedUser = await getUserByEmail(email);

        if (storedUser && storedUser.password === password) {
            navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
            });
        } else {
            // Replace alert with a toast
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Login Failed',
                text2: 'Invalid email or password',
                visibilityTime: 3000,
            });
        }
    };

    const handleSignUp = () => {
        navigation.navigate("SignupScreen");
    };

    const handleForgotPassword = () => {
        // navigation.navigate("ForgotPassword");
    };

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.content}>
                        <Text style={styles.title}>Login</Text>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (errors.email) setErrors({ ...errors, email: "" });
                                }}
                                onBlur={() => validateField("email", email)}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        {/* Password */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.passwordInput,
                                        errors.password && styles.inputError,
                                    ]}
                                    placeholder="Enter your password"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        if (errors.password) setErrors({ ...errors, password: "" });
                                    }}
                                    onBlur={() => validateField("password", password)}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword((prev) => !prev)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off" : "eye"}
                                        size={24}
                                        color="#999"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        {/* Forgot Password aligned right */}
                        <View style={styles.forgotPasswordWrapper}>
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpText}>
                                Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            © {new Date().getFullYear()} Smart Traffic Management
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 5,
    },
    passwordContainer: {
        position: "relative",
        width: "100%",
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: 12,
    },
    forgotPasswordWrapper: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 25,
    },
    forgotText: {
        color: "#007AFF",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    signUpText: {
        textAlign: "center",
        fontSize: 14,
        color: "#444",
    },
    signUpLink: {
        color: "#007AFF",
        fontWeight: "600",
    },
    footer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 12,
        color: "#888",
    },
});
