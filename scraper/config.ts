if (!process.env.LEGISCAN_API_KEY) {
  console.error("Need to provide LEGISCAN_API_KEY as environment var");
  process.exit(1);
}
export const LEGISCAN_API_KEY = process.env.LEGISCAN_API_KEY;
