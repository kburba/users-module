import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table, { TableAction } from '../../components/table/Table';
import { OrderActions, Order } from '../../store/types/orderTypes';
import {
  deleteOrderAction,
  setOrdersModal,
} from '../../store/actions/orderActions';
import { RootState } from '../../store/reducers';
import { setLoadingCell } from '../../store/actions/variousActions';
import { VariousState } from '../../store/reducers/variousReducer';
import { VariousActions } from '../../store/types/variousTypes';
import { columns, orderColumns } from './../../components/table/columns';

const TableColumns = [
  columns.createdAt,
  orderColumns.client,
  orderColumns.details,
  orderColumns.services,
  orderColumns.total,
];

function OrdersTable({
  orders,
  deleteOrder,
  isDeleting,
  isLoading,
}: OrderTableProps) {
  const tableActions: TableAction[] = [
    {
      type: 'delete',
      action: (order: Order) => {
        setLoadingCell({ column: 'actions', row: order._id });
        deleteOrder(order._id);
      },
    },
  ];

  return (
    <div>
      <div className="text-right margin--bottom">
        <Link to="/orders/new">
          <Button variant="contained" color="primary">
            + Add Order
          </Button>
        </Link>
      </div>
      {orders.length > 0 && (
        <Table<Order>
          actions={tableActions}
          columns={TableColumns}
          data={orders}
          isLoading={isLoading || isDeleting}
          uniqueKey="_id"
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ ordersReducer }: RootState) => ({
  orders: ordersReducer.orders,
  isLoading: ordersReducer.isLoading,
  isDeleting: ordersReducer.isDeleting,
});

const mapDispatchToProps = (
  dispatch: Dispatch<OrderActions | VariousActions>
) => ({
  deleteOrder: (id: string) => dispatch(deleteOrderAction(id)),
  setModal: (status: boolean) => dispatch(setOrdersModal(status)),
  setLoadingCell: (cell: VariousState['isLoadingCell']) =>
    dispatch(setLoadingCell(cell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);

type OrderTableProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
