import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { evaluate } from "mathjs";

export default function App() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const buttons = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "00", "="],
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

    if (btn === "00") {
      if (expression === "0") {
        setExpression("0");
      } else {
        setExpression(expression + "00");
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
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-16 bg-blue-600 justify-center items-center shadow-md">
        <Text className="text-white text-xl font-bold">Calculator</Text>
      </View>

      {/* Result Display */}
      <View className="p-6 border-b border-gray-200">
        <View className="items-end">
          <Text className="text-gray-500 text-2xl mb-2" numberOfLines={1}>{expression}</Text>
          <Text className="text-black text-5xl font-light" numberOfLines={1} adjustsFontSizeToFit>{result}</Text>
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
