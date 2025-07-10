import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppDispatch, useAppSelector } from '../apps/redux/hooks';
import { fetchGroups } from '../apps/redux/actions/groupsActions';

export const GroupListPage = memo(() => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(state => state.groups.items);
  const loading = useAppSelector(state => state.groups.loading);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Row xxl={4}>
      {groups.map(groupContacts => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
      {groups.length === 0 && (
        <div className="text-center text-muted mt-5">
          <h4>Группы не найдены</h4>
        </div>
      )}
    </Row>
  );
});
