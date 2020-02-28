const INITIAL_STATE = { selectedTab: "", tabsToShow: {} }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "TAB_SELECTED":
            return { ...state, selectedTab: action.payload }
        case "TAB_SHOWED":
            return { ...state, tabsToShow: action.payload }
        default: 
            return state
    }
}