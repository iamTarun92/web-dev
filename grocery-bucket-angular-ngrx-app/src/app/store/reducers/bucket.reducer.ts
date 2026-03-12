import { createReducer, on } from '@ngrx/store';
import { addToBucket, removeFromBucket } from '../actions/bucket.action';
import { Bucket } from '../../../models/bucket.model';

export const initialState: Bucket[] = [];

export const bucketReducer = createReducer(
  initialState,
  on(addToBucket, (state, { payload }) => {
    const existingItem = state.find((item) => item.id === payload.id);

    if (existingItem) {
      return state.map((item) =>
        item.id === payload.id
          ? { ...item, quantity: item.quantity + payload.quantity }
          : item,
      );
    }

    return [...state, { ...payload, quantity: 1 }];
  }),

  on(removeFromBucket, (state, { payload }) => {
    const existingItem = state.find((item) => item.id === payload.id);
    if (!existingItem) return state;

    if (existingItem.quantity > 1) {
      return state.map((item) =>
        item.id === payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    }

    return state.filter((item) => item.id !== payload.id);
  }),
);
