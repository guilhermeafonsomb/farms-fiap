import { clsx } from "clsx";
import React from "react";

import { Text, TouchableOpacity, View } from "react-native";
import { useHomeFilterStore } from "../store/homeFilter";

export enum FilterOptions {
  WEEKLY = "Semanal",
  MONTHLY = "Mensal",
  YEARLY = "Anual",
}

const HomeFilter = () => {
  const { selectFilterOption, setSelectFilterOption } = useHomeFilterStore();

  return (
    <View className="rounded-lg bg-primary-100 flex flex-row h-14 items-center justify-evenly px-3">
      <TouchableOpacity
        onPress={() => setSelectFilterOption("WEEKLY")}
        className={clsx(
          "text-center py-2 px-4 sm:px-9 rounded-lg ",
          selectFilterOption === "WEEKLY" && "bg-white"
        )}
      >
        <Text
          className={clsx(
            selectFilterOption === "WEEKLY" ? "text-black" : "text-primary-500"
          )}
        >
          {FilterOptions.WEEKLY}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectFilterOption("MONTHLY")}
        className={clsx(
          "text-center py-2 px-4 sm:px-10 rounded-lg ",
          selectFilterOption === "MONTHLY" && "bg-white"
        )}
      >
        <Text
          className={clsx(
            selectFilterOption === "MONTHLY" ? "text-black" : "text-primary-500"
          )}
        >
          {FilterOptions.MONTHLY}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectFilterOption("YEARLY")}
        className={clsx(
          "text-center py-2 px-4 sm:px-10 rounded-lg ",
          selectFilterOption === "YEARLY" && "bg-white"
        )}
      >
        <Text
          className={clsx(
            selectFilterOption === "YEARLY" ? "text-black" : "text-primary-500"
          )}
        >
          {FilterOptions.YEARLY}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeFilter;
