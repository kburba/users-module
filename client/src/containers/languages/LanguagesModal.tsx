import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress } from '@material-ui/core';
import { Clear as ClearIcon, Save as SaveIcon } from '@material-ui/icons';
import {
  LanguageActions,
  Language,
  NewLanguage,
} from '../../store/types/languageTypes';
import {
  setLanguagesModal,
  addLanguageAction,
  updateLanguageAction,
} from '../../store/actions/languageActions';
import { RootState } from '../../store/reducers';
import { LanguagesState } from '../../store/reducers/languagesReducer';
import TextField from '../../components/common/TextField';

type FormData = {
  code: string;
  name: string;
  nativeName: string;
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
      code: initialValues?.code || '',
      name: initialValues?.name || '',
      nativeName: initialValues?.nativeName || '',
    },
  });

  const handleAdd = (data: FormData) => {
    const newLanguage = {
      code: data.code,
      name: data.name,
      nativeName: data.nativeName,
    };
    addLanguage(newLanguage);
  };

  function handleEdit(data: FormData) {
    if (!initialValues) {
      return;
    }
    const updatedLanguage = {
      _id: initialValues._id,
      code: data.code,
      name: data.name,
      nativeName: data.nativeName,
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
        <TextField
          label="Code"
          placeholder="Enter code"
          inputRef={register({
            required: 'Please add code',
            maxLength: {
              value: 2,
              message: 'Should not exceed 2 characters',
            },
          })}
          name="code"
          defaultValue={initialValues?.code}
          error={errors.code?.message}
          autofocus
        />
        <TextField
          label="Language Name"
          placeholder="Enter name"
          inputRef={register({ required: 'Please add name' })}
          name="name"
          defaultValue={initialValues?.name}
          error={errors.name?.message}
          autofocus
        />
        <TextField
          label="Native Name"
          placeholder="Enter native name"
          inputRef={register({ required: 'Please add native name' })}
          name="nativeName"
          defaultValue={initialValues?.nativeName}
          error={errors.nativeName?.message}
          autofocus
        />
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
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            size="large"
            disabled={isSubmitting}
          >
            <SaveIcon /> Add language
            {isSubmitting && (
              <CircularProgress size={24} className="absolute-position" />
            )}
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
  addLanguage: (newLanguage: NewLanguage) =>
    dispatch(addLanguageAction(newLanguage)),
  updateLanguage: (language: Language) =>
    dispatch(updateLanguageAction(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesModal);

type OtherProps = {
  initialValues?: Language | null;
};

type LangModalProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OtherProps;
