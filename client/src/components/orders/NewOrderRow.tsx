import React from 'react';
import { Service } from '../../store/types/serviceTypes';
import { TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

type FormData = {
    serviceType: string;
    service: string;
    price: number;
    serviceFrom: string;
    serviceTo: string;
};

export default function NewOrderRow({
    services,
    onSubmit,
    onCancel,
}: {
    services: Service[];
    onSubmit: ({ service, price }) => void;
    onCancel: () => void;
}) {
    const { handleSubmit, register, errors, setValue, watch } = useForm<FormData>({
        defaultValues: {
            service: services[0]._id,
            serviceType: services[0].type,
            serviceFrom: services[0].from._id,
            serviceTo: services[0].to._id,
            price: services[0].price,
        },
    });

    const selected = services.find((x) => x._id === watch('service'));

    function handleServiceChange(e) {
        const serviceId = e.target.value;
        const selected = services.find((x) => x._id === serviceId);
        if (selected) {
            setValue('price', selected.price);
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const serviceTypes = services.map((x) => x.type).filter(onlyUnique);
    const languagesA = services.filter((x) => x.type === watch('serviceType')).filter(onlyUnique);
    const languagesB = services.filter((x) => x.type === watch('serviceType') && x.from._id === watch('serviceFrom'));

    return (
        <tr>
            <td>
                <select name="serviceType" ref={register({ required: true })}>
                    {serviceTypes.map((type, idx) => (
                        <option key={type + idx} value={type}>
                            {`${type}`}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select name="serviceFrom" ref={register({ required: true })}>
                    {languagesA.map((service: Service) => (
                        <option key={service.from._id} value={service.from._id}>
                            {`${service.from.name}`}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select name="serviceTo" ref={register({ required: true })} onChange={handleServiceChange}>
                    {languagesB.map((service: Service) => (
                        <option key={service._id} value={service._id}>
                            {`${service.to.name}`}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <TextField
                    inputRef={register({ required: true, pattern: /^(\d*\.)?\d+$/ })}
                    defaultValue={selected ? selected.price : undefined}
                    name="price"
                    error={typeof errors.price !== 'undefined'}
                    helperText={typeof errors.price !== 'undefined' && 'Error'}
                />
            </td>
            <td>
                <IconButton type="button" onClick={handleSubmit(onSubmit)}>
                    <DoneIcon />
                </IconButton>
                <IconButton type="button" onClick={onCancel}>
                    <ClearIcon />
                </IconButton>
            </td>
        </tr>
    );
}
