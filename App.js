import { NativeBaseProvider, Box } from "native-base";
import { AppStateProvider } from "./src/utils/context";
import RootNavigator from "./src/navigators/RootNavigator";
import theme from "./src/utils/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AppStateProvider>
        <RootNavigator />
      </AppStateProvider>
    </NativeBaseProvider>
  );
}
