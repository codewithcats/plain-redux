({
    babel: true
})

const {createStore} = require('redux')

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RESPONSE':
            return {
                responses: [...state.responses, action.payload.response]
            }
        default: return state
    }
}

const initialState = {
    responses: []
}

const store = createStore(reducer, initialState)

store.subscribe(function() {
    console.log(store.getState())
})

store.dispatch({
    type: 'ADD_RESPONSE',
    payload: {
        response: {
            id: '001'
        }
    }
})
