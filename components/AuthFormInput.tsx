import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

export interface IFormSchema {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ICustomFormInput {
  label: string;
  placeholder: string;
  name: "fullName" | "email" | "username" | "password" | "confirmPassword";
  control: Control<IFormSchema, any, IFormSchema> | undefined;
  errors: FieldErrors<IFormSchema>;
}

export function CustomFormInput({
  name,
  control,
  placeholder,
  label,
  errors,
}: ICustomFormInput): React.ReactNode {
  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>{label}</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "orange",
              borderRadius: 12,
              height: 56,
              paddingLeft: 20,
              elevation: 6,
              backgroundColor: "white",
              color: "#222",
            }}
            placeholder={placeholder}
            placeholderTextColor={"gray"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <Text style={{ fontSize: 14, color: "red" }}>
          {errors[name]?.message}
        </Text>
      )}
    </View>
  );
}
export interface ICustomFormPasswordInput extends ICustomFormInput {}
export function CustomFormPasswordInput({
  placeholder,
  name,
  control,
  label,
  errors,
}: ICustomFormInput): React.ReactNode {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>{label}</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <View style={{ position: "relative" }}>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: "orange",
                borderRadius: 12,
                height: 56,
                paddingLeft: 20,
                elevation: 6,
                backgroundColor: "white",
                color: "#222",
              }}
              placeholder={placeholder}
              placeholderTextColor={"gray"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={showPassword}
            />
            <Pressable
              style={{
                position: "absolute",
                right: 0,
                height: "100%",
                paddingHorizontal: 4,
                paddingRight: 8,
                justifyContent: "center",
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Ionicons name="eye-outline" size={20} />
              ) : (
                <Ionicons name="eye-off-outline" size={20} />
              )}
            </Pressable>
          </View>
        )}
        name={name}
      />
      {errors[name] && (
        <Text style={{ fontSize: 14, color: "red" }}>
          {errors[name]?.message}
        </Text>
      )}
    </View>
  );
}
