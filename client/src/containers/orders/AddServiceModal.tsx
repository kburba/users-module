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
}: {
    services: Service[];
    isOpen: boolean;
    closeModal: () => void;
    addNewService: (service: Service) => void;
}) {
    const { register, handleSubmit, watch, errors, setValue } = useForm<ServiceForm>();
    const serviceTypes = services.map((x) => x.type).filter(onlyUnique);
    const servicesFrom = services.filter((x) => x.type === (watch('type') || serviceTypes[0])).filter(onlyUnique);
    const servicesTo = services.filter((x) => x.from._id === (watch('from') || servicesFrom[0]._id)).filter(onlyUnique);
    console.log('servicesFrom', servicesFrom);
    function onSubmit(data: ServiceForm) {
        const selectedService = services.find((x) => x._id === data.to);
        console.log('selectedService', selectedService);
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

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className="VertiModal" contentLabel="Add Service Modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="type">Name:</label>
                    <select
                        name="type"
                        ref={register({ required: 'Required' })}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        defaultValue={serviceTypes[0]}
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

                        // defaultValue={servicesFrom && servicesFrom[0].from._id}
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
                        // defaultValue={servicesTo && servicesTo[0]._id}
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
                        ref={register({
                            required: 'Required',
                            pattern: { value: /^(\d*\.)?\d+$/, message: 'Must be number' },
                        })}
                    />
                </div>
                <input type="submit" />
            </form>
        </Modal>
    );
}
