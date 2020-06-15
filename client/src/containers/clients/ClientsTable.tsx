import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../../components/table/Table';
import { RootState } from '../../store/reducers';
import {
  setClientsModal,
  deleteClientAction,
  setClientEditingId,
  getClientsAction,
} from '../../store/actions/clientActions';
import { ClientsActions, Client } from '../../store/types/clientTypes';
import { Button } from '@material-ui/core';
import { clientColumns } from '../../components/table/columns';

const TableColumns: TableColumn[] = [
  clientColumns.name,
  clientColumns.sumOfOrders,
];

function ClientsTable({
  setModal,
  clients,
  isLoadingClients,
  deleteClient,
  setClientEditingId,
  getClients,
}: ReduxProps) {
  useEffect(() => {
    getClients();
  }, [getClients]);

  const tableActions: TableAction[] = [
    {
      type: 'edit',
      action: (client: Client) => {
        setClientEditingId(client._id);
        setModal(true);
      },
    },
    {
      type: 'delete',
      action: (client: Client) => {
        deleteClient(client._id);
      },
    },
  ];

  return (
    <>
      <div className="titleContainer">
        <h1>Clients</h1>
        <div className="text-right margin--bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModal(true)}
          >
            + Add Client
          </Button>
        </div>
      </div>
      <Table
        data={clients}
        columns={TableColumns}
        uniqueKey="_id"
        actions={tableActions}
        isLoading={isLoadingClients}
      />
    </>
  );
}

const mapStateToProps = ({ clientsReducer }: RootState) => ({
  clients: clientsReducer.clients,
  isLoadingClients: clientsReducer.isLoadingClients,
  modalIsOpen: clientsReducer.modalIsOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<ClientsActions>) => ({
  deleteClient: (id: string) => dispatch(deleteClientAction(id)),
  getClients: () => dispatch(getClientsAction()),
  setClientEditingId: (id: string) => dispatch(setClientEditingId(id)),
  setModal: (status: boolean) => dispatch(setClientsModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
