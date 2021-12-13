import { MediatorApi } from 'backend/MediatorApi';

const mediatorApi = new MediatorApi();

export const useMediatorApi = () => {
    return mediatorApi;
};
