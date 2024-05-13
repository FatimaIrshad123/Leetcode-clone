'use client'
import {atom} from 'recoil';

type AuthModelState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassword'
};

const initialAuthModalState: AuthModelState = {
    isOpen: false,
    type: 'login'
}

export const authModelState = atom<AuthModelState>({
    key: 'authModelState',
    default: initialAuthModalState
})