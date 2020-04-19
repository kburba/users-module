import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ServiceActions, ServiceForm } from '../../store/types/serviceTypes';
import { setServicesModal, addServiceAction, updateServiceAction } from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';
import { LanguageActions } from '../../store/types/languageTypes';
import classnames from 'classnames';

export function ServicesModal({
    addService,
    isEditingId,
    isLoadingLanguages,
    isSubmitting,
    languages,
    modalIsOpen,
    services,
    setModal,
    updateService,
}: ServModalProps) {
    const service = services.find((x) => x._id === isEditingId);
    const { register, handleSubmit, watch, errors } = useForm<ServiceForm>();

    function handleAdd(data: ServiceForm) {
        addService(data);
    }

    function handleEdit(data: ServiceForm) {
        const updatedService = {
            _id: service?._id,
            type: data.type,
            from: data.from,
            to: data.to,
            price: data.price,
        };
        updateService(updatedService);
    }

    const existingLangsTo = services.filter((x) => x.from._id === watch('from')).map((x) => x.to._id);
    const langTo = languages
        .filter((lang) => lang._id !== watch('from') && existingLangsTo.indexOf(lang._id) === -1)
        .sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            }
            return 0;
        });

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModal(false)}
            className="VertiModal"
            contentLabel="Example Modal"
        >
            <form onSubmit={handleSubmit(service?._id ? handleEdit : handleAdd)}>
                <div>
                    <label htmlFor="type">Name:</label>
                    <select
                        name="type"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': !!errors.type,
                        })}
                        ref={register({ required: 'Required' })}
                        defaultValue={service?.type}
                    >
                        <option value="proofreading">Proofreading</option>
                        <option value="editing">Editing</option>
                        <option value="translation">Translation</option>
                        ))}
                    </select>
                    {!!errors.type && <div className="invalid-feedback">{errors.type?.message}</div>}
                </div>
                <div>
                    <label htmlFor="from">From:</label>
                    <select
                        name="from"
                        placeholder={isLoadingLanguages ? 'Loading...' : 'Select language'}
                        ref={register}
                        defaultValue={service?.from._id}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': !!errors.from,
                        })}
                    >
                        {languages.map((lang) => (
                            <option key={lang._id} value={lang._id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="to">To:</label>
                    <select
                        name="to"
                        placeholder={isLoadingLanguages ? 'Loading...' : 'Select language'}
                        ref={register}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': !!errors.to,
                        })}
                        defaultValue={service?.to._id}
                    >
                        {langTo.map((lang) => (
                            <option key={lang._id} value={lang._id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        name="price"
                        placeholder="Price"
                        defaultValue={service?.price}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': !!errors.price,
                        })}
                        ref={register({
                            required: 'Required',
                            pattern: { value: /^(\d*\.)?\d+$/, message: 'Must be number' },
                        })}
                    />
                    {!!errors.price && <div className="invalid-feedback">{errors.price?.message}</div>}
                </div>
                <div className="margin--top text-right">
                    <button type="button" onClick={() => setModal(false)} style={{ marginRight: '15px' }}>
                        Cancel
                    </button>
                    <button type="submit">{isSubmitting ? 'loading...' : 'Save'}</button>
                </div>
            </form>
        </Modal>
    );
}

const mapStateToProps = ({ servicesReducer, languagesReducer }: RootState) => ({
    isEditingId: servicesReducer.isEditingId,
    isLoadingLanguages: languagesReducer.isLoading,
    isSubmitting: servicesReducer.isSubmitting,
    languages: languagesReducer.languages,
    modalIsOpen: servicesReducer.modalIsOpen,
    services: servicesReducer.services,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions | LanguageActions>) => ({
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
    addService: (service: ServiceForm) => dispatch(addServiceAction(service)),
    updateService: (service: ServiceForm) => dispatch(updateServiceAction(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesModal);
type ServModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
