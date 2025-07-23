import { useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Navigate, useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ContactCard } from 'src/components/ContactCard';
import { groupsStore } from '../app/store/groupsStore';
import { contactsStore } from '../app/store/contactsStore';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { contacts, loading: contactsLoading } = contactsStore;
  const { groups, loading: groupsLoading } = groupsStore;

  const group = useMemo(() => {
    return groups.find(group => group.id === groupId);
  }, [groups, groupId]);

  const groupContacts = useMemo(() => {
    if (!group) return [];
    return contacts.filter(contact => group.contactIds.includes(contact.id));
  }, [contacts, group]);

  useEffect(() => {
    groupsStore.get();
    contactsStore.get();
  }, []);

  if (contactsLoading || groupsLoading) {
    return <div>Загрузка...</div>;
  }

  if (!group) {
    return <Navigate to="/groups" replace />;
  }

  return (
    <Row className="g-4">
      <Row>
        <Col xxl={12}>
          <Row xxl={3}>
            <Col className="mx-auto">
              <GroupContactsCard groupContacts={group} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row xxl={4} className="g-4">
            {groupContacts.map(contact => (
              <Col key={contact.id}>
                <ContactCard contact={contact} withLink />
              </Col>
            ))}
          </Row>
          {groupContacts.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h4>В группе нет контактов</h4>
            </div>
          )}
        </Col>
      </Row>
    </Row>
  );
});
