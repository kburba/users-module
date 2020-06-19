import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../../components/table/Table';
import { ServiceActions, Service } from '../../store/types/serviceTypes';
import {
  deleteServiceAction,
  setServicesEditingId,
  setServicesModal,
} from '../../store/actions/serviceActions';
import { RootState } from '../../store/reducers';
import { VariousState } from '../../store/reducers/variousReducer';
import { setLoadingCell } from '../../store/actions/variousActions';
import { VariousActions } from '../../store/types/variousTypes';
import { serviceColumns } from '../../components/table/columns';

export const servicesColumns: TableColumn[] = [
  serviceColumns.type,
  serviceColumns.from,
  serviceColumns.to,
  serviceColumns.price,
];

function ServicesTable({
  deleteService,
  isLoading,
  services,
  setModal,
  setEditingId,
  setLoadingCell,
  isLoadingCell,
}: ServicesTableProps) {
  const tableActions: TableAction[] = [
    {
      type: 'edit',
      action: (service: Service) => {
        setEditingId(service._id);
        setModal(true);
      },
    },
    {
      type: 'delete',
      action: (service: Service) => {
        deleteService(service._id);
        setLoadingCell({ column: 'actions', row: service._id });
      },
    },
  ];

  return (
    <Table
      data={services}
      columns={servicesColumns}
      uniqueKey="_id"
      actions={tableActions}
      isLoading={isLoading}
      isLoadingCell={isLoadingCell}
    />
  );
}

const mapStateToProps = ({ servicesReducer, variousReducer }: RootState) => ({
  services: servicesReducer.services,
  isLoading: servicesReducer.isLoading,
  modalIsOpen: servicesReducer.modalIsOpen,
  isLoadingCell: variousReducer.isLoadingCell,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ServiceActions | VariousActions>
) => ({
  deleteService: (id: string) => dispatch(deleteServiceAction(id)),
  setEditingId: (id: string) => dispatch(setServicesEditingId(id)),
  setModal: (status: boolean) => dispatch(setServicesModal(status)),
  setLoadingCell: (cell: VariousState['isLoadingCell']) =>
    dispatch(setLoadingCell(cell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);
type ServicesTableProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
