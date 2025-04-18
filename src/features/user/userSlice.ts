import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
interface Position {
  latitude: number;
  longitude: number;
}

interface Address {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getAddress(position: Position): Promise<Address> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.latitude}&longitude=${position.longitude}`
  );
  if (!res.ok) throw new Error("Failed to fetch address");

  return res.json();
}

// if we using createAsyncThunk we must put 'fetch'
// if we using selectorFuncions we must put 'get'
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position: Position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address
    const addressObj = await getAddress(position);
    const address =
      `${addressObj?.locality || ""}, ${addressObj?.city || ""} ${addressObj?.postcode || ""}, ${addressObj?.countryName || ""}`.trim();

    // 3) Then we return an object with the data that we are interested in.
    // payload of fulfilled state
    return { position, address };
  }
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = 'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
