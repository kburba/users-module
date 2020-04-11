import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../table/Table';
import { ServiceActions, Service } from '../../store/types/serviceTypes';
import { deleteServiceAction, setServicesModal } from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';

export const servicesColumns: TableColumn[] = [
    {
        key: '_id',
        title: 'ID',
    },
    {
        key: 'createdAt',
        title: 'Created',
        valueType: 'timestamp',
    },
    {
        key: 'type',
        title: 'Type',
    },
    {
        key: 'from',
        subKey: 'name',
        title: 'From',
    },
    {
        key: 'to',
        subKey: 'name',
        title: 'To',
    },
    {
        key: 'price',
        title: 'Price',
        valueType: 'currency',
    },
];

function ServicesTable({ deleteService, isLoading, setModal, services, modalIsOpen }: ServicesTableProps) {
    const tableActions: TableAction[] = [
        {
            type: 'edit',
            action: (service: Service) => {
                setModal(true);
            },
        },
        {
            type: 'delete',
            action: (service: Service) => deleteService(service._id),
        },
    ];

    const ThisIsTest = <div>Das is mein test</div>;

    return (
        <Table
            data={services}
            columns={servicesColumns}
            uniqueKey="_id"
            actions={tableActions}
            isLoading={isLoading}
            customRow={{ show: modalIsOpen, rowElement: ThisIsTest }}
        />
    );
}

const mapStateToProps = ({ servicesReducer }: RootState) => ({
    services: servicesReducer.services,
    isLoading: servicesReducer.isLoading,
    modalIsOpen: servicesReducer.modalIsOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions>) => ({
    deleteService: (id: string) => dispatch(deleteServiceAction(id)),
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);
type ServicesTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
