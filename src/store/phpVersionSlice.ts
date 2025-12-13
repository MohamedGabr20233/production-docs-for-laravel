import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PhpVersion = "8.3" | "8.2";

export interface PhpVersionState {
  currentVersion: PhpVersion;
  availableVersions: PhpVersion[];
}

const initialState: PhpVersionState = {
  currentVersion: "8.3",
  availableVersions: ["8.3", "8.2"],
};

export const phpVersionSlice = createSlice({
  name: "phpVersion",
  initialState,
  reducers: {
    setPhpVersion: (state, action: PayloadAction<PhpVersion>) => {
      state.currentVersion = action.payload;
    },
  },
});

export const { setPhpVersion } = phpVersionSlice.actions;

// Selectors
export const selectPhpVersion = (state: { phpVersion: PhpVersionState }) =>
  state.phpVersion.currentVersion;
export const selectAvailableVersions = (state: { phpVersion: PhpVersionState }) =>
  state.phpVersion.availableVersions;

export default phpVersionSlice.reducer;
