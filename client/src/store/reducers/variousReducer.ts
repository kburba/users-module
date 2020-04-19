import { SET_LOADING_CELL } from '../actions/types';

const initialState: VariousState = {
    isLoadingCell: {
        column: '',
        row: '',
    },
};

export default (state = initialState, action): VariousState => {
    switch (action.type) {
        case SET_LOADING_CELL:
            return {
                ...state,
                isLoadingCell: action.payload,
            };
        default:
            return state;
    }
};

export type VariousState = {
    isLoadingCell: {
        column: string;
        row: string;
    };
};
