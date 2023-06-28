import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://cristinarangoe:rd68t8nc2jd2@cluster0.5xdicku.mongodb.net/library-app?retryWrites=true&w=majority"
  );

  return client;
}
