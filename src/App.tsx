import { Container } from "@mantine/core";

import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import MantineProvider from "./configs/MantineProvider";
import QueryClientProvider from "./configs/QueryClientProvider";

const App: FC = () => {
  return (
    <QueryClientProvider>
      <MantineProvider>
        <Container p={10} color={"gray.1"} size={"lg"}>
          <Navbar />
          <Outlet />
        </Container>
        <ToastContainer limit={3} pauseOnFocusLoss={false} closeOnClick />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
