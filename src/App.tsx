import { Provider } from "react-redux";
import Store from "./store/store";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routers";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
