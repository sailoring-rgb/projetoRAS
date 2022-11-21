

class ReducerActions {
    setBetsList = (state, action) => {
        return { ...state, betsList: action.value };
    };
}

const reducers = new Map(Object.entries(new ReducerActions()));

export default reducers;