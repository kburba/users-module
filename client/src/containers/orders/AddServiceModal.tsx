import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ServiceForm, Service } from '../../store/types/serviceTypes';
import { onlyUnique } from '../../utils/utils';

export default function AddServiceModal({
    services,
    isOpen,
    closeModal,
    addNewService,
    isEditingId,
}: {
    services: Service[];
    isOpen: boolean;
    closeModal: () => void;
    addNewService: (service: Service) => void;
    isEditingId: string;
}) {
    const { register, handleSubmit, watch, errors, setValue } = useForm<ServiceForm>();
    const serviceTypes = services.map((x) => x.type).filter(onlyUnique);
    const servicesFrom = services.filter((x) => x.type === (watch('type') || serviceTypes[0])).filter(onlyUnique);
    const servicesTo = services.filter((x) => x.from._id === (watch('from') || servicesFrom[0]._id)).filter(onlyUnique);
    function onSubmit(data: ServiceForm) {
        const selectedService = services.find((x) => x._id === data.to);
        if (selectedService) {
            addNewService(selectedService);
        }
    }

    function handleServiceChange(id: string) {
        const service = services.find((service) => service._id === id);
        if (service) {
            setValue('price', service.price.toString());
        }
    }
    function handleFromChange(id: string) {
        setValue('to', '');
        setValue('price', '');
    }
    function handleTypeChange(type: string) {
        setValue('to', '');
        setValue('price', '');
        setValue('from', '');
    }

    const editService = services.find((x) => x._id === isEditingId);
    console.log('editSerice', editService);
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className="VertiModal" contentLabel="Add Service Modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="type">Name:</label>
                    <select
                        name="type"
                        ref={register({ required: 'Required' })}
                        placeholder="Select type"
                        onChange={(e) => handleTypeChange(e.target.value)}
                        // defaultValue={serviceTypes[0]}
                        defaultValue={editService?.type}
                    >
                        {serviceTypes &&
                            serviceTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                    </select>
                    {!!errors.type && <div>{errors.type}</div>}
                </div>
                <div>
                    <label htmlFor="from">From:</label>
                    <select
                        name="from"
                        placeholder={'Select language (' + servicesFrom.length + ')'}
                        ref={register}
                        onChange={(e) => handleFromChange(e.target.value)}
                        defaultValue={editService?.from._id}
                    >
                        {servicesFrom &&
                            servicesFrom.map((service) => (
                                <option key={service._id} value={service.from._id}>
                                    {service.from.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="to">To:</label>
                    <select
                        name="to"
                        placeholder={'Select language (' + servicesTo.length + ')'}
                        ref={register}
                        defaultValue={editService?.to._id}
                        onChange={(e) => handleServiceChange(e.target.value)}
                    >
                        {servicesTo &&
                            servicesTo.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.to.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        name="price"
                        placeholder="Price"
                        disabled={true}
                        defaultValue={editService?.price}
                        ref={register({
                            required: 'Required',
                            pattern: { value: /^(\d*\.)?\d+$/, message: 'Must be number' },
                        })}
                    />
                </div>
                <div className="margin--top text-right">
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </Modal>
    );
}
