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
import { storeUser } from "../Utilities/DatabaseManager";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function SignupScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateField = (field: string, value: string) => {
        let errorMessage = "";
        if (!value) {
            errorMessage = `${field} is required`;
        }

        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const handleSignup = async () => {
        validateField("email", email);
        validateField("password", password);
        validateField("confirmPassword", confirmPassword);

        if (!email || !password || !confirmPassword) return;
        if (password !== confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            return;
        }

        try {
            await storeUser({ email, password });
            // Use toast notification for success
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Signup Successful!',
                text2: 'You can now log in with your new account.',
            });
            navigation.goBack();
        } catch (error: any) {
            // Use toast notification for error
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Signup Failed',
                text2: error.message,
            });
        }
    };

    const handleLoginRedirect = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.content}>
                        <Text style={styles.title}>Sign Up</Text>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="Enter email"
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
                            <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter password"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        if (errors.password) setErrors({ ...errors, password: "" });
                                    }}
                                    onBlur={() => validateField("password", password)}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={[styles.passwordContainer, errors.confirmPassword && styles.inputError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter confirm password"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                                    }}
                                    onBlur={() => {
                                        if (!confirmPassword) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                confirmPassword: "Confirm Password is required",
                                            }));
                                        } else if (password !== confirmPassword) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                confirmPassword: "Passwords do not match",
                                            }));
                                        }
                                    }}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#888" />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLoginRedirect}>
                            <Text style={styles.signUpText}>
                                Already have an account? <Text style={styles.signUpLink}>Log In</Text>
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
        marginBottom: 5,
        fontSize: 14,
        color: "#333",
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
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "space-between",
    },
    passwordInput: {
        flex: 1,
        fontSize: 15,
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
