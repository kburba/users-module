import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServicesAction } from '../../store/actions/serviceActions';
import { ServiceActions, Service } from '../../store/types/serviceTypes';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { useForm } from 'react-hook-form';
import { NewOrder, OrderActions } from '../../store/types/orderTypes';
import { addOrderAction } from '../../store/actions/orderActions';
import { formatValue } from '../../utils/utils';
import isEmpty from '../../validations/isEmpty';
import { RootState } from '../../store/reducers';
import Table, { TableColumn } from '../../components/table/Table';
import AddServiceModal from './AddServiceModal';

const servicesColumns: TableColumn[] = [
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

interface FormData {
    name: string;
    orderId: string;
    service: Service;
    total: number;
}

function NewOrderForm({ services, getServices, addOrder, history, isSubmitting, ordersQty }: NewOrderProps) {
    const [orderServices, setOrderServices] = useState<Service[]>([]);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const { handleSubmit, register, errors, setValue, watch } = useForm<FormData>();

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

    function calcNewTotal(addValue) {
        const currentTotal = watch('total');
        return !isEmpty(currentTotal)
            ? parseFloat(currentTotal.toString()) + parseFloat(addValue)
            : parseFloat(addValue);
    }

    function handleServicesSubmit(service: Service) {
        const updatedServices = [...orderServices];
        updatedServices.unshift({ ...service });
        const newTotal = calcNewTotal(service.price);
        setOrderServices(updatedServices);
        setShowAddServiceModal(false);
    }

    function renderPrice(service) {
        if (service.customPrice) {
            return `${formatValue(service.customPrice, 'currency')} (${formatValue(service.price, 'currency')})`;
        }
        return formatValue(service.price, 'currency');
    }

    const filteredServices = services.filter(
        (service) => typeof orderServices.find((x) => x._id === service._id) === 'undefined',
    );

    return (
        <div>
            <Link to="/orders">Back to orders</Link>
            <div>
                <h2>Order details</h2>
                <div>
                    <label>Order name: </label>
                    <input autoFocus={true} ref={register({ required: 'Please name your order' })} name="name"></input>
                </div>
                <div>
                    <label>ID: </label>
                    <input
                        ref={register({ required: 'Please add ID' })}
                        defaultValue={ordersQty}
                        name="orderId"
                    ></input>
                </div>
            </div>
            <hr />
            <div>
                <div className="titleContainer">
                    <h2>Services</h2>
                    <button onClick={() => setShowAddServiceModal(true)}>Add service</button>
                </div>
                <Table data={orderServices} columns={servicesColumns} uniqueKey="_id" />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '15px', alignItems: 'center' }}>
                <h4 style={{ marginRight: '15px' }}>Totals:</h4>
                <input type="text" disabled value={totalPrice} />
                {/* <TextField
                    inputRef={register({
                        validate: {
                            positive: (value) => parseInt(value, 10) > 0 || 'should be greater than 0',
                        },
                        required: 'Please add total sum',
                    })}
                    name="total"
                    error={typeof errors.total !== 'undefined'}
                    helperText={errors.total && errors.total.message}
                ></TextField> */}
            </div>
            <div style={{ textAlign: 'right' }}>
                <Button
                    style={{ marginRight: '15px' }}
                    onClick={() => history.goBack()}
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
            <AddServiceModal
                services={services}
                isOpen={showAddServiceModal}
                closeModal={() => setShowAddServiceModal(false)}
                addNewService={handleServicesSubmit}
            />
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
