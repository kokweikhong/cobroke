export function randomDecimalNumberString(
  min: number,
  max: number,
  decimalPlaces: number
) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

export function randomIntegerString(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function randomValueFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockListings(userId: string, total: number) {
  const listings = [];
  for (let i = 0; i < total; i++) {
    listings.push({
      userId: userId,
      projectName: "Project " + randomIntegerString(1, 100),
      listingType: randomValueFromArray(["wts", "wtb", "wtl", "wtr"]),
      listingCategory: "public",
      propertyType: randomValueFromArray([
        "residential",
        "commercial",
        "industrial",
        "land",
      ]),
      propertyStatus: "new",
      landArea: randomDecimalNumberString(100, 1000, 2),
      builtUpArea: randomDecimalNumberString(100, 1000, 2),
      price: randomDecimalNumberString(100000, 1000000, 2),
      currentRental: randomDecimalNumberString(1000, 10000, 2),
      tenure: "freehold",
      description: "Test Description",
    });
  }
  return listings;
}
