import './Examples.scss';
import React, {useState, useMemo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import routes from '../../../router/routes';
import Page from '../../layout/page/Page';
import Actions from '../../layout/actions/Actions';
import {ListItem} from '../../../listItem';
import Input from '../../elements/input/Input';
import axios from 'axios';

const Examples = () => {

    const navigate = useNavigate();
    const [examplesList, setExamplesList] = useState<object[]>([]);
    const [list, setList] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [action, setAction] = useState<string>('delete');
    const [checked, setChecked] = useState<ListItem[]>([]);

    const loadTags = () => {

        setLoading(true);

        axios.get('https://61f9ae2569307000176f73b5.mockapi.io/examples')
        .then(res => {
            console.log('res', res);
            setExamplesList(res.data);
        })
        .catch(error => {
            //setShowModal(true);
        })
        .finally(() => {
            setLoading(false);
        });

    }

    useMemo(() => {
        loadTags();
    }, []);

    useEffect(() => {
        setList(examplesList.map(example => ({
            checked: false,
            item: example
        })))
    }, [examplesList])

    const handleCreate = () => {
        navigate(routes.examples.create.path)
    }

    const deleteItem = (id: string) => {
        // delete api call
    }

    const editItem = (event: any, item: any) => {
        if (item.username) navigate("/examples/" + item.username);
    }

    const handleDelete = () => {

        if (window.confirm("Sure?")) {

            checked.forEach(listItem => {

                if (listItem.checked) {
                    const tag = listItem.item as any;
                    deleteItem(tag._id);
                }

            });

        }

    }

    const handleCheck = (e: any, listItem: ListItem) => {

        listItem.checked = e.target.checked;

        let updatedList = [...checked];

        if (e.target.checked) {
            updatedList = [...checked, listItem];
        } else {
            updatedList.splice(checked.indexOf(listItem), 1);
        }

        setChecked(updatedList);

    }

    const handleAction = (e: any) => {
        if (action == 'delete') {
            handleDelete();
        }
        setChecked([]);
    }

    const stopPropagation = (e: any) => {
        e.stopPropagation();
        console.log('stopped propagation')
    };

    return (
        <article className="example-list">
            <Page
                heading="Examples"
                buttonType="is-info"
                headingButton="Create example"
                className="list"
                handleHeadingButton={handleCreate}
                busy={loading}
            >
                <Actions>
                    <Input
                        type="select"
                        placeholder="Actions"
                        className="actions-dropdown"
                        name="actions"
                        options={['DELETE']}
                        value={'DELETE'}
                        capitalize={true}
                        onChange={val => setAction(val as string)}
                    />
                    <button className="button" onClick={handleAction}>Apply</button>
                </Actions>

                <div className={'table-container' + (loading ? ' hidden' : '')}>
                    <table className="table is-hoverable is-striped is-narrow is-fullwidth">
                        <thead>
                        <tr>
                            <th />
                            <th>id</th>
                            <th>description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list && list.map((listItem, index) => {

                            const item = listItem.item as any;
                            const itemId = item.username.replace(/\s+/g, '-');

                            return <tr key={index} className={'_' + itemId} onClick={e => editItem(e, item)}>
                                <td className="first-column" onClick={stopPropagation}>
                                    <input
                                        type="checkbox"
                                        checked={listItem.checked}
                                        onChange={e => handleCheck(e, listItem)}
                                    />
                                </td>
                                <td className='unique-identifier-cell'>{item.username}</td>
                                <td>{item.text}</td>
                            </tr>;
                        })}
                        </tbody>
                    </table>
                </div>
            </Page>
        </article>
    );
};

export default Examples;
