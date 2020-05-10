import React, { useEffect, Dispatch } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getClientById } from '../../store/actions/clientActions';
import { RootState } from '../../store/reducers';
import { ClientsActions } from '../../store/types/clientTypes';
import Table from '../../components/table/Table';
import { ordersColumns } from '../orders/OrdersTable';

function ClientView({ match, getClient, clientById }: ReduxProps) {
    const clientId = match.params.id;
    useEffect(() => {
        document.title = 'Client title';
    }, []);

    useEffect(() => {
        if (clientById?._id !== clientId) {
            getClient(clientId);
        }
    }, [getClient, clientId, clientById]);

    return (
        <div>
            <h3>Client info</h3>
            <div>{clientById?.name}</div>
            <h3>Orders</h3>
            {clientById?.orders && (
                <Table
                    data={clientById.orders}
                    columns={ordersColumns}
                    // isLoading={isLoading || isDeleting}
                    // actions={tableActions}
                    uniqueKey="_id"
                />
            )}
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
