const initialState = {
    images: [],
};

export default function carouselReducer(state= initialState, action) {
    switch (action.type) {
        case 'FETCH_CAROUSEL_DATA':
            return Object.assign({}, state, {
                images: action.data,
            });
        default: 
            return state;
    }   
}