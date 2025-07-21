import { Address } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface AddressBookState {
  addresses: Address[];
}

// Define the initial state using that type
const initialState: AddressBookState = {
  addresses: [],
};

export const addressBookSlice = createSlice({
  name: "addressBook",  // Changed to match conventional naming
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      // Prevent duplicate addresses by checking if address with same id exists
      const addressExists = state.addresses.some(
        (address) => address.id === action.payload.id
      );
      
      if (!addressExists) {
        state.addresses.push(action.payload);
      }
      
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      // Filter out the address with matching id
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    // Bonus: Add a clearAll action if needed
    clearAllAddresses: (state) => {
      state.addresses = [];
    }
  },
});

export const { 
  addAddress, 
  removeAddress, 
  updateAddresses,
  clearAllAddresses 
} = addressBookSlice.actions;

// Selectors
export const selectAddresses = (state: RootState) => state.addressBook.addresses;

// Selector to find a specific address by id
export const selectAddressById = (id: string) => (state: RootState) => 
  state.addressBook.addresses.find(address => address.id === id);

export default addressBookSlice.reducer;