const initialState = {

};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item.id]: {
          productInfo: action.item,
          quantity: state[action.item.id]? state[action.item.id].quantity + 1 : 1,
        },
      };
    }
    case "REMOVE_ITEM": {
      const stateCopy = { ...state };
      delete stateCopy[`${action.item.id}`];
      return {
        ...stateCopy,
      };
    }
    default:
      return state;
  }
}

export const getStoreItemArray = (state) => Object.values(state);
