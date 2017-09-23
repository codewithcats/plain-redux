({
    babel: true
})

const {createStore, applyMiddleware} = require('redux')
const createSagaMiddleware = require('redux-saga').default
const {all, fork, take} = require('redux-saga/effects')
const axios = require('axios')

function* fetchLeaguesSaga() {
    while (true) {
        yield take('FETCH_LEAGUES')
        console.log('fetch leagues saga')
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LEAGUES':
            return {
                leagues: action.payload.leagues
            }
        default: return state
    }
}

const initialState = {
    leagues: []
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(fetchLeaguesSaga)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({
    type: 'FETCH_LEAGUES'
})
