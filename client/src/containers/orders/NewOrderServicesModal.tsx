import React from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import SelectField from '../../components/common/SelectField';
import Table from '../../components/table/Table';
import TextField from '../../components/common/TextField';
import columns from '../../components/table/columns';

export default function NewOrderServicesModal({
  errors,
  filteredServices,
  handleServiceFilterChange,
  isOpen,
  languagesFrom,
  languagesTo,
  registerRef,
  serviceTypesOptions,
  servicesFilter,
  // servicesTableActions,
  setModal,
  addService,
}) {
  const {
    handleSubmit,
    register,
    errors: formErrors,
    setValue,
    watch,
  } = useForm<FormData>();

  function onSubmit(values) {
    console.log('submitting', values);
  }
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
          value={servicesFilter.to}
          name="to"
          label="To"
          inputRef={register({ required: 'Please choose language' })}
          disabled={servicesFilter.from === ''}
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
        {/* <Table
          data={filteredServices}
          columns={[columns.from, columns.to, columns.price]}
          uniqueKey="_id"
        /> */}
        <div>Sum: {}</div>
        <Button variant="contained" color="primary" type="submit">
          Add Service
        </Button>
      </form>
    </Modal>
  );
}
