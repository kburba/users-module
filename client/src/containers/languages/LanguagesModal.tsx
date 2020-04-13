import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { LanguageActions, Language } from '../../store/types/languageTypes';
import { setLanguagesModal, addLanguageAction, updateLanguageAction } from '../../store/actions/languageActions';
import { RootState } from '../../store/reducers';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { LanguagesState } from '../../store/reducers/languagesReducer';
import { Clear as ClearIcon, Save as SaveIcon } from '@material-ui/icons';

type FormData = {
    name: string;
};

function LanguagesModal({
    modalIsOpen,
    addLanguage,
    setModal,
    isSubmitting,
    updateLanguage,
    initialValues,
}: LangModalProps) {
    const { register, handleSubmit, errors } = useForm<FormData>({
        defaultValues: {
            name: initialValues?.name || '',
        },
    });

    const handleAdd = (data) => {
        addLanguage(data.name);
    };

    function handleEdit(data) {
        if (!initialValues) {
            return;
        }
        const updatedLanguage = {
            _id: initialValues._id,
            name: data.name,
        };
        updateLanguage(updatedLanguage);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModal(false)}
            className="VertiModal"
            contentLabel="Example Modal"
        >
            <form onSubmit={handleSubmit(initialValues ? handleEdit : handleAdd)}>
                <div>
                    <TextField
                        label="Language name"
                        inputRef={register({ required: true })}
                        error={typeof errors.name !== 'undefined'}
                        name="name"
                        helperText={errors.name && errors.name.message}
                    ></TextField>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Button
                        style={{ marginRight: '15px' }}
                        onClick={() => setModal(false)}
                        color="default"
                        variant="outlined"
                        size="large"
                    >
                        <ClearIcon /> Cancel
                    </Button>
                    <Button variant="contained" type="submit" color="secondary" size="large" disabled={isSubmitting}>
                        <SaveIcon /> Add language
                        {isSubmitting && <CircularProgress size={24} className="absolute-position" />}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

type MapStateToProps = {
    modalIsOpen: LanguagesState['modalIsOpen'];
    isSubmitting: LanguagesState['isSubmitting'];
};

const mapStateToProps = ({ languagesReducer }: RootState): MapStateToProps => ({
    modalIsOpen: languagesReducer.modalIsOpen,
    isSubmitting: languagesReducer.isSubmitting,
});

const mapDispatchToProps = (dispatch: Dispatch<LanguageActions>) => ({
    setModal: (status: boolean) => dispatch(setLanguagesModal(status)),
    addLanguage: (name: string) => dispatch(addLanguageAction(name)),
    updateLanguage: (language: Language) => dispatch(updateLanguageAction(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesModal);

type OtherProps = {
    initialValues?: Language | null;
};

type LangModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & OtherProps;