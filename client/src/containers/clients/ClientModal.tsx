import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { RootState } from '../../store/reducers';
import {
  ClientsActions,
  ClientForm,
  Client,
} from '../../store/types/clientTypes';
import {
  setClientsModal,
  addClientAction,
  updateClientAction,
} from '../../store/actions/clientActions';
import TextField from '../../components/common/TextField';

export function ClientModal({
  updateClient,
  modalIsOpen,
  setModal,
  clients,
  isEditingId,
  isSubmitting,
  addClient,
}: ReduxProps) {
  const client = clients.find((x) => x._id === isEditingId);
  const { register, handleSubmit, errors } = useForm<ClientForm>();

  function handleAdd(data: ClientForm) {
    addClient(data);
  }

  function handleEdit(data: ClientForm) {
    if (client) {
      const updatedClient = {
        // _id: client._id,
        ...client,
        name: data.name,
      };
      updateClient(updatedClient);
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModal(false)}
      className="VertiModal"
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit(client ? handleEdit : handleAdd)}>
        <TextField
          label="Client name"
          placeholder="Enter client name"
          inputRef={register({ required: 'Please add client name' })}
          name="name"
          defaultValue={client?.name}
          error={errors.name?.message}
          autofocus
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

const mapStateToProps = ({ clientsReducer }: RootState) => ({
  modalIsOpen: clientsReducer.modalIsOpen,
  clients: clientsReducer.clients,
  isEditingId: clientsReducer.isEditingId,
  isSubmitting: clientsReducer.isSubmitting,
});

const mapDispatchToProps = (dispatch: Dispatch<ClientsActions>) => ({
  setModal: (status: boolean) => dispatch(setClientsModal(status)),
  addClient: (newClient: ClientForm) => dispatch(addClientAction(newClient)),
  updateClient: (updatedClient: Client) =>
    dispatch(updateClientAction(updatedClient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientModal);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
