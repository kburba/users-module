import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, CircularProgress, Container } from '@material-ui/core';
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
import SelectField from '../../components/common/SelectField';
import Table, { TableAction } from '../../components/table/Table';
import { getClientsAction } from '../../store/actions/clientActions';
import { ClientsActions } from '../../store/types/clientTypes';
import { formatValue } from '../../utils/utils';
import columns, { ValueTypes } from '../../components/table/columns';
import NewOrderServicesModal from './NewOrderServicesModal';
import { VariousActions } from '../../store/types/variousTypes';
import { VariousState } from '../../store/reducers/variousReducer';
import { setLoadingCell } from '../../store/actions/variousActions';

interface FormData {
  name: string;
  orderId: string;
  service: Service;
  pagesQty: string;
  total: number;
  client: string;
  comments: string;
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

  const { handleSubmit, register, errors, setValue } = useForm<FormData>();

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  function onSubmit(values: FormData) {
    const newOrder: {
      details: {
        name: string;
        orderId: string;
      };
      client: string;
      services: any[];
      total: number;
      comments?: string;
    } = {
      details: {
        name: values.name,
        orderId: values.orderId,
      },
      client: values.client,
      services: [],
      comments: values.comments,
      total: totalPrice,
    };
    orderServices.forEach((service) => {
      const newService = {
        service: service._id,
        pagesQty: service.pagesQty,
        totalPrice: service.totalPrice,
      };
      newOrder.services.unshift(newService);
    });
    addOrder(newOrder);
  }

  const servicesTableActions: TableAction[] = [
    {
      type: 'edit',
      action: (service: Service) => {
        console.log('editing', service._id);
      },
    },
    {
      type: 'delete',
      action: (service: Service) => {
        setLoadingCell({ column: 'actions', row: service._id });
        setOrderServices(
          orderServices.filter((serv) => serv._id !== service._id)
        );
      },
    },
  ];

  const clientOptions = clients.map((client) => ({
    text: client.name,
    value: client._id,
  }));
  const totalPrice = orderServices.reduce(
    (prev, curr) => prev + (curr.totalPrice ? curr.totalPrice : 0),
    0
  );

  return (
    <Container>
      <div className="newOrder">
        <Link to="/orders">{'< Orders'}</Link>
        <h1>New Order</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <h2>Details</h2>
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
            <h2>Client</h2>
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
            <h2>Services</h2>
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
          </div>
          <div className="section">
            <h3>Additional info:</h3>
            <TextField
              label="Comments"
              placeholder="Please leave your comments here"
              inputRef={register}
              defaultValue=""
              name="comments"
              error={errors.comments?.message}
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
          isOpen={modalIsOpen}
          services={services}
          setModal={setModalIsOpen}
          addService={(newService: ServiceWithDetails) => {
            const updatedServices = [...orderServices];
            updatedServices.unshift(newService);
            setOrderServices(updatedServices);
            setValue('pagesQty', '');
          }}
        />
      </div>
    </Container>
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
  dispatch: Dispatch<
    ServiceActions | OrderActions | ClientsActions | VariousActions
  >
) => ({
  getServices: () => dispatch(getServicesAction()),
  getClients: () => dispatch(getClientsAction()),
  addOrder: (newOrder: NewOrder) => dispatch(addOrderAction(newOrder)),
  setLoadingCell: (cell: VariousState['isLoadingCell']) =>
    dispatch(setLoadingCell(cell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderForm);

type NewOrderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;
