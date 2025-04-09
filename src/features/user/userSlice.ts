// interface Position {
//   latitude: number;
//   longitude: number;
// }

import { createSlice } from "@reduxjs/toolkit";

// interface Address {
//   locality?: string;
//   city?: string;
//   postcode?: string;
//   countryName?: string;
// }

// function getPosition(): Promise<GeolocationPosition> {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function getAddress(position: Position): Promise<Address> {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.latitude}&longitude=${position.longitude}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch address");

//   return res.json();
// }

// async function fetchAddress(): Promise<{ position: Position; address: string }> {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position: Position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality || ''}, ${addressObj?.city || ''} ${addressObj?.postcode || ''}, ${addressObj?.countryName || ''}`.trim();

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer