import { RootState } from '../reducers';

export const orderFromState = ({ ordersReducer }: RootState) =>
  ordersReducer.orders;
export const ordersCacheKeyFromState = ({ ordersReducer }: RootState) =>
  ordersReducer.ordersCacheKey;

export const getClientsIsLoadedFromState = ({ clientsReducer }: RootState) =>
  clientsReducer.isLoadedClients;
export const clientsFromState = ({ clientsReducer }: RootState) =>
  clientsReducer.clients;
export const getOrdersIsLoadedFromState = ({ ordersReducer }: RootState) =>
  ordersReducer.isLoadedOrders;
export const getOrdersFromState = ({ ordersReducer }: RootState) =>
  ordersReducer.orders;
export const getLanguagesIsLoadedFromState = ({
  languagesReducer,
}: RootState) => languagesReducer.isLoadedLanguages;
export const getLanguagesFromState = ({ languagesReducer }: RootState) =>
  languagesReducer.languages;
export const getServicesIsLoadedFromState = ({ servicesReducer }: RootState) =>
  servicesReducer.isLoadedServices;
export const getServicesFromState = ({ servicesReducer }: RootState) =>
  servicesReducer.services;
