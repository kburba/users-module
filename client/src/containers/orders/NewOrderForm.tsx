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
import NewOrderRow from './NewOrderRow';

interface FormData {
    name: string;
    orderId: string;
    service: Service;
    total: number;
}

interface ServiceForm extends Service {
    customPrice: number;
}

function NewOrderForm({ services, getServices, addOrder, history, isSubmitting, ordersQty }: NewOrderProps) {
    const [orderServices, setOrderServices] = useState<ServiceForm[]>([]);
    const [showNewOrderRow, setShowNewOrderForm] = useState<boolean>(false);
    const { handleSubmit, register, errors, setValue, watch } = useForm<FormData>();

    useEffect(() => {
        if (services.length < 1) {
            getServices();
        }
    }, [getServices, services.length]);

    const onSubmit = (values) => {
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
            total: values.total,
        };
        orderServices.forEach((service) => {
            const newService = {
                service: service._id,
                customPrice: service.customPrice,
            };
            newOrder.services.unshift(newService);
        });
        addOrder(newOrder);
    };

    function calcNewTotal(addValue) {
        const currentTotal = watch('total');
        return !isEmpty(currentTotal)
            ? parseFloat(currentTotal.toString()) + parseFloat(addValue)
            : parseFloat(addValue);
    }

    function handleServicesSubmit({ service, price }) {
        const selected = services.find((x) => x._id === service);
        if (selected) {
            const updatedServices = [...orderServices];
            // const customPrice = selected.price !== parseFloat(price) ? price : undefined;
            const customPrice = 15.99;
            updatedServices.unshift({ ...selected, customPrice });
            const newTotal = calcNewTotal(price);
            setValue('total', newTotal);
            setOrderServices(updatedServices);
            setShowNewOrderForm(false);
        }
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
                    <TextField
                        label="Order name"
                        inputRef={register({ required: 'Please name your order' })}
                        error={typeof errors.name !== 'undefined'}
                        name="name"
                        helperText={errors.name && errors.name.message}
                    ></TextField>
                </div>
                <div>
                    <TextField
                        label="ID"
                        inputRef={register({ required: 'Please add ID' })}
                        defaultValue={ordersQty}
                        error={typeof errors.orderId !== 'undefined'}
                        name="orderId"
                        helperText={errors.orderId && errors.orderId.message}
                    ></TextField>
                </div>
            </div>
            <hr />
            <div>
                <div className="titleContainer">
                    <h2>Services</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '25px' }}
                        onClick={() => setShowNewOrderForm(true)}
                    >
                        Add service
                    </Button>
                </div>
                <table className="table" style={{ backgroundColor: 'white', width: '100%' }}>
                    {(orderServices.length > 0 || showNewOrderRow) && (
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>From</th>
                                <th>To</th>
                                <th style={{ width: '20%' }}>Price</th>
                                <th style={{ textAlign: 'center', width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {showNewOrderRow && (
                            <NewOrderRow
                                services={filteredServices}
                                onSubmit={handleServicesSubmit}
                                onCancel={() => setShowNewOrderForm(false)}
                            />
                        )}
                        {orderServices.map((orderService) => (
                            <tr key={orderService._id}>
                                <td>{orderService.type}</td>
                                <td>{orderService.from.name}</td>
                                <td>{orderService.to.name}</td>
                                <td>{renderPrice(orderService)}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'right', marginBottom: '15px', alignItems: 'center' }}>
                <h4 style={{ marginRight: '15px' }}>Totals:</h4>
                <TextField
                    inputRef={register({
                        validate: {
                            positive: (value) => parseInt(value, 10) > 0 || 'should be greater than 0',
                        },
                        required: 'Please add total sum',
                    })}
                    name="total"
                    error={typeof errors.total !== 'undefined'}
                    helperText={errors.total && errors.total.message}
                ></TextField>
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
