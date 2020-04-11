import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { getServicesAction, deleteServiceAction, setServicesModal } from '../../store/actions/serviceActions';
import { ServiceActions } from '../../store/types/serviceTypes';
import Spinner from '../common/Spinner';
import ServicesTable from './ServicesTable';
import { Button, Container } from '@material-ui/core';
import { RootState } from '../../store/reducers';

function ServicesContainer({ getServices, isLoading, setModal, services }: ServicesProps) {
    useEffect(() => {
        if (services.length < 1) {
            getServices();
        }
    }, [getServices, services.length]);

    if (isLoading) {
        return (
            <Container>
                <Spinner />
            </Container>
        );
    }
    return (
        <Container>
            <div className="titleContainer">
                <h1>Services</h1>
                <div className="text-right margin--bottom">
                    <Button variant="contained" color="primary" onClick={() => setModal(true)}>
                        + Add Service
                    </Button>
                </div>
            </div>
            <ServicesTable />
        </Container>
    );
}

const mapStateToProps = ({ servicesReducer }: RootState) => ({
    isLoading: servicesReducer.isLoading,
    services: servicesReducer.services,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions>) => ({
    getServices: () => dispatch(getServicesAction()),
    deleteService: (id: string) => dispatch(deleteServiceAction(id)),
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);

type ServicesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
