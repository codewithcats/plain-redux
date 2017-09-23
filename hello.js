({
    babel: true
})

const {createStore} = require('redux')

const reducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return {
        count: state.count + 1
      }
    default:
      return state
  }
  return state
}

const initialState = {
  count: 0
}

const store = createStore(reducer, initialState)

store.subscribe(function() {
  console.log(store.getState())
})

store.dispatch({
  type: 'INC',
})
