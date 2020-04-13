import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ServiceActions, ServiceForm } from '../../store/types/serviceTypes';
import { setServicesModal, addServiceAction, updateServiceAction } from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';
import { LanguageActions } from '../../store/types/languageTypes';
import classnames from 'classnames';

function ServicesModal({
    addService,
    initialValues,
    isLoadingLanguages,
    isSubmitting,
    languages,
    modalIsOpen,
    setModal,
    updateService,
}: ServModalProps) {
    const { register, handleSubmit, watch, errors } = useForm<ServiceForm>({
        defaultValues: initialValues._id ? { ...initialValues } : {},
    });

    function handleAdd(data: ServiceForm) {
        addService(data);
    }

    function handleEdit(data: ServiceForm) {
        const updatedService = {
            _id: initialValues._id,
            type: data.type,
            from: data.from,
            to: data.to,
            price: data.price,
        };
        updateService(updatedService);
    }

    const langTo = languages.filter((lang) => lang._id !== watch('from'));

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModal(false)}
            className="VertiModal"
            contentLabel="Example Modal"
        >
            <form onSubmit={handleSubmit(initialValues._id ? handleEdit : handleAdd)}>
                <div>
                    <label htmlFor="type">Name:</label>
                    <select
                        name="type"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': !!errors.type,
                        })}
                        ref={register({ required: 'Required' })}
                        defaultValue={initialValues.type}
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
                        defaultValue={initialValues.from}
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
                        defaultValue={initialValues.to}
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
                        defaultValue={initialValues.price}
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
                <input type="submit" />
                {isSubmitting && 'loading...'}
            </form>
        </Modal>
    );
}

const mapStateToProps = ({ servicesReducer, languagesReducer }: RootState) => ({
    modalIsOpen: servicesReducer.modalIsOpen,
    languages: languagesReducer.languages,
    isSubmitting: servicesReducer.isSubmitting,
    isLoadingLanguages: languagesReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions | LanguageActions>) => ({
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
    addService: (service: ServiceForm) => dispatch(addServiceAction(service)),
    updateService: (service: ServiceForm) => dispatch(updateServiceAction(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesModal);
type ServModalProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & { initialValues: ServiceForm };
