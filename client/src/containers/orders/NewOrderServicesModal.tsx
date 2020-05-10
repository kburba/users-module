import React from 'react';
import Modal from 'react-modal';
import SelectField from '../../components/common/SelectField';
import TextField from '../../components/common/TextField';
import Table from '../../components/table/Table';
import columns from '../../components/table/columns';
import { Button } from '@material-ui/core';

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
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setModal(false)}
            className="VertiModal"
            contentLabel="Example Modal"
        >
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
                disabled={servicesFilter.from === ''}
                options={languagesTo}
                onChange={handleServiceFilterChange}
            />
            <TextField
                name="pagesQty"
                inputRef={registerRef({ required: 'Please enter number of pages' })}
                label="Number of pages"
                placeholder="Please enter number of pages"
                error={errors.pagesQty?.message}
            />
            <Table
                data={filteredServices}
                columns={[columns.from, columns.to, columns.price]}
                uniqueKey="_id"
                // actions={servicesTableActions}
            />
            <div>Sum: {}</div>
            <Button variant="contained" color="primary" onClick={addService}>
                Add Service
            </Button>
        </Modal>
    );
}
