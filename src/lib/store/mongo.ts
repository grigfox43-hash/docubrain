import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri);
      clientPromise = client.connect();
    }
  }

  try {
    return await clientPromise;
  } catch (err) {
    console.error("[MongoDB connection error]:", err);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const c = await getMongoClient();
  if (!c) return null;
  return c.db("docubrain");
}
