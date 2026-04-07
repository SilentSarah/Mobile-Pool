import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function App() {
  const [isHelloWorld, setIsHelloWorld] = useState(false);

  return (
    <View className="flex items-center gap-2 justify-center border h-screen">
      <Text className="font-bold text-5xl bg-amber-700 text-white p-2 rounded-lg">
        {isHelloWorld ? "Hello World!" : "A simple text"}
      </Text>
      <Pressable 
        className="bg-slate-300 p-2 rounded-lg border" 
        onPress={() => {
          console.log("Button pressed");
          setIsHelloWorld(!isHelloWorld);
        }}
      >
        <Text className="text-black">Click me</Text>
      </Pressable>
    </View>
  );
}
