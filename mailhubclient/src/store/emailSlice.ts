import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipients: [],
    subject: "",
    text: "",
    mailId: "",
    mailPassword: "",
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        // Define actions to update parts of the email state
        setRecipients(state, action) {
            state.recipients = action.payload;
        },
        setSubject(state, action) {
            state.subject = action.payload;
        },
        setText(state, action) {
            state.text = action.payload;
        },
        setMailId(state, action) {
            state.mailId = action.payload;
        },
        setMailPassword(state, action) {
            state.mailPassword = action.payload;
        },
    },
});


export const { setRecipients, setSubject, setText, setMailId, setMailPassword } = emailSlice.actions;
export default emailSlice.reducer;