import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useGetGroupsQuery } from '../app/redux/groups';

export const GroupListPage = memo(() => {
  const { data: groups = [], isLoading: loading } = useGetGroupsQuery();

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
