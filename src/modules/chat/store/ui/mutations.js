export const changeMode = (state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light'
    state.mainBg = state.mode === 'light' ? '#f5f7fb' : '#4E426D'
    state.contentBg = state.mode === 'light' ? '#fff' : '#8776b0'
    state.selfMessage = state.mode === 'light' ? '#4E426D' : '#eec4ab'
    state.userMessage = state.mode === 'light' ? '#f5f7fb' : '#4E426D'
}