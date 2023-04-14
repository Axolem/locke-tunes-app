import theme from "./src/utils/theme";
import { NativeBaseProvider } from "native-base";
import { AppStateProvider } from "./src/utils/context";
import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AppStateProvider>
        <RootNavigator />
      </AppStateProvider>
    </NativeBaseProvider>
  );
}
