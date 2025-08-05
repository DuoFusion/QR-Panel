import { Provider } from "react-redux";
import Store from "./store/store";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routers";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@ant-design/v5-patch-for-react-19";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <RouterProvider router={Router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
