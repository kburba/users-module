import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ServiceActions, ServiceForm } from '../../store/types/serviceTypes';
import {
  setServicesModal,
  addServiceAction,
  updateServiceAction,
} from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';
import { LanguageActions } from '../../store/types/languageTypes';
import TextField from '../../components/common/TextField';
import SelectField from '../../components/common/SelectField';

export function ServicesModal({
  addService,
  isEditingId,
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

  const existingLangsTo = services
    .filter((x) => x.from._id === watch('from') && x.type === watch('type'))
    .map((x) => x.to._id);
  const langTo = languages
    .filter(
      (lang) =>
        lang._id !== watch('from') && existingLangsTo.indexOf(lang._id) === -1
    )
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    })
    .map((lang) => ({
      text: lang.name,
      value: lang._id,
    }));

  const languagesDropdown = languages.map((lang) => ({
    text: lang.name,
    value: lang._id,
  }));

  const serviceTypesDropdown = ['Proofreading', 'Editing', 'Translation'].map(
    (service) => ({
      text: service,
      value: service.toLowerCase(),
    })
  );

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModal(false)}
      className="VertiModal"
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit(service?._id ? handleEdit : handleAdd)}>
        <SelectField
          defaultValue={service?.type || 'translation'}
          name="type"
          label="Type"
          inputRef={register({ required: 'Required' })}
          options={serviceTypesDropdown}
        />
        <SelectField
          defaultValue={service?.from._id}
          name="from"
          label="From"
          inputRef={register}
          options={languagesDropdown}
        />
        <SelectField
          defaultValue={service?.to._id}
          name="to"
          label="To"
          inputRef={register}
          options={langTo}
        />
        <TextField
          label="Price"
          placeholder="Enter price"
          inputRef={register({
            required: 'Please add price',
            pattern: { value: /^(\d*\.)?\d+$/, message: 'Must be number' },
          })}
          name="price"
          defaultValue={service?.price}
          error={errors.price?.message}
        />
        <div className="margin--top text-right">
          <button
            type="button"
            onClick={() => setModal(false)}
            style={{ marginRight: '15px' }}
          >
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
  isSubmitting: servicesReducer.isSubmitting,
  languages: languagesReducer.languages,
  modalIsOpen: servicesReducer.modalIsOpen,
  services: servicesReducer.services,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ServiceActions | LanguageActions>
) => ({
  setModal: (status: boolean) => dispatch(setServicesModal(status)),
  addService: (service: ServiceForm) => dispatch(addServiceAction(service)),
  updateService: (service: ServiceForm) =>
    dispatch(updateServiceAction(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesModal);
type ServModalProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
