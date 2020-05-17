import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Button, Container } from '@material-ui/core';
import {
  getServicesAction,
  deleteServiceAction,
  setServicesModal,
} from '../../store/actions/serviceActions';
import { ServiceActions } from '../../store/types/serviceTypes';
import Spinner from '../../components/common/Spinner';
import ServicesTable from './ServicesTable';
import { RootState } from '../../store/reducers';
import ServicesModal from './ServicesModal';
import { getLanguagesAction } from '../../store/actions/languageActions';
import { LanguageActions } from '../../store/types/languageTypes';

function ServicesContainer({
  getServices,
  isLoading,
  setModal,
  getLanguages,
}: ServicesProps) {
  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  return (
    <Container>
      <div className="titleContainer">
        <h1>Services</h1>
        <div className="text-right margin--bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModal(true)}
          >
            + Add Service
          </Button>
        </div>
      </div>
      <ServicesTable />
      <ServicesModal />
    </Container>
  );
}

const mapStateToProps = ({ servicesReducer }: RootState) => ({
  isLoading: servicesReducer.isLoading,
  services: servicesReducer.services,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ServiceActions | LanguageActions>
) => ({
  getServices: () => dispatch(getServicesAction()),
  deleteService: (id: string) => dispatch(deleteServiceAction(id)),
  setModal: (status: boolean) => dispatch(setServicesModal(status)),
  getLanguages: () => dispatch(getLanguagesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);

type ServicesProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
