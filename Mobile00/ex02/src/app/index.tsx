import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width > 600;

  const buttons = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "00", "="],
  ];

  const handlePress = (btn: string) => {
    if (btn) {
      console.log(`Button pressed: ${btn}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-16 bg-blue-600 justify-center items-center shadow-md">
        <Text className="text-white text-xl font-bold">Calculator</Text>
      </View>

      {/* Result Display */}
      <View className="p-6 border-b border-gray-200">
        <View className="items-end">
          <Text className="text-gray-500 text-2xl mb-2" numberOfLines={1}>0</Text>
          <Text className="text-black text-5xl font-light" numberOfLines={1} adjustsFontSizeToFit>0</Text>
        </View>
      </View>

      {/* Keypad */}
      <View className="flex-1 p-2">
        <View className="flex-1 gap-1">
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-1 flex-row gap-1">
              {row.map((btn, btnIndex) => {
                const isOperator = ["+", "-", "*", "/", "="].includes(btn);
                const isSpecial = ["AC", "C"].includes(btn);

                let bgColor = "bg-gray-100";
                let textColor = "text-black";

                if (isOperator || btn === "=") {
                  bgColor = "bg-orange-500";
                  textColor = "text-white";
                } else if (isSpecial) {
                  bgColor = "bg-gray-400";
                  textColor = "text-white";
                }

                if (!btn) {
                  return <View key={btnIndex} className="flex-1" />;
                }

                return (
                  <Pressable
                    key={btnIndex}
                    className={`flex-1 justify-center items-center ${bgColor} active:opacity-70 border border-gray-300`}
                    onPress={() => handlePress(btn)}
                  >
                    <Text className={`text-2xl font-medium ${textColor}`}>{btn}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
