import React, { useState } from 'react';
import AddServiceModal from './AddServiceModal';
import Table, { TableAction, TableColumn } from '../../components/table/Table';
import { Service } from '../../store/types/serviceTypes';

export default function NewOrderServices({ orderServices, services, setOrderServices }) {
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    const servicesTableActions: TableAction[] = [
        // {
        //     type: 'edit',
        //     action: (service: Service) => {
        //         setEditingId(service._id);
        //         setShowAddServiceModal(true);
        //     },
        // },
        {
            type: 'delete',
            action: (service: Service) => handleServiceDelete(service._id),
        },
    ];

    function handleServicesSubmit(service: Service) {
        const updatedServices = [...orderServices];
        updatedServices.unshift({ ...service });
        setOrderServices(updatedServices);
        setShowAddServiceModal(false);
    }

    function handleServiceDelete(id: string) {
        console.log('deleting', id);
        console.log('updatedServices', orderServices);
        const updatedServices = [...orderServices].filter((x) => x._id !== id);
        setOrderServices(updatedServices);
        setShowAddServiceModal(false);
    }

    return (
        <div>
            <div>
                <div className="titleContainer">
                    <h2>Services</h2>
                    <button onClick={() => setShowAddServiceModal(true)}>Add service</button>
                </div>
                <Table data={orderServices} columns={servicesColumns} actions={servicesTableActions} uniqueKey="_id" />
            </div>
            {/* <AddServiceModal
                services={services}
                isOpen={showAddServiceModal}
                closeModal={() => setShowAddServiceModal(false)}
                addNewService={handleServicesSubmit}
                isEditingId={editServiceId}
            /> */}
        </div>
    );
}

export const servicesColumns: TableColumn[] = [
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
