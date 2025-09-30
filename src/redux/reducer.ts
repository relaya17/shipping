const initialState = {
  quote: '',
};

interface CartAction {
  type: string;
  payload?: unknown;
}

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case 'SET_QUOTE':
      return {
        ...state,
        quote: action.payload,
      };
    default:
      return state;
  }
};
