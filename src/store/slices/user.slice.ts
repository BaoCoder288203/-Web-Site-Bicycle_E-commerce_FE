import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Address {
    addressId: string;
    fullAddress: string;
    street: string,
    district: string;
    city: string;
    ward: string;
    country: string;
    userId: string;
}
interface User {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: Address;
    avatar: string;
    gender: string
}
export interface InitUserType {
    me: Partial<User>;
}

const initUser: InitUserType = {
    me: {
        userId: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        avatar: '',
        gender: '',
        address: {
            fullAddress: '',
            userId: '',
            addressId: '',
            district: '',
            street: '',
            city: '',
            ward: '',
            country: ''
        },
    },
};


export const useUser = createSlice({
    name: 'userSlice',
    initialState: initUser,
    reducers: {
        setMe: (state: InitUserType, { payload }: PayloadAction<any>) => {
            state.me = payload || initUser.me;
        },
        setAddress: (state: InitUserType, { payload }: PayloadAction<Address>) => {
            state.me.address = payload;
        },
        setAvatar: (state: InitUserType, { payload }: PayloadAction<string>) => {
            console.log("check avatar update: ", payload);
            state.me.avatar = payload;
        },
    },
});
export const {
    setMe,
    setAddress,
    setAvatar
} = useUser.actions;

export default useUser.reducer;