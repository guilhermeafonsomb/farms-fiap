import { StyleSheet, View } from "react-native";
import {
  Table as ContainerTable,
  Row,
  Rows,
} from "react-native-table-component";

interface TableProps {
  tableHead?: string[];
  tableRows?: (string | number | React.JSX.Element)[][];
}

export const Table = ({ tableHead, tableRows }: TableProps) => {
  return (
    <View className="pt-4">
      <ContainerTable borderStyle={styles.tableBorder}>
        {tableHead && (
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.headerText}
          />
        )}
        {tableRows && <Rows data={tableRows} textStyle={styles.rowText} />}
      </ContainerTable>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBorder: {
    borderWidth: 1,
    borderColor: "#D6E5D1",
    borderRadius: 8,
  },
  head: {
    height: 40,
  },
  headerText: {
    color: "#121C0D",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    marginLeft: 6,
  },
  rowText: {
    textAlign: "left",
    fontSize: 12,
    padding: 8,
    color: "#121C0D",
  },
});

export default Table;
