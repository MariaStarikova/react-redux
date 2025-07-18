import { memo, useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from '../app/redux/hooks';
import { fetchContacts } from '../app/redux/actions/contactsActions';
import { fetchGroups } from '../app/redux/actions/groupsActions';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const contactsAll = useAppSelector(state => state.contacts.items);
  const groups = useAppSelector(state => state.groups.items);
  const contactsLoading = useAppSelector(state => state.contacts.loading);
  const groupsLoading = useAppSelector(state => state.groups.loading);

  const group = useMemo(() => {
    return groups.find(group => group.id === groupId);
  }, [groups, groupId]);

  const contacts = useMemo(() => {
    if (!group) return [];
    return contactsAll.filter(contact => group.contactIds.includes(contact.id));
  }, [contactsAll, group]);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchGroups());
  }, [dispatch]);

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
            {contacts.map(contact => (
              <Col key={contact.id}>
                <ContactCard contact={contact} withLink />
              </Col>
            ))}
          </Row>
          {contacts.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h4>В группе нет контактов</h4>
            </div>
          )}
        </Col>
      </Row>
    </Row>
  );
});
