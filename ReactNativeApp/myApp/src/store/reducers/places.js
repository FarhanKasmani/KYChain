import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          value: action.placeName,
          key: Math.random().toString(),
          image: {
            uri: action.image.uri
          },
          location: action.location
        }),
      };

    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((item, i) => item.key !== action.placeKey),
      };

    default:
      return state;
  }
};

export default reducer;
