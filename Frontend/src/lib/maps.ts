
export async function searchPlaces(query: string): Promise<google.maps.places.PlaceResult[]> {
  if (!window.google?.maps) {
    throw new Error('Google Maps not loaded');
  }

  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  return new Promise((resolve, reject) => {
    service.textSearch(
      { query },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      }
    );
  });
}