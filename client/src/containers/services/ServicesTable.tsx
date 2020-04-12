import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../../components/table/Table';
import { ServiceActions, Service } from '../../store/types/serviceTypes';
import { deleteServiceAction, setEditingServiceId } from '../../store/actions/serviceActions';
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
        isEditable: true,
        editType: 'input',
    },
];

function ServicesTable({ deleteService, isLoading, setEditingId, services, handleEdit }: ServicesTableProps) {
    const tableActions: TableAction[] = [
        {
            type: 'edit',
            action: (service: Service) => {
                handleEdit(service);
                setEditingId(service._id);
            },
        },
        {
            type: 'delete',
            action: (service: Service) => deleteService(service._id),
        },
    ];

    return (
        <Table data={services} columns={servicesColumns} uniqueKey="_id" actions={tableActions} isLoading={isLoading} />
    );
}

const mapStateToProps = ({ servicesReducer }: RootState) => ({
    services: servicesReducer.services,
    isLoading: servicesReducer.isLoading,
    modalIsOpen: servicesReducer.modalIsOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions>) => ({
    deleteService: (id: string) => dispatch(deleteServiceAction(id)),
    setEditingId: (id: string) => dispatch(setEditingServiceId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);
type ServicesTableProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & { handleEdit: (service: Service) => void };
