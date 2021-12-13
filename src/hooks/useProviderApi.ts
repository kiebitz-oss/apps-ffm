import { ProviderApi } from 'backend/ProviderApi';

const providerApi = new ProviderApi();

export const useProviderApi = () => {
    return providerApi;
};
