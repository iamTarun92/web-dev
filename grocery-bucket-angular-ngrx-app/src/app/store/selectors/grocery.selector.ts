import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

export const getAllGrocery = createFeatureSelector<Grocery[]>('grocery');

export const getGroceryByType = (type: string) =>
  createSelector(getAllGrocery, (state: Grocery[]) =>
    state.filter((item) => item.type === type),
  );


