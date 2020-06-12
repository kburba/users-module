import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClientsAction } from '../store/actions/clientActions';
import { RootState } from '../store/reducers';
import { getOrdersAction } from '../store/actions/orderActions';
import { getServicesAction } from '../store/actions/serviceActions';
import { getLanguagesAction } from '../store/actions/languageActions';
import { OrderActions } from '../store/types/orderTypes';
import { ServiceActions } from '../store/types/serviceTypes';
import { ClientsActions, ClientsState } from '../store/types/clientTypes';
import { LanguageActions } from '../store/types/languageTypes';
import { OrdersState } from '../store/reducers/ordersReducer';
import { ServicesState } from '../store/reducers/servicesReducer';
import { LanguagesState } from '../store/reducers/languagesReducer';
import { Container } from '@material-ui/core';

function Dashboard({
  getClients,
  getServices,
  getLanguages,
  getOrders,
  orders,
  languages,
  services,
  clients,
}: ReduxProps) {
  useEffect(() => {
    getClients();
    getServices();
    getOrders();
    getLanguages();
  }, [getClients, getServices, getOrders, getLanguages]);

  return (
    <Container className="container">
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Orders</h3>
          <div>Total orders: {orders.length}</div>
          <Link to="/orders">
            <button className="btn">Go to Orders</button>
          </Link>
        </div>
        <div>
          <h3>Clients</h3>
          <div>Total clients: {clients.length}</div>
          <Link to="/clients">
            <button className="btn">Go to Clients</button>
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Services</h3>

          <div>Total services: {services.length}</div>
          <Link to="/services">
            <button className="btn">Go to Services</button>
          </Link>
        </div>
        <div>
          <h3>Languages</h3>
          <div>Total languages: {languages.length}</div>
          <Link to="/languages">
            <button className="btn">Go to Languages</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

type ReduxStateProps = {
  orders: OrdersState['orders'];
  clients: ClientsState['clients'];
  services: ServicesState['services'];
  languages: LanguagesState['languages'];
};

const mapStateToProps = ({
  ordersReducer,
  clientsReducer,
  servicesReducer,
  languagesReducer,
}: RootState): ReduxStateProps => ({
  orders: ordersReducer.orders,
  clients: clientsReducer.clients,
  services: servicesReducer.services,
  languages: languagesReducer.languages,
});

const mapDispatchToProps = (
  dispatch: Dispatch<
    ClientsActions | OrderActions | ServiceActions | LanguageActions
  >
) => ({
  getClients: () => dispatch(getClientsAction()),
  getOrders: () => dispatch(getOrdersAction()),
  getServices: () => dispatch(getServicesAction()),
  getLanguages: () => dispatch(getLanguagesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
