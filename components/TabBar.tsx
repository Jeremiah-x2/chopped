import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const router = useRouter();
  const icons = {
    home: (props: any) => (
      <AntDesign name="home" size={20} color={"gray"} {...props} />
    ),
    explore: (props: any) => (
      <Feather name="compass" size={20} color={"gray"} {...props} />
    ),
    search: (props: any) => (
      <Ionicons name="search" size={20} color={"gray"} {...props} />
    ),

    groceryList: (props: any) => (
      <>
        {
          <SimpleLineIcons
            name="notebook"
            size={20}
            color={"gray"}
            {...props}
          />
        }
      </>
    ),
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        // console.log("Route Name", route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };
        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icons[route.name]({ color: isFocused ? "orange" : "gray" })}

            <Text
              style={{
                color: isFocused ? "orange" : "gray",
                fontWeight: isFocused ? "600" : "400",
                fontSize: 11,
                textTransform: "capitalize",
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    borderCurve: "continuous",
    elevation: 5,
    // shadowColor: "orange",
    borderWidth: 1,
    borderColor: "rgba(242,194,48,0.3)",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    // opacity: 0,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
