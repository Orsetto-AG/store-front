import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import type { Product, Bid } from '@/types';

interface AuctionsState {
  active: Product[];
  completed: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: AuctionsState = {
  active: [],
  completed: [],
  loading: false,
  error: null,
};

export const placeBid = createAsyncThunk(
  'auctions/placeBid',
  async ({ auctionId, amount }: { auctionId: string; amount: number }) => {
    return await apiService.placeBid(auctionId, amount);
  }
);

const auctionsSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    setActiveAuctions: (state, action) => {
      state.active = action.payload;
    },
    setCompletedAuctions: (state, action) => {
      state.completed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeBid.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to place bid';
      });
  },
});

export const { setActiveAuctions, setCompletedAuctions } = auctionsSlice.actions;
export default auctionsSlice.reducer;