import { UserApi } from 'backend/UserApi';

const userApi = new UserApi();

export const useUserApi = () => {
    return userApi;
};
