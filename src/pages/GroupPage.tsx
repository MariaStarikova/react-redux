import { memo, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ContactCard } from 'src/components/ContactCard';
import { useGetGroupsQuery } from '../app/redux/groups';
import { useGetContactsQuery } from '../app/redux/contacts';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: contacts = [], isLoading: contactsLoading } = useGetContactsQuery();
  const { data: groups = [], isLoading: groupsLoading } = useGetGroupsQuery();

  const group = useMemo(() => {
    return groups.find(group => group.id === groupId);
  }, [groups, groupId]);

  const groupContacts = useMemo(() => {
    if (!group) return [];
    return contacts.filter(contact => group.contactIds.includes(contact.id));
  }, [contacts, group]);

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
