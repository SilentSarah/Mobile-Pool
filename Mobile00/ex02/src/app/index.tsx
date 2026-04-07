import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const buttons = [
    ["AC", "C", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", ""],
  ];

  const handlePress = (btn: string) => {
    if (btn) {
      console.log(`Button pressed: ${btn}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* AppBar */}
      <View className="h-16 bg-blue-600 justify-center items-center shadow-md">
        <Text className="text-white text-xl font-bold">Calculator</Text>
      </View>

      <View className="flex-1 justify-end p-4">
        {/* Output Area */}
        <View className="items-end mb-4">
          <Text className="text-gray-500 text-3xl mb-1">0</Text>
          <Text className="text-black text-6xl font-light">0</Text>
        </View>

        {/* Keypad */}
        <View className="gap-3">
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row gap-3">
              {row.map((btn, btnIndex) => {
                const isOperator = ["/", "*", "-", "+", "="].includes(btn);
                const isSpecial = ["AC", "C"].includes(btn);
                
                let bgColor = "bg-gray-200 mt-1";
                let textColor = "text-black";
                
                if (isOperator) {
                  bgColor = "bg-orange-500";
                  textColor = "text-white";
                } else if (isSpecial) {
                  bgColor = "bg-gray-400";
                }

                if (!btn) {
                  return <View key={btnIndex} className="flex-1 aspect-square" />;
                }

                return (
                  <Pressable
                    key={btnIndex}
                    className={`flex-1 aspect-square rounded-full justify-center items-center ${bgColor} active:opacity-70`}
                    onPress={() => handlePress(btn)}
                  >
                    <Text className={`text-3xl ${textColor}`}>{btn}</Text>
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
