import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { getOrdersAction } from '../../store/actions/orderActions';
import { Switch } from 'react-router-dom';

import { OrderActions } from '../../store/types/orderTypes';
import Spinner from '../common/Spinner';
import OrdersTable from './OrdersTable';
import { Container } from '@material-ui/core';
import PrivateRoute from '../common/PrivateRoute';
import ViewOrder from './ViewOrder';
import NewOrderForm from './NewOrderForm';
import { RootState } from '../../store/reducers';
import ErrorMessage from '../common/ErrorMessage';
import { OrdersState } from '../../store/reducers/ordersReducer';

function OrdersContainer({ getOrders, isLoading, orders, error }: OrdersProps) {
    useEffect(() => {
        if (orders.length < 1) {
            getOrders();
        }
    }, [getOrders, orders.length]);

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
            <Switch>
                <PrivateRoute exact path="/orders" component={OrdersTable} />
                <PrivateRoute path="/orders/new" component={NewOrderForm} />
                <PrivateRoute path="/orders/:id" component={ViewOrder} />
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

type OrdersProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
