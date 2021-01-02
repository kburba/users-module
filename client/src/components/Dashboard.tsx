import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
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
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from '@material-ui/core';
import { formatValue } from '../utils/utils';
import { ValueTypes } from './table/columns';
import moment from 'moment';

type Card = {
  title: string;
  description: number | string;
  link: string;
};

function Dashboard({
  clients,
  getClients,
  getLanguages,
  getOrders,
  getServices,
  languages,
  orders,
  services,
}: ReduxProps) {
  useEffect(() => {
    const from = moment().subtract(30, 'days').format('L');
    const to = moment().format('L');
    getClients();
    getServices();
    getOrders(from, to);
    getLanguages();
  }, [getClients, getServices, getOrders, getLanguages]);

  const CARDS: Card[] = [
    {
      title: 'Orders',
      description: `${orders.length}: ${formatValue(
        orders.reduce((prev, next) => prev + next.total, 0),
        ValueTypes.currency
      )}`,
      link: '/orders',
    },
    {
      title: 'Clients',
      description: clients.length,
      link: '/clients',
    },
    {
      title: 'Services',
      description: services.length,
      link: '/services',
    },
    {
      title: 'Languages',
      description: languages.length,
      link: '/languages',
    },
  ];

  return (
    <Container className="container">
      <h1>Dashboard</h1>
      <Grid container spacing={1}>
        {CARDS.map((item) => (
          <Grid item key={item.title} lg={12}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={RouterLink}
                  to={item.link}
                >
                  Go to {item.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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
  auth,
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
  getOrders: (from: string, to: string) => dispatch(getOrdersAction(from, to)),
  getServices: () => dispatch(getServicesAction()),
  getLanguages: () => dispatch(getLanguagesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
