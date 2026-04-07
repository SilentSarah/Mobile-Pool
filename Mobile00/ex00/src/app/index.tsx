import { Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex items-center gap-2 justify-center border flex-1">
      <Text className="font-bold text-5xl bg-amber-700 text-white p-2 rounded-lg">Hello World</Text>
      <Pressable className="bg-slate-300 p-2 rounded-lg border" onPress={() => console.log("Button pressed")}>
        <Text className="text-black">Click me</Text>
      </Pressable>
    </View>
  );
}
