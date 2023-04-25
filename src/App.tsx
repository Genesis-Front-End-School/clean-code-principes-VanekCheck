import { Container } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import QueryClientProvider from "./configs/QueryClientProvider";

const App: FC = () => (
  <QueryClientProvider>
    <Container color={"gray.1"} size={"lg"}>
      <Navbar />
      <Outlet />
    </Container>
    <ToastContainer limit={3} pauseOnFocusLoss={false} closeOnClick />
  </QueryClientProvider>
);

export default App;
