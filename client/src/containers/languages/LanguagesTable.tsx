import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../../components/table/Table';
import { Language, LanguageActions } from '../../store/types/languageTypes';
import {
    deleteLanguageAction,
    setLanguagesModal,
    addLanguageAction,
    updateLanguageAction,
} from '../../store/actions/languageActions';
import { RootState } from '../../store/reducers';

const languagesColumns: TableColumn[] = [
    {
        key: 'createdAt',
        title: 'Created',
        valueType: 'timestamp',
    },
    {
        key: 'name',
        title: 'Name',
        isEditable: true,
        editType: 'input',
    },
];

type NewLanguage = {
    name: string;
};

function LanguagesTable({ deleteLanguage, isLoading, languages, addLanguage, updateLanguage }: LangTableProps) {
    const [editingItem, setEditingItem] = useState<string | undefined>(undefined);
    const tableActions: TableAction[] = [
        {
            type: 'edit',
            action: (language: Language) => {
                setEditingItem(language._id);
            },
        },
        {
            type: 'delete',
            action: (language: Language) => deleteLanguage(language._id),
        },
    ];

    function handleEditLanguage(language: Language, newValues: NewLanguage) {
        updateLanguage({ _id: language._id, name: newValues.name });
    }

    return (
        <Table<Language>
            data={languages}
            columns={languagesColumns}
            uniqueKey="_id"
            actions={tableActions}
            isLoading={isLoading}
            editingRow={editingItem}
            onSubmit={handleEditLanguage}
            onCancel={() => setEditingItem(undefined)}
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
    addLanguage: (name: string) => dispatch(addLanguageAction(name)),
    updateLanguage: (language: Language) => dispatch(updateLanguageAction(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesTable);
type LangTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
