import { memo, useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { useAppDispatch, useAppSelector } from '../apps/redux/hooks';
import { fetchContacts, setContactsFilter } from '../apps/redux/actions/contactsActions';
import { fetchGroups } from '../apps/redux/actions/groupsActions';

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.items);
  const groups = useAppSelector(state => state.groups.items);
  const loading = useAppSelector(state => state.contacts.loading);
  const groupsLoading = useAppSelector(state => state.groups.loading);
  const error = useAppSelector(state => state.contacts.error);
  const filter = useAppSelector(state => state.contacts.filter);

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    if (filter.name && filter.name.trim()) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.groupId && filter.groupId.trim()) {
      const selectedGroup = groups.find(group => group.id === filter.groupId);
      if (selectedGroup) {
        filtered = filtered.filter(contact => selectedGroup.contactIds.includes(contact.id));
      }
    }

    return filtered;
  }, [contacts, filter.name, filter.groupId, groups]);

  const handleFilter = (name: string, groupId: string) => {
    dispatch(setContactsFilter({ name, groupId }));
  };

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading || groupsLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groups={groups}
          onFilter={handleFilter}
          initialName={filter.name}
          initialGroupId={filter.groupId}
        />
      </Col>
      <Col>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredContacts.map(contact => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
        {filteredContacts.length === 0 && contacts.length > 0 && (
          <div className="text-center text-muted mt-5">
            <h4>Контакты не найдены</h4>
            <p>Попробуйте изменить параметры поиска</p>
            <p>Активные фильтры:</p>
            {filter.name && <p>Имя: "{filter.name}"</p>}
            {filter.groupId && <p>Группа: "{groups.find(g => g.id === filter.groupId)?.name}"</p>}
          </div>
        )}
      </Col>
    </Row>
  );
});
