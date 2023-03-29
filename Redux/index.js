const redux = require('redux')
const createStore = redux.createStore

//creating reducers
const cakeOrdered = 'cakeOrdered'

//action creator is a function that returns an object
//define action creator (e)
function orderCake() {
    //action is an object with a type property
    //define action (d)
    return{
        type: cakeOrdered,
        quantity: 1,
    }
}

//declare your initial state (b)
const initialState = {
    numOfCakes: 10,
    //if you want anothe property like
    //queueLine: 23,
}


// (previousState, action) => newState
//declare your reducer (c)
const reducer = (state= initialState, action) => {
    switch(action.type){
        case cakeOrdered:
            return{
                //create copy of the state object
                //there4 only taking action to one object
                //then queueLine will remain uneffected
                //we use the spread operator to copy the state
                //...state, 
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}


//All responsibilities of redux store

//create a state (1)(a)
const store =  createStore(reducer)
//allow access to state via getState() (2)
console.log('Initial state', store.getState())

//registers listenbers via subscribe() (4)
//subscribe to the store (f)
const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))

//update the state (3)
var i;
for(i = 0; i<4; i++){
    //update your store(g)
    store.dispatch(orderCake())
}

//handles unregistering via a function returned by subscribe() (5)
//finally unsubscribe (h)
unsubscribe()