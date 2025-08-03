import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = Number(env.VITE_PORT);

  // https://vite.dev/config/
  return {
    plugins: [react()],
    server: {
      port: PORT,
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_BASE_URL,
      //     changeOrigin: true,
      //   },
      // },
    },
  };
});
