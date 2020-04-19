import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServicesAction } from '../../store/actions/serviceActions';
import { ServiceActions, Service } from '../../store/types/serviceTypes';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { useForm } from 'react-hook-form';
import { NewOrder, OrderActions } from '../../store/types/orderTypes';
import { addOrderAction } from '../../store/actions/orderActions';
import { RootState } from '../../store/reducers';
import NewOrderServices from './NewOrderServices';
import AddServiceModal from './AddServiceModal';
import TextField from '../../components/common/TextField';
import Table from '../../components/table/Table';
import SelectField from '../../components/common/SelectField';

interface FormData {
    name: string;
    orderId: string;
    service: Service;
    total: number;
}

function NewOrderForm({ services, getServices, addOrder, history, isSubmitting, ordersQty }: NewOrderProps) {
    const [orderServices, setOrderServices] = useState<Service[]>([]);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const { handleSubmit, register, errors } = useForm<FormData>();
    console.log('errors', errors);

    useEffect(() => {
        getServices();
    }, [getServices]);

    const totalPrice = orderServices.reduce((prev, curr) => prev + curr.price, 0);

    function onSubmit(values) {
        const newOrder: {
            details: {
                name: string;
                orderId: string;
            };
            services: any[];
            total: number;
        } = {
            details: {
                name: values.name,
                orderId: values.orderId,
            },
            services: [],
            total: totalPrice,
        };
        orderServices.forEach((service) => {
            const newService = {
                service: service._id,
            };
            newOrder.services.unshift(newService);
        });
        addOrder(newOrder);
    }

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

    const serviceTypesOptions = [
        {
            value: 'proofreading',
            text: 'Proofreading',
        },
        {
            value: 'translation',
            text: 'Translation',
        },
        {
            value: 'editing',
            text: 'Editing',
        },
    ];

    return (
        <div className="newOrder">
            <Link to="/orders">Back to orders</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <h2>Order details</h2>
                    <TextField
                        label="Order ID"
                        placeholder="Please enter order ID"
                        inputRef={register({ required: 'Please add ID' })}
                        defaultValue={ordersQty}
                        name="orderId"
                        error={errors.orderId?.message}
                    />
                    <TextField
                        name="name"
                        inputRef={register({ required: 'Please enter your order name' })}
                        autofocus={true}
                        label="Order name"
                        placeholder="Please enter order name"
                        error={errors.name?.message}
                    />
                </div>
                <div className="section">
                    <h2>Order services</h2>
                    <SelectField name="type" label="Type" options={serviceTypesOptions} />
                </div>
                <div style={{ textAlign: 'right', marginBottom: '15px', alignItems: 'center' }}>
                    <h4 style={{ marginRight: '15px' }}>Totals: {totalPrice}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button
                        style={{ marginRight: '15px' }}
                        onClick={() => history.push('/orders')}
                        color="default"
                        variant="outlined"
                        size="large"
                    >
                        <ClearIcon /> Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        color="secondary"
                        size="large"
                        disabled={isSubmitting}
                    >
                        <SaveIcon /> Save order
                        {isSubmitting && <CircularProgress size={24} className="absolute-position" />}
                    </Button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = ({ servicesReducer, ordersReducer }: RootState) => ({
    services: servicesReducer.services,
    isSubmitting: ordersReducer.isSubmitting,
    ordersQty: ordersReducer.orders.length,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions | OrderActions>) => ({
    getServices: () => dispatch(getServicesAction()),
    addOrder: (newOrder: NewOrder) => dispatch(addOrderAction(newOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderForm);

type NewOrderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps;
