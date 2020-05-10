import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import { Button, Container } from '@material-ui/core';
import { RootState } from '../../store/reducers';
import { ClientsActions } from '../../store/types/clientTypes';
import { setClientsModal } from '../../store/actions/clientActions';
import ClientModal from './ClientModal';
import ClientsTable from './ClientsTable';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../components/common/PrivateRoute';
import ClientView from './ClientView';

function ClientsContainer({ isLoadingClients, setModal }: ReduxProps) {
    if (isLoadingClients) {
        return (
            <Container>
                <Spinner />
            </Container>
        );
    }
    return (
        <Container>
            <div className="titleContainer">
                <h1>Clients</h1>
                <div className="text-right margin--bottom">
                    <Button variant="contained" color="primary" onClick={() => setModal(true)}>
                        + Add Client
                    </Button>
                </div>
            </div>
            <Switch>
                <PrivateRoute exact path="/clients/" component={ClientsTable} />
                <PrivateRoute path="/clients/:id" component={ClientView} />
            </Switch>
            <ClientModal />
        </Container>
    );
}

const mapStateToProps = ({ clientsReducer }: RootState) => ({
    isLoadingClients: clientsReducer.isLoadingClients,
});

const mapDispatchToProps = (dispatch: Dispatch<ClientsActions>) => ({
    setModal: (status: boolean) => dispatch(setClientsModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
