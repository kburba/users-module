import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { RootState } from '../../store/reducers';
import columns from '../../components/table/columns';
import Table from '../../components/table/Table';

function formatCurrency(value) {
    if (typeof value === 'number') {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    } else {
        return '';
    }
}

function ViewOrder({ orders, match }: ViewOrderProps) {
    const orderById = orders.find((x) => x._id === match.params.id);
    return (
        <div>
            <Link to="/orders">Back to orders</Link>
            <div>
                {orderById && (
                    <h2>
                        {orderById.details.orderId}: {orderById.details.name}
                    </h2>
                )}
                <h3>Order details</h3>
                <div>
                    {orderById && (
                        <div>
                            <div>Created: {moment(orderById.createdAt).format('LLLL')}</div>
                        </div>
                    )}
                </div>
                <h3>Client</h3>
                <div>
                    {orderById && orderById.client && (
                        <Link to={`/clients/${orderById.client._id}`}>{orderById.client.name}</Link>
                    )}
                </div>
                <h3>Order services</h3>
                {/* {orderById && (
                    <Table
                        data={orderById.services}
                        columns={[
                            columns.type,
                            columns.from,
                            columns.to,
                            columns.pagesQty,
                            columns.price,
                            columns.totalPrice,
                        ]}
                        uniqueKey="_id"
                    />
                )} */}
                {orderById && (
                    <ul>
                        {orderById.services.map((orderService) => (
                            <li key={orderService._id}>
                                {`${orderService.service.type}: ${orderService.service.from.name} -> ${
                                    orderService.service.to.name
                                } (${formatCurrency(orderService.service.price)})`}
                            </li>
                        ))}
                    </ul>
                )}
                {orderById?.total && <h2>Total: {formatCurrency(orderById.total)}</h2>}
            </div>
        </div>
    );
}

const mapStateToProps = ({ ordersReducer }: RootState) => ({
    orders: ordersReducer.orders,
});

export default connect(mapStateToProps)(ViewOrder);

type MatchParams = { id: string };
type ViewOrderProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<MatchParams>;
