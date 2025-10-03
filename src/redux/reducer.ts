interface CartState { quote: string }
interface Action<TType extends string = string, TPayload = unknown> {
  type: TType;
  payload?: TPayload;
}

const initialState: CartState = {
  quote: '',
};

export const cartReducer = (state: CartState = initialState, action: Action): CartState => {
    switch (action.type) {
      case 'SET_QUOTE':
        return {
          ...state,
          quote: String(action.payload ?? ''),
        };
      default:
        return state;
    }
  };
  