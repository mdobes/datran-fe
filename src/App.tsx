import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main.tsx";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {

  return (
      <MantineProvider
          theme={{
              fontFamily: '"Manrope", sans-serif'
          }}
      >
        <BrowserRouter>
            <Routes>
                <Route index element={<Main />}/>
            </Routes>
        </BrowserRouter>
      </MantineProvider>
  )
}

export default App;
