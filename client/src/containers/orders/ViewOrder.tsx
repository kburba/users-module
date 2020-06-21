import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { serviceColumns, ValueTypes } from '../../components/table/columns';
import Table from '../../components/table/Table';
import { Container } from '@material-ui/core';
import {
  getOrderById,
  deleteOrderAction,
} from '../../store/actions/orderActions';
import { OrderActions } from '../../store/types/orderTypes';
import { Dispatch } from 'redux';
import { formatValue } from '../../utils/utils';
import { OrdersState } from '../../store/reducers/ordersReducer';

function formatCurrency(value) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  return '';
}

function ViewOrder({
  match,
  orderById,
  getOrderById,
  deleteOrder,
}: ViewOrderProps) {
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
      <Link to="/orders">{'< Orders'}</Link>
      <div>
        {order && <h1>{order.details.name}</h1>}
        <div className="section">
          <h2>Details</h2>
        </div>
        <h3>Details</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {order && (
            <div>
              <div>
                Created: {formatValue(order.createdAt, ValueTypes.timestamp)}
              </div>
              <div>Status: {order.status}</div>
              <div>
                Client:
                <Link to={`/clients/${order.client._id}`}>
                  {order.client.name}
                </Link>
              </div>
            </div>
          )}
          {order && (
            <div>
              <button type="button">Create invoice</button>
              <button type="button" onClick={() => deleteOrder(order._id)}>
                Delete Order
              </button>
            </div>
          )}
        </div>
        <h3>Services</h3>
        {order && (
          <Table
            data={flatServices}
            columns={[
              serviceColumns.type,
              serviceColumns.from,
              serviceColumns.to,
              serviceColumns.pagesQty,
              serviceColumns.price,
              serviceColumns.totalPrice,
            ]}
            uniqueKey="_id"
            // actions={servicesTableActions}
          />
        )}
        <h3>Vendors</h3>
        <h3>Vocabulary</h3>
        <h3>Attachments</h3>
        <h3>Comments</h3>
        <div>{order?.comments && order.comments}</div>
        {order?.total && <h2>Total: {formatCurrency(order.total)}</h2>}
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<OrderActions>) => ({
  getOrderById: (id: string) => dispatch(getOrderById(id)),
  deleteOrder: (id: string) => dispatch(deleteOrderAction(id)),
});

const mapStateToProps = ({
  ordersReducer,
}: {
  ordersReducer: OrdersState;
}) => ({
  orderById: ordersReducer.orderById,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);

type MatchParams = { id: string };
type ViewOrderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<MatchParams>;
