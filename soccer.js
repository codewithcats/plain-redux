({
    babel: true
})

const {createStore, applyMiddleware} = require('redux')
const createSagaMiddleware = require('redux-saga').default
const {take, call, put} = require('redux-saga/effects')
const axios = require('axios')

function fetchLeagues() {
  return axios({
    url: 'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues',
    headers: {
      'X-Mashape-Key': 'ZqAO9XW13qmshFt97YltTFOOGDjhp1dHh00jsnD8ztb0FcWmpG',
      'Accept': 'application/json'
    }
  })
  .then(response => response.data.data.leagues)
}

function* fetchLeaguesSaga() {
    while (true) {
        yield take('FETCH_LEAGUES')
        const leagues = yield call(fetchLeagues)
        yield put({
          type: 'LEAGUES',
          payload: {
            leagues
          }
        })
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
