import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { useForm } from 'react-hook-form';
import {
  ServiceActions,
  Service,
  ServiceWithDetails,
} from '../../store/types/serviceTypes';
import { getServicesAction } from '../../store/actions/serviceActions';
import { NewOrder, OrderActions } from '../../store/types/orderTypes';
import { addOrderAction } from '../../store/actions/orderActions';
import { RootState } from '../../store/reducers';
import TextField from '../../components/common/TextField';
import SelectField, {
  SelectFieldOption,
} from '../../components/common/SelectField';
import Table, { TableAction } from '../../components/table/Table';
import { getClientsAction } from '../../store/actions/clientActions';
import { ClientsActions } from '../../store/types/clientTypes';
import { formatValue } from '../../utils/utils';
import columns, { ValueTypes } from '../../components/table/columns';
import NewOrderServicesModal from './NewOrderServicesModal';

interface FormData {
  name: string;
  orderId: string;
  service: Service;
  pagesQty: string;
  total: number;
  client: string;
}

function NewOrderForm({
  addOrder,
  clients,
  getClients,
  getServices,
  history,
  isSubmitting,
  ordersQty,
  services,
}: NewOrderProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderServices, setOrderServices] = useState<ServiceWithDetails[]>([]);
  const [servicesFilter, setServicesFilter] = useState<
    Pick<Service, 'type'> & { from: string; to: string }
  >({
    type: 'translation',
    from: '',
    to: '',
  });
  const { handleSubmit, register, errors, setValue, watch } = useForm<
    FormData
  >();

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  function onSubmit(values) {
    const newOrder: {
      details: {
        name: string;
        orderId: string;
      };
      client: string;
      services: any[];
      total: number;
    } = {
      details: {
        name: values.name,
        orderId: values.orderId,
      },
      client: values.client,
      services: [],
      total: totalPrice,
    };
    orderServices.forEach((service) => {
      const newService = {
        service: service._id,
        pagesQty: service.pagesQty,
      };
      newOrder.services.unshift(newService);
    });
    addOrder(newOrder);
  }

  function handleServiceFilterChange(name: string, value: string | number) {
    const newFilter = {
      ...servicesFilter,
      [name]: value,
    };
    if (name === 'type' || name === 'from') {
      newFilter.to = '';
    }
    if (name === 'type') {
      newFilter.to = '';
      newFilter.from = '';
    }
    if (
      name === 'from' &&
      services.filter((x) => x.from._id === value).length === 1
    ) {
      newFilter.to = services.filter((x) => x.from._id === value)[0].to._id;
    }
    setServicesFilter(newFilter);
  }

  const servicesTableActions: TableAction[] = [
    {
      type: 'addToList',
      action: (service: Service) => {
        const updatedServices = [...orderServices];
        const newService = {
          ...service,
          pagesQty: watch('pagesQty'),
          totalPrice: service.price * parseFloat(watch('pagesQty')),
        };
        console.log('newService', newService);
        updatedServices.unshift(newService);
        setOrderServices(updatedServices);
        setValue('pagesQty', '');
      },
    },
  ];

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
  const languagesFrom: SelectFieldOption[] = [];
  const languagesTo: SelectFieldOption[] = [];

  services.forEach((service) => {
    if (
      service.type === servicesFilter.type &&
      languagesFrom.findIndex((x) => x.value === service.from._id) === -1
    ) {
      languagesFrom.push({
        text: service.from.name,
        value: service.from._id,
      });
    }

    if (
      service.type === servicesFilter.type &&
      service.from._id === servicesFilter.from &&
      languagesTo.findIndex((x) => x.value === service.to._id) === -1
    ) {
      languagesTo.push({
        text: service.to.name,
        value: service.to._id,
      });
    }
  });

  const filteredServices = services.filter((service) => {
    const filtersToPass = Object.keys(servicesFilter).length + 1;
    let filtersPassed = 0;
    if (service.type === servicesFilter.type) {
      filtersPassed++;
    }
    if (
      servicesFilter.from === '' ||
      service.from._id === servicesFilter.from
    ) {
      filtersPassed++;
    }
    if (servicesFilter.to === '' || service.to._id === servicesFilter.to) {
      filtersPassed++;
    }
    // already in list
    if (orderServices.findIndex((x) => x._id === service._id) === -1) {
      filtersPassed++;
    }

    return filtersToPass === filtersPassed;
  });

  const clientOptions = clients.map((client) => ({
    text: client.name,
    value: client._id,
  }));
  const totalPrice = orderServices.reduce(
    (prev, curr) => prev + curr.totalPrice,
    0
  );

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
            autofocus
            label="Order name"
            placeholder="Please enter order name"
            error={errors.name?.message}
          />
        </div>
        <div className="section">
          <h2>Order client</h2>
          <SelectField
            inputRef={register({ required: 'Please add client' })}
            name="client"
            defaultValue=""
            label="Client"
            options={clientOptions}
            error={errors.client?.message}
          />
        </div>
        <div className="section">
          <h2>
            Order services{' '}
            {orderServices.length > 0 && `(${orderServices.length})`}
          </h2>
          <div className="text-right margin--bottom">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalIsOpen(true)}
            >
              + Add Service
            </Button>
          </div>
          <Table
            data={orderServices}
            columns={[
              columns.type,
              columns.from,
              columns.to,
              columns.pagesQty,
              columns.price,
              columns.totalPrice,
            ]}
            uniqueKey="_id"
            actions={servicesTableActions}
          />
          <hr />
          <SelectField
            value={servicesFilter.type}
            name="type"
            label="Type"
            options={serviceTypesOptions}
            onChange={handleServiceFilterChange}
          />
          <SelectField
            value={servicesFilter.from}
            name="from"
            label="From"
            options={languagesFrom}
            onChange={handleServiceFilterChange}
          />
          <SelectField
            value={servicesFilter.to}
            name="to"
            label="To"
            options={languagesTo}
            onChange={handleServiceFilterChange}
          />
          <TextField
            name="pagesQty"
            inputRef={register({ required: 'Please enter number of pages' })}
            label="Number of pages"
            placeholder="Please enter number of pages"
            error={errors.pagesQty?.message}
          />
          <Table
            data={filteredServices}
            columns={[columns.from, columns.to, columns.price]}
            uniqueKey="_id"
            actions={servicesTableActions}
          />
        </div>
        <div
          style={{
            textAlign: 'right',
            marginBottom: '15px',
            alignItems: 'center',
          }}
        >
          <h4 style={{ marginRight: '15px' }}>
            Totals: {formatValue(totalPrice, ValueTypes.currency)}
          </h4>
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
            {isSubmitting && (
              <CircularProgress size={24} className="absolute-position" />
            )}
          </Button>
        </div>
      </form>
      <NewOrderServicesModal
        errors={errors}
        filteredServices={filteredServices}
        handleServiceFilterChange={handleServiceFilterChange}
        isOpen={modalIsOpen}
        languagesFrom={languagesFrom}
        languagesTo={languagesTo}
        registerRef={register}
        serviceTypesOptions={serviceTypesOptions}
        servicesFilter={servicesFilter}
        setModal={setModalIsOpen}
        addService={() => {}}
      />
    </div>
  );
}

const mapStateToProps = ({
  servicesReducer,
  ordersReducer,
  clientsReducer,
}: RootState) => ({
  services: servicesReducer.services,
  isSubmitting: ordersReducer.isSubmitting,
  ordersQty: ordersReducer.orders.length,
  clients: clientsReducer.clients,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ServiceActions | OrderActions | ClientsActions>
) => ({
  getServices: () => dispatch(getServicesAction()),
  getClients: () => dispatch(getClientsAction()),
  addOrder: (newOrder: NewOrder) => dispatch(addOrderAction(newOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderForm);

type NewOrderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;
