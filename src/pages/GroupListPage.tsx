import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { groupsStore } from '../app/store/groupsStore';

export const GroupListPage = observer(() => {
  const { groups, loading } = groupsStore;

  useEffect(() => {
    groupsStore.get();
  }, []);

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
