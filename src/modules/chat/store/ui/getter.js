export const getMainBg = (state) => {
    return state.mainBg
}

export const getContentBg = (state) => {
    return state.contentBg
}

export const getMode = (state) => {
    return state.mode
}

export const getMessagesBg = (state) => {
    return { self: state.selfMessage, user: state.userMessage }
}


