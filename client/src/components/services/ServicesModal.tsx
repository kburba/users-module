import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ServiceActions, UpdatedService, NewService, Service } from '../../store/types/serviceTypes';
import { setServicesModal, addServiceAction, updateServiceAction } from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';
import { LanguageActions } from '../../store/types/languageTypes';
import { getLanguagesAction } from '../../store/actions/languageActions';

type FormData = {
    type: 'PROOFREADING' | 'TRANSLATION' | 'EDITING';
    from: string;
    to: string;
    price: string;
};

function ServicesModal({
    modalIsOpen,
    addService,
    setModal,
    isSubmitting,
    updateService,
    languages,
    getLanguages,
    isLoadingLanguages,
    initialValues,
}: ServModalProps) {
    const { register, handleSubmit, watch } = useForm<FormData>();

    useEffect(() => {
        if (modalIsOpen && languages.length < 1) {
            getLanguages();
        }
    }, [languages.length, getLanguages, modalIsOpen]);

    function handleAdd(data) {
        addService(data);
    }

    function handleEdit(data) {
        if (!initialValues) {
            return;
        }
        const updatedService = {
            _id: initialValues._id,
            type: data.type,
            from: data.from,
            to: data.to,
            price: data.price,
        };
        updateService(updatedService);
    }

    const langTo = languages.filter(lang => lang._id !== watch('from'));

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModal(false)}
            className="VertiModal"
            contentLabel="Example Modal"
        >
            <form onSubmit={handleSubmit(initialValues ? handleEdit : handleAdd)}>
                <div>
                    <label htmlFor="type">Name:</label>
                    <select name="type" ref={register} defaultValue={initialValues ? initialValues.type : ''}>
                        <option value="proofreading">Proofreading</option>
                        <option value="editing">Editing</option>
                        <option value="translation">Translation</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="from">From:</label>
                    <select name="from" placeholder={isLoadingLanguages ? 'Loading...' : 'Select language'} ref={register} defaultValue={initialValues ? initialValues.from._id : ''}>
                        {languages.map(lang => (
                            <option key={lang._id} value={lang._id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="to">To:</label>
                    <select name="to" placeholder={isLoadingLanguages ? 'Loading...' : 'Select language'}  ref={register} defaultValue={initialValues ? initialValues.to._id : ''}>
                        {langTo.map(lang => (
                            <option key={lang._id} value={lang._id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input name="price" defaultValue={initialValues ? initialValues.price : ''} ref={register} />
                </div>
                <input type="submit" />
                {isSubmitting && 'loading...'}
            </form>
        </Modal>
    );
}

const mapStateToProps = ({servicesReducer, languagesReducer}: RootState) => ({
    modalIsOpen: servicesReducer.modalIsOpen,
    languages: languagesReducer.languages,
    isSubmitting: servicesReducer.isSubmitting,
    isLoadingLanguages: languagesReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<ServiceActions | LanguageActions>) => ({
    setModal: (status: boolean) => dispatch(setServicesModal(status)),
    getLanguages: () => dispatch(getLanguagesAction()),
    addService: (service: NewService) => dispatch(addServiceAction(service)),
    updateService: (service: UpdatedService) => dispatch(updateServiceAction(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesModal);
type ServModalProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & { initialValues: Service | null };
