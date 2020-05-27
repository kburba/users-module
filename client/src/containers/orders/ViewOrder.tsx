import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { RootState } from '../../store/reducers';
import columns from '../../components/table/columns';
import Table from '../../components/table/Table';
import { Container } from '@material-ui/core';
import { getOrderById } from '../../store/actions/orderActions';
import { GetOrderById } from '../../store/types/orderTypes';
import { Dispatch } from 'redux';

function formatCurrency(value) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  return '';
}

function ViewOrder({ orders, match, orderById, getOrderById }: ViewOrderProps) {
  const orderId = match.params.id;

  useEffect(() => {
    if (orderById?._id !== orderId) {
      getOrderById(orderId);
    }
  }, [getOrderById, orderId, orderById]);

  const order = orderById;

  const flatServices = order
    ? order.services.map((x) => ({
        ...x,
        type: x.service.type,
        from: x.service.from,
        to: x.service.to,
        price: x.service.price,
      }))
    : [];
  return (
    <Container>
      <Link to="/orders">Back to orders</Link>
      <div>
        {order && (
          <h2>
            {order.details.orderId}: {order.details.name}
          </h2>
        )}
        <h3>Order details</h3>
        <div>
          {order && (
            <div>
              <div>Created: {moment(order.createdAt).format('LLLL')}</div>
            </div>
          )}
        </div>
        <h3>Client</h3>
        <div>
          {order && order.client && (
            <Link to={`/clients/${order.client._id}`}>{order.client.name}</Link>
          )}
        </div>
        <h3>Order services</h3>
        {order && (
          <Table
            data={flatServices}
            columns={[
              columns.type,
              columns.from,
              columns.to,
              columns.pagesQty,
              columns.price,
              columns.totalPrice,
            ]}
            uniqueKey="_id"
            // actions={servicesTableActions}
          />
        )}
        {order?.total && <h2>Total: {formatCurrency(order.total)}</h2>}
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<GetOrderById>) => ({
  getOrderById: (id: string) => dispatch(getOrderById(id)),
});

const mapStateToProps = ({ ordersReducer }: RootState) => ({
  orders: ordersReducer.orders,
  orderById: ordersReducer.orderById,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);

type MatchParams = { id: string };
type ViewOrderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<MatchParams>;
