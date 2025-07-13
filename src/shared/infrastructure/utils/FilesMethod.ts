import * as fs from "fs";

export const LoadFromFile = async <T>(path: string): Promise<T[]> => {
  try {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf8");
      return JSON.parse(data);
    } else {
      await fs.promises.writeFile(path, "[]", "utf8");
      return [];
    }
  } catch (error) {
    console.error("Error loading file:", error);
    return [];
  }
};

export const SaveIntoFile = async <T>(path: string, items: T[]): Promise<void> => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(items, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving file:", error);
  }
};