const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

//creating reducers
const cakeOrdered = 'cakeOrdered'
const cakeRestock = 'cakeRestock'

const icecreamOrdered = 'icecreamOrdered'
const icecreamRestock = 'icecreamRestock'

//action creator is a function that returns an object
//define action creator (e)
function orderCake() {
    //action is an object with a type property
    //define action (d)
    return{
        type: cakeOrdered,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return{
        type: cakeRestock,
        payload: qty,
    }
}

function orderIcecream(qty = 1) {
    return{
        type: icecreamOrdered,
        payload: qty,
    }
}

function restockIcecream(qty = 1) {
    return{
        type: icecreamRestock,
        payload: qty,
    }
}

// declare your initial state (b)
// const initialState = {
//     numOfCakes: 10,
//      if you want anothe property like
//      queueLine: 23,
//     numOfIcecreams: 21,
// }
//instead of having one big function we break it up into seperate ones
const initialCakeState = {
    numOfCakes: 10,
}

const initialIcecreamState = {
    numOfIcecreams: 21,
}


// (previousState, action) => newState
//declare your reducer (c)
const cakeReducer = (state= initialCakeState, action) => {
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
        case cakeRestock:
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const icecreamReducer = (state= initialIcecreamState, action) => {
    switch(action.type){
        case icecreamOrdered:
            return{
                //create copy of the state object
                //there4 only taking action to one object
                //then queueLine will remain uneffected
                //we use the spread operator to copy the state
                //...state, 
                numOfIcecreams: state.numOfIcecreams - 1,
            }
        case icecreamRestock:
            return{
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload,
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
//var i;
//for(i = 0; i<4; i++){
    //update your store(g)
//    store.dispatch(orderCake())  
//}
//store.dispatch(restockCake(3))

//Instead we could use bindActionCreators to rewrite the above code as
const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
var i;
for(i = 0; i<4; i++){
    //update your store(g)
    actions.orderCake()
    actions.orderIcecream()
}
actions.restockCake(3)
actions.restockIcecream(2)

//handles unregistering via a function returned by subscribe() (5)
//finally unsubscribe (h)
unsubscribe()