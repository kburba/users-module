import React, { useEffect, Dispatch } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getClientById } from '../../store/actions/clientActions';
import { RootState } from '../../store/reducers';
import { ClientsActions } from '../../store/types/clientTypes';
import Table from '../../components/table/Table';
import { columns, orderColumns } from './../../components/table/columns';

const tableColumns = [
  columns.createdAt,
  orderColumns.name,
  orderColumns.services,
  orderColumns.total,
];

function ClientView({ match, getClient, clientById }: ReduxProps) {
  const clientId = match.params.id;
  useEffect(() => {
    if (clientById) {
      document.title = clientById.name;
    }
  }, [clientById]);

  useEffect(() => {
    if (clientById?._id !== clientId) {
      getClient(clientId);
    }
  }, [getClient, clientId, clientById]);

  return (
    <div>
      <h1>{clientById?.name}</h1>

      <h3>Details</h3>
      <h3>Orders</h3>
      <div>
        <button type="button">Create invoice</button>
      </div>
      {clientById && (
        <Table
          data={clientById.orders}
          columns={tableColumns}
          uniqueKey="_id"
        />
      )}
      <h3>Invoices</h3>
      <h3>Dictionary</h3>
    </div>
  );
}

const mapStateToProps = ({ clientsReducer }: RootState) => ({
  clientById: clientsReducer.clientById,
});

const mapDispatchToProps = (dispatch: Dispatch<ClientsActions>) => ({
  getClient: (id: string) => dispatch(getClientById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientView);

type MatchParams = {
  id: string;
};
type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<MatchParams>;
