import { server } from "./presentation/server";

const main = async () => {
  try {
    await server.start();
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

main();
