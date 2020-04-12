import React from 'react';
import { useForm } from 'react-hook-form';
import { Service } from '../../store/types/serviceTypes';
import Modal from 'react-modal';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

interface FormData {
    service: string;
    price: number;
}

interface Props {
    services: Service[];
    modalIsOpen: boolean;
    onSubmit: (values: FormData) => void;
    closeModal: () => void;
}

export default function NewOrderServicesForm({ services, onSubmit, modalIsOpen, closeModal }: Props) {
    const { handleSubmit, register, errors, watch, setValue } = useForm<FormData>();

    const selected = services.find((x) => x._id === watch('service'));

    function handleServiceChange(e) {
        const serviceId = e.target.value;
        const selected = services.find((x) => x._id === serviceId);
        if (selected) {
            setValue('price', selected.price);
        }
    }
    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="VertiModal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="service" ref={register({ required: true })} onChange={handleServiceChange}>
                    {services.map((service: Service) => (
                        <option key={service._id} value={service._id}>
                            {`${service.type}: ${service.from.name} > ${service.to.name}`}
                        </option>
                    ))}
                </select>
                {errors.service && <div style={{ color: 'red' }}>Services error</div>}
                <div>
                    <TextField
                        label="Price"
                        inputRef={register({ required: true, pattern: /^(\d*\.)?\d+$/ })}
                        defaultValue={selected ? selected.price : 0}
                        name="price"
                        error={typeof errors.price !== 'undefined'}
                    ></TextField>
                </div>

                <div>
                    <Button style={{ marginRight: '15px' }} onClick={closeModal} color="default" variant="outlined">
                        <ClearIcon /> Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)} color="secondary" type="submit">
                        <AddIcon /> Add
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
