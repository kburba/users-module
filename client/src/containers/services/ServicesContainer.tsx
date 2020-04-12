import React, { useEffect, Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { getServicesAction, deleteServiceAction, setServicesModal } from '../../store/actions/serviceActions';
import { ServiceActions, ServiceForm, Service } from '../../store/types/serviceTypes';
import Spinner from '../../components/common/Spinner';
import ServicesTable from './ServicesTable';
import { Button, Container } from '@material-ui/core';
import { RootState } from '../../store/reducers';
import ServicesModal from './ServicesModal';
import { getLanguagesAction } from '../../store/actions/languageActions';
import { LanguageActions } from '../../store/types/languageTypes';

const initialValues: ServiceForm = {
    type: 'translation',
    from: '',
    to: '',
    price: '',
};

function ServicesContainer({ getServices, isLoading, setModal, services, isEditingServiceId }: ServicesProps) {
    const [editingService, setEditingService] = useState<ServiceForm>(initialValues);
    useEffect(() => {
        if (services.length < 1) {
            getServices();
        }
    }, [getServices, services.length]);

    // useEffect(() => {
    //     if (modalIsOpen && languages.length < 1) {
    //         getLanguages();
    //     }
    // }, [languages.length, getLanguages, modalIsOpen]);

    function handleEdit(service: Service) {
        const NewEditingService = {
            ...service,
            from: service.from._id,
            to: service.to._id,
            price: service.price.toString(),
        };
        setEditingService(NewEditingService);
        setModal(true);
    }

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
            <ServicesTable handleEdit={handleEdit} />
            <ServicesModal initialValues={editingService} />
        </Container>
    );
}

const mapStateToProps = ({ servicesReducer }: RootState) => ({
    isLoading: servicesReducer.isLoading,
    services: servicesReducer.services,
    isEditingServiceId: servicesReducer.editingId,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions | LanguageActions>) => ({
    getServices: () => dispatch(getServicesAction()),
    deleteService: (id: string) => dispatch(deleteServiceAction(id)),
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
    getLanguages: () => dispatch(getLanguagesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);

type ServicesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
