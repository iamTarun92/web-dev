import { createAction, props } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';

export const addToBucket = createAction(
  '[Bucket] Add item',
  props<{ payload: Bucket }>(),
);

export const removeFromBucket = createAction(
  '[Bucket] Remove Item',
  props<{ payload: Partial<Bucket> }>(),
);
