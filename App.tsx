import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface InitialState {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
}

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};

function App() {
  const [state, setState] = useState<InitialState>(initialState);

  const handleNumber = (value: string | number | undefined) => {
    if (state.currentValue === "0") {
      return {
        operator: undefined,
        previousValue: undefined,
        currentValue: `${value}`,
      };
    }

    return {
      currentValue: `${state.currentValue}${value}`,
    };
  };

  const handleEqual = () => {
    const { currentValue, previousValue, operator } = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue!);
    const resetState = { operator: null, previousValue: null };

    switch (operator) {
      case "+":
        return {
          currentValue: `${previous + current}`,
          ...resetState,
        };
      case "-":
        return {
          currentValue: `${previous - current}`,
          ...resetState,
        };
      case "*":
        return {
          currentValue: `${previous * current}`,
          ...resetState,
        };
      case "/":
        return {
          currentValue: `${previous / current}`,
          ...resetState,
        };
      default:
        return state;
    }
  };

  const calculator = (type: string, value?: string) => {
    switch (type) {
      case "number":
        return handleNumber(value);
      case "clear":
        return initialState;
      case "posneg":
        return {
          operator: undefined,
          previousValue: undefined,
          currentValue: `${parseFloat(state.currentValue) * -1}`,
        };
      case "percentage":
        return {
          operator: undefined,
          previousValue: undefined,
          currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        };
      case "operator":
        return {
          operator: value,
          previousValue: state.currentValue,
          currentValue: "0",
        };
      case "equal":
        return handleEqual();
      default:
        return state;
    }
  };

  const handleTap = (type: string, value?: string) => {
    const result = calculator(type, value);
    setState({
      currentValue: result.currentValue || state.currentValue,
      operator: result?.operator || state.operator,
      previousValue: result?.previousValue || state.previousValue,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{state.currentValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.grayButton}
            onPress={() => handleTap("clear")}
          >
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.grayButton}
            onPress={() => handleTap("posneg")}
          >
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.grayButton}
            onPress={() => handleTap("percentage")}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => handleTap("operator", "/")}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => handleTap("operator", "*")}
          >
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => handleTap("operator", "-")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => handleTap("operator", "+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", "0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTap("number", ".")}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => handleTap("equal", "=")}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    alignItems: "center",
    justifyContent: "center",
  },
  displayContainer: {
    flex: 2,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  displayText: {
    fontSize: 40,
    color: "#333",
  },
  buttonContainer: {
    flex: 3,
    padding: 32,
    width: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  grayButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#8a8a8a",
  },
  orangeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#d37800",
  },
  button: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#ebebeb",
  },
});

export default App;
