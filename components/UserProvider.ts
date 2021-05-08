import {createContext} from 'react';

export type BasicUser = {
    id: string;
    lastName: string;
    sessionKey: string;
    firstName: string;
};

export const UserContext = createContext<BasicUser>(
    (null as unknown) as BasicUser,
);
