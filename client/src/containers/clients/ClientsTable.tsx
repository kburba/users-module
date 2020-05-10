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
import { ValueTypes } from '../../components/table/columns';

export const clientsColumns: TableColumn[] = [
    {
        key: '_id',
        title: 'ID',
    },
    {
        key: 'createdAt',
        title: 'Created',
        valueType: ValueTypes.timestamp,
    },
    {
        key: 'name',
        title: 'Name',
        linkTo: '/clients',
    },
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
        <Table
            data={clients}
            columns={clientsColumns}
            uniqueKey="_id"
            actions={tableActions}
            isLoading={isLoadingClients}
        />
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
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
