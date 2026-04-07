import { useState } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { evaluate } from "mathjs";

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width > 600;

  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const buttons = [
    ["AC", "C", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", ""],
  ];

  const handlePress = (btn: string) => {
    if (!btn) return;

    if (btn === "AC") {
      setExpression("0");
      setResult("0");
      return;
    }

    if (btn === "C") {
      if (expression.length > 1) {
        setExpression(expression.slice(0, -1));
      } else {
        setExpression("0");
      }
      return;
    }

    if (btn === "=") {
      try {
        const evalResult = evaluate(expression);
        if (!isFinite(evalResult)) {
          setResult("Error");
        } else {
          const formatRes = Number.isInteger(evalResult) ? evalResult.toString() : parseFloat(evalResult.toFixed(10)).toString();
          setResult(formatRes || "0");
        }
      } catch (error) {
        setResult("Error");
      }
      return;
    }

  if (expression === "0" && btn === "-") {
    setExpression("-");
  } else if (expression === "0" && btn !== "." && !["/", "*", "+", "-"].includes(btn)) {
      setExpression(btn);
    } else {
      setExpression(expression + btn);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className={`flex-1 items-center ${isWide ? 'max-w-lg w-full' : 'w-full max-w-sm'}`}>
        {/* AppBar */}
        <View className="h-16 bg-blue-600 justify-center items-center shadow-md rounded-b-xl mb-2">
          <Text className="text-white text-xl font-bold">Calculator</Text>
        </View>

        <View className="flex-1 justify-end p-4">
          {/* Output Area */}
          <View className="items-end mb-6">
            <Text className="text-gray-500 text-3xl mb-1">{expression}</Text>
            <Text className="text-black text-6xl font-light" numberOfLines={1} adjustsFontSizeToFit>{result}</Text>
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
      </View>
    </SafeAreaView>
  );
}
