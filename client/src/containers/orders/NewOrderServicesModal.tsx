import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import SelectField, {
  SelectFieldOption,
} from '../../components/common/SelectField';
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
  pagesQty: string;
  selectedService: string;
}

export default function NewOrderServicesModal({
  isOpen,
  services,
  setModal,
  addService,
}: {
  services: Service[];
  isOpen: boolean;
  setModal: (status: boolean) => void;
  addService: (newService: ServiceWithDetails) => void;
}) {
  const [servicesFilter, setServicesFilter] = useState<
    Pick<Service, 'type'> & { from: string; selectedService: string }
  >({
    type: 'translation',
    from: '',
    selectedService: '',
  });

  const { handleSubmit, register, errors, watch } = useForm<FormData>();

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
      languagesTo.findIndex((x) => x.value === service._id) === -1
    ) {
      languagesTo.push({
        text: service.to.name,
        value: service._id,
      });
    }
  });

  function handleServiceFilterChange(name: string, value: string | number) {
    const newFilter = {
      ...servicesFilter,
      [name]: value,
    };
    if (name === 'type' || name === 'from') {
      newFilter.selectedService = '';
    }
    if (name === 'type') {
      newFilter.selectedService = '';
      newFilter.from = '';
    }
    if (
      name === 'from' &&
      services.filter((x) => x.from._id === value).length > 0
    ) {
      newFilter.selectedService = services.filter(
        (x) => x.from._id === value
      )[0]._id;
    }

    setServicesFilter(newFilter);
  }

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
      addService(newService);
      setModal(false);
    }
  }
  const selectedService = services.find(
    (x) => x._id === watch('selectedService')
  );

  const price = selectedService ? selectedService.price : null;
  const totalPrice =
    price && watch('pagesQty') ? price * parseFloat(watch('pagesQty')) : null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={(): void => setModal(false)}
      className="VertiModal"
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
          value={servicesFilter.selectedService}
          name="selectedService"
          label="To"
          inputRef={register({ required: 'Please choose language' })}
          disabled={servicesFilter.from === ''}
          options={languagesTo}
          onChange={handleServiceFilterChange}
          error={errors.selectedService?.message}
        />
        <TextField
          name="pagesQty"
          defaultValue={1}
          inputRef={register({ required: 'Please enter number of pages' })}
          label="Number of pages"
          placeholder="Please enter number of pages"
          error={errors.pagesQty?.message}
        />
        <div>Price: {price && formatValue(price, ValueTypes.currency)}</div>
        <div>
          Sum: {totalPrice && formatValue(totalPrice, ValueTypes.currency)}
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add Service
        </Button>
      </form>
    </Modal>
  );
}
