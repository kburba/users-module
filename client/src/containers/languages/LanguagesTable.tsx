import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/table/Table';
import { Language, LanguageActions } from '../../store/types/languageTypes';
import {
  deleteLanguageAction,
  setLanguagesModal,
  updateLanguageAction,
} from '../../store/actions/languageActions';
import { RootState } from '../../store/reducers';
import { languagesColumns } from '../../components/table/columns';
const TableColumns = [
  languagesColumns.code,
  languagesColumns.name,
  languagesColumns.nativeName,
];

function LanguagesTable({
  deleteLanguage,
  isLoading,
  languages,
}: LangTableProps) {
  return (
    <Table<Language>
      data={languages}
      columns={TableColumns}
      uniqueKey="_id"
      isLoading={isLoading}
    />
  );
}

const mapStateToProps = ({ languagesReducer }: RootState) => ({
  languages: languagesReducer.languages,
  isLoading: languagesReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<LanguageActions>) => ({
  deleteLanguage: (id: string) => dispatch(deleteLanguageAction(id)),
  setModal: (status: boolean) => dispatch(setLanguagesModal(status)),
  updateLanguage: (language: Language) =>
    dispatch(updateLanguageAction(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesTable);
type LangTableProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
