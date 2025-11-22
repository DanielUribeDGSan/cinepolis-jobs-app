import { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  DataTable,
  Card,
  Title,
  Paragraph,
  Button,
  IconButton,
  FAB,
  Chip,
  Avatar,
  List,
  Divider,
  Surface,
} from "react-native-paper";

export default function TabOneScreen() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(0);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 1 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <Title style={{ fontSize: 24, marginBottom: 16, textAlign: "center" }}>
        React Native Paper Demo
      </Title>

      {/* Card con botones */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Title>Componentes Básicos</Title>
          <Paragraph>Demostración de botones y iconos</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Botón presionado")}
          >
            Contained
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log("Outlined presionado")}
          >
            Outlined
          </Button>
          <Button mode="text" onPress={() => console.log("Text presionado")}>
            Text
          </Button>
        </Card.Actions>
      </Card>

      {/* Iconos */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Title>Iconos</Title>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 8,
            }}
          >
            <IconButton
              icon="heart"
              size={20}
              onPress={() => console.log("Heart")}
            />
            <IconButton
              icon="star"
              size={20}
              onPress={() => console.log("Star")}
            />
            <IconButton
              icon="home"
              size={20}
              onPress={() => console.log("Home")}
            />
            <IconButton
              icon="account"
              size={20}
              onPress={() => console.log("Account")}
            />
            <IconButton
              icon="cog"
              size={20}
              onPress={() => console.log("Settings")}
            />
            <IconButton
              icon="email"
              size={20}
              onPress={() => console.log("Email")}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Chips */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Title>Chips</Title>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 8,
            }}
          >
            <Chip icon="check" onPress={() => console.log("Chip 1")}>
              Aprobado
            </Chip>
            <Chip icon="close" onPress={() => console.log("Chip 2")}>
              Rechazado
            </Chip>
            <Chip icon="clock" onPress={() => console.log("Chip 3")}>
              Pendiente
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Lista con avatares */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Title>Lista de Usuarios</Title>
        </Card.Content>
        <List.Item
          title="Juan Pérez"
          description="Desarrollador Senior"
          left={(props) => <Avatar.Text {...props} label="JP" />}
          right={(props) => <IconButton {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="María García"
          description="Diseñadora UX"
          left={(props) => <Avatar.Text {...props} label="MG" />}
          right={(props) => <IconButton {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Carlos López"
          description="Product Manager"
          left={(props) => <Avatar.Text {...props} label="CL" />}
          right={(props) => <IconButton {...props} icon="chevron-right" />}
        />
      </Card>

      {/* Surface */}
      <Surface style={{ padding: 16, marginBottom: 16, borderRadius: 8 }}>
        <Title>Surface Component</Title>
        <Paragraph>
          Este es un componente Surface que proporciona elevación y sombras.
        </Paragraph>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          <Button mode="contained-tonal" compact>
            Tonal
          </Button>
          <Button mode="elevated" compact>
            Elevated
          </Button>
        </View>
      </Surface>

      {/* FAB */}
      <View style={{ height: 100, marginBottom: 16 }}>
        <FAB
          icon="plus"
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => console.log("FAB presionado")}
        />
      </View>
    </ScrollView>
  );
}
