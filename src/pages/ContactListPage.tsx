import { memo, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { useAppDispatch, useAppSelector } from '../app/redux/hooks';
import { useGetContactsQuery } from '../app/redux/contacts';
import { useGetGroupsQuery } from '../app/redux/groups';
import { setContactsFilter } from '../app/redux/filters';

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();
  const {
    data: contacts = [],
    isLoading: contactsLoading,
    error: contactsError
  } = useGetContactsQuery();
  const { data: groups = [], isLoading: groupsLoading, error: groupsError } = useGetGroupsQuery();
  const filter = useAppSelector(state => state.filters);
  const loading = contactsLoading || groupsLoading;
  const error = contactsError || groupsError;

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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <div>
        {typeof error === 'string'
          ? error
          : 'message' in error
          ? error.message
          : 'Произошла неизвестная ошибка'}
      </div>
    );
  }

  return (
    <Row className="mb-4">
      <Col xs={12}>
        <FilterForm
          groups={groups}
          onFilter={handleFilter}
          initialName={filter.name}
          initialGroupId={filter.groupId}
        />
      </Col>
      <Col>
        <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4">
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
