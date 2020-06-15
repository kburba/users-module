import React from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import SelectField from '../../components/common/SelectField';
import TextField from '../../components/common/TextField';
import { ValueTypes } from '../../components/table/columns';
import { formatValue } from '../../utils/utils';
import { Service, ServiceWithDetails } from '../../store/types/serviceTypes';

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

interface FormData {
  from: string;
  pagesQty: string;
  selectedService: string;
}

export default function NewOrderServicesModal({
  addService,
  isEditing,
  isOpen,
  services,
  setModal,
  updateService,
  resetEditing,
}: {
  addService: (newService: ServiceWithDetails) => void;
  isEditing: ServiceWithDetails | null;
  isOpen: boolean;
  services: Service[];
  setModal: (status: boolean) => void;
  updateService: (updatedService: ServiceWithDetails) => void;
  resetEditing: () => void;
}) {
  const { handleSubmit, register, errors, watch, reset } = useForm<FormData>();

  const languagesFrom = services
    .filter((serv, index, arr) => {
      const typeFilter = isEditing ? isEditing.type : watch('type');
      const isCorrectType = serv.type === typeFilter;
      const isDuplicate =
        index === arr.findIndex((x) => x.from.name === serv.from.name);
      return isCorrectType && !isDuplicate;
    })
    .map((serv) => ({
      text: serv.from.name,
      value: serv.from._id,
    }));

  const languagesTo = services
    .filter((serv) => {
      const typeFilter = isEditing ? isEditing.type : watch('type');
      const fromFilter = isEditing ? isEditing.from._id : watch('from');
      const isCorrectType = serv.type === typeFilter;
      const isCorrectFrom = serv.from._id === fromFilter;
      return isCorrectType && isCorrectFrom;
    })
    .map((serv) => ({
      text: serv.to.name,
      value: serv._id,
    }));

  function onSubmit(values) {
    const selectedService = services.find(
      (x) => x._id === values.selectedService
    );
    if (selectedService) {
      const { pagesQty } = values;
      const newService: ServiceWithDetails = {
        ...selectedService,
        pagesQty,
        totalPrice: selectedService
          ? selectedService.price * parseFloat(values.pagesQty)
          : null,
      };
      if (isEditing) {
        updateService(newService);
      } else {
        addService(newService);
      }
      setModal(false);
      reset();
      resetEditing();
    }
  }
  const selectedService = isEditing
    ? isEditing
    : services.find((x) => x._id === watch('selectedService'));

  const price = selectedService ? selectedService.price : null;
  const totalPrice =
    price && watch('pagesQty') ? price * parseFloat(watch('pagesQty')) : null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={(): void => {
        setModal(false);
        reset();
        resetEditing();
      }}
      className="VertiModal"
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          defaultValue={isEditing ? isEditing.type : ''}
          inputRef={register({ required: 'Please choose type' })}
          label="Type"
          name="type"
          options={serviceTypesOptions}
        />
        <SelectField
          defaultValue={isEditing ? isEditing.from._id : ''}
          error={errors.from?.message}
          inputRef={register({
            required: 'Please choose language',
          })}
          label="From"
          name="from"
          options={languagesFrom}
        />
        <SelectField
          defaultValue={isEditing ? isEditing._id : ''}
          disabled={watch().from === ''}
          error={errors.selectedService?.message}
          inputRef={register({
            required: 'Please choose language',
          })}
          label="To"
          name="selectedService"
          options={languagesTo}
        />
        <TextField
          defaultValue={isEditing ? isEditing.pagesQty : 1}
          error={errors.pagesQty?.message}
          inputRef={register({
            required: 'Please enter number of pages',
          })}
          label="Number of pages"
          name="pagesQty"
          placeholder="Please enter number of pages"
        />
        <div>Price: {price && formatValue(price, ValueTypes.currency)}</div>
        <div>
          Sum: {totalPrice && formatValue(totalPrice, ValueTypes.currency)}
        </div>
        <Button variant="contained" color="primary" type="submit">
          {isEditing ? 'Save Changes' : 'Add Service'}
        </Button>
      </form>
    </Modal>
  );
}
