import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { getLanguagesAction, deleteLanguageAction, setLanguagesModal } from '../../store/actions/languageActions';

import { LanguageActions } from '../../store/types/languageTypes';
import Spinner from '../../components/common/Spinner';
import LanguagesTable from './LanguagesTable';
import { Button, Container } from '@material-ui/core';
import { RootState } from '../../store/reducers';
import LanguagesModal from './LanguagesModal';

function LanguagesContainer({ getLanguages, isLoading, setModal, languages }: LanguagesProps) {
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
                <h1>Languages</h1>
                <div className="text-right margin--bottom">
                    <Button variant="contained" color="primary" onClick={() => setModal(true)}>
                        + Add Language
                    </Button>
                </div>
            </div>
            <LanguagesTable />
            <LanguagesModal />
        </Container>
    );
}

const mapStateToProps = ({ languagesReducer }: RootState) => ({
    languages: languagesReducer.languages,
    isLoading: languagesReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<LanguageActions>) => ({
    getLanguages: () => dispatch(getLanguagesAction()),
    deleteLanguage: (id: string) => dispatch(deleteLanguageAction(id)),
    setModal: (status: boolean) => dispatch(setLanguagesModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesContainer);

type LanguagesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
