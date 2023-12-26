// vite.config.ts
import react from "file:///C:/Users/xiaom/Documents/ISDI%20Coders/Week/Week08/Ana-Lambea-Final-Project-Front-202307-bcn/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/xiaom/Documents/ISDI%20Coders/Week/Week08/Ana-Lambea-Final-Project-Front-202307-bcn/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["./src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text"],
      all: true,
      include: ["**/src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/types.ts",
        "**/*.d.ts",
        "**/src/main.tsx",
        "**/src/setupTests.ts"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx4aWFvbVxcXFxEb2N1bWVudHNcXFxcSVNESSBDb2RlcnNcXFxcV2Vla1xcXFxXZWVrMDhcXFxcQW5hLUxhbWJlYS1GaW5hbC1Qcm9qZWN0LUZyb250LTIwMjMwNy1iY25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHhpYW9tXFxcXERvY3VtZW50c1xcXFxJU0RJIENvZGVyc1xcXFxXZWVrXFxcXFdlZWswOFxcXFxBbmEtTGFtYmVhLUZpbmFsLVByb2plY3QtRnJvbnQtMjAyMzA3LWJjblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveGlhb20vRG9jdW1lbnRzL0lTREklMjBDb2RlcnMvV2Vlay9XZWVrMDgvQW5hLUxhbWJlYS1GaW5hbC1Qcm9qZWN0LUZyb250LTIwMjMwNy1iY24vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIHNldHVwRmlsZXM6IFwiLi9zcmMvc2V0dXBUZXN0cy50c1wiLFxuICAgIGluY2x1ZGU6IFtcIi4vc3JjLyoqLyoudGVzdC57dHMsdHN4fVwiXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6IFwidjhcIixcbiAgICAgIHJlcG9ydGVyOiBbXCJsY292XCIsIFwidGV4dFwiXSxcbiAgICAgIGFsbDogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFtcIioqL3NyYy8qKi8qLnt0cyx0c3h9XCJdLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICBcIioqLyoudGVzdC57dHMsdHN4fVwiLFxuICAgICAgICBcIioqL3R5cGVzLnRzXCIsXG4gICAgICAgIFwiKiovKi5kLnRzXCIsXG4gICAgICAgIFwiKiovc3JjL21haW4udHN4XCIsXG4gICAgICAgIFwiKiovc3JjL3NldHVwVGVzdHMudHNcIixcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUc3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLDBCQUEwQjtBQUFBLElBQ3BDLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLE1BQU07QUFBQSxNQUN6QixLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsc0JBQXNCO0FBQUEsTUFDaEMsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
