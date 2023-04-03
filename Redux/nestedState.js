const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Vikk',
    address: {
        street: '2123 Main St',
        city: 'Boiston',
        state: 'MA',
    },
    age: 34,
}

const streetUpdated = 'streetUpdated'
const updateStreet = (street) => {
    return {
        type: streetUpdated,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case streetUpdated:
            // return{
            //     //So keeping track that we updating the correct object we use a library called immer 
            //     //keep name the same 
            //     ...state,
            //     address: {
            //         //keep other values the same
            //         ...state.address,
            //         //update street
            //         street: action.payload,
            //     },
            // }
        //SO immer takes the below return function and under the hood turns it into something like above 
        return produce(state, (draft) => {
            draft.address.street = action.payload
        })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() =>{
    console.log('Updated State', store.getState())
})
store.dispatch(updateStreet('2345 Main Str'))
unsubscribe()