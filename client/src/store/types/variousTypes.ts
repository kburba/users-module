import { SET_LOADING_CELL } from '../actions/types';
import { VariousState } from '../reducers/variousReducer';

export type VariousActions = SetLoadingCell;

export interface SetLoadingCell {
  type: typeof SET_LOADING_CELL;
  payload: VariousState['isLoadingCell'];
}
