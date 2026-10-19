/**
 * MJ01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "MJ01",
  "fullName": "After Dark Cannabis Dispensary Weed Delivery",
  "street": "1664 Jane Street",
  "city": "York",
  "region": "ON",
  "postal": "M9N 2S1",
  "phoneDisplay": "(437) 524-9344",
  "phoneTel": "tel:+14375249344",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJha2UQegxK4gRAGK9yMNa6Fo",
  "placeId": "ChIJha2UQegxK4gRAGK9yMNa6Fo",
  "neighbourhood": "Jane Street / York",
  "intersection": "Jane Street just south of Lawrence Avenue West",
  "transit": "Accessible by local TTC routes around Jane Street and nearby York neighborhoods.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
