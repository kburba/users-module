import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { getOrdersAction } from '../../store/actions/orderActions';

import { OrderActions } from '../../store/types/orderTypes';
import Spinner from '../../components/common/Spinner';
import OrdersTable from './OrdersTable';
import PrivateRoute from '../../components/common/PrivateRoute';
// import ViewOrder from './ViewOrder';
// import NewOrderForm from './NewOrderForm';
import { RootState } from '../../store/reducers';
import ErrorMessage from '../../components/common/ErrorMessage';
import { OrdersState } from '../../store/reducers/ordersReducer';

function OrdersContainer({ getOrders, isLoading, error }: ReduxProps) {
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <div className="titleContainer">
        <h1>Orders</h1>
      </div>
      {error && <ErrorMessage error={error} />}
      <div>TODO: by month, by client, monthly client orders</div>
      <Switch>
        <PrivateRoute path="/orders" component={OrdersTable} />
        {/* <PrivateRoute path="/orders/new" component={NewOrderForm} /> */}
        {/* <PrivateRoute exact path="/orders/:id" component={ViewOrder} /> */}
      </Switch>
    </Container>
  );
}

type MapStateToProps = {
  isLoading: OrdersState['isLoading'];
  orders: OrdersState['orders'];
  error: OrdersState['error'];
};

const mapStateToProps = ({ ordersReducer }: RootState): MapStateToProps => ({
  isLoading: ordersReducer.isLoading,
  orders: ordersReducer.orders,
  error: ordersReducer.error,
});

const mapDispatchToProps = (dispatch: Dispatch<OrderActions>) => ({
  getOrders: () => dispatch(getOrdersAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
