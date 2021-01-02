import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { getOrdersAction } from '../../store/actions/orderActions';

import { OrderActions } from '../../store/types/orderTypes';
import OrdersTable from './OrdersTable';
import { RootState } from '../../store/reducers';
import ErrorMessage from '../../components/common/ErrorMessage';
import { OrdersState } from '../../store/reducers/ordersReducer';
import moment from 'moment';
import DatePicker from '../../components/common/DatePicker';
import { Moment } from 'moment';

function OrdersContainer({ getOrders, error }: ReduxProps) {
  useEffect(() => {
    const from = moment().startOf('month').format('L');
    const to = moment().format('L');
    getOrders(from, to);
  }, [getOrders]);

  function handleDateChange(startDate: Moment | null, endDate: Moment | null) {
    if (startDate && endDate) {
      const start = moment(startDate).format('L');
      const end = moment(endDate).format('L');
      getOrders(start, end);
    }
  }

  return (
    <Container>
      <div className="titleContainer">
        <h1>Orders</h1>
      </div>
      {error && <ErrorMessage error={error} />}
      <div>TODO: by month, by client, monthly client orders</div>
      <DatePicker onDateChange={handleDateChange} />
      <OrdersTable />
    </Container>
  );
}

type MapStateToProps = {
  orders: OrdersState['orders'];
  error: OrdersState['error'];
};

const mapStateToProps = ({ ordersReducer }: RootState): MapStateToProps => ({
  orders: ordersReducer.orders,
  error: ordersReducer.error,
});

const mapDispatchToProps = (dispatch: Dispatch<OrderActions>) => ({
  getOrders: (from: string, to: string) => dispatch(getOrdersAction(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
