import { startServer } from "./presentation/server";

const main = async () => {
  try {
    await startServer();
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

main();
