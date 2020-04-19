import { VariousState } from '../reducers/variousReducer';
import { SET_LOADING_CELL } from './types';
import { VariousActions } from '../types/variousTypes';

export function setLoadingCell(cell: VariousState['isLoadingCell']): VariousActions {
    return {
        type: SET_LOADING_CELL,
        payload: cell,
    };
}
