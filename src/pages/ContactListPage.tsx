import { useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { contactsStore } from '../app/store/contactsStore';
import { groupsStore } from '../app/store/groupsStore';
import { filtersStore } from '../app/store/filtersStore';

export const ContactListPage = observer(() => {
  const { contacts, loading: contactsLoading, error: contactsError } = contactsStore;
  const { groups, loading: groupsLoading, error: groupsError } = groupsStore;
  const { name, groupId } = filtersStore;
  const loading = contactsLoading || groupsLoading;
  const error = contactsError || groupsError;

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    if (name && name.trim()) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (groupId && groupId.trim()) {
      const selectedGroup = groups.find(group => group.id === groupId);
      if (selectedGroup) {
        filtered = filtered.filter(contact => selectedGroup.contactIds.includes(contact.id));
      }
    }

    return filtered;
  }, [contacts, name, groupId, groups]);

  const handleFilter = (name: string, groupId: string) => {
    filtersStore.setContactsFilter({ name, groupId });
  };

  useEffect(() => {
    contactsStore.get();
    groupsStore.get();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{typeof error === 'string' ? error : 'Произошла неизвестная ошибка'}</div>;
  }

  return (
    <Row className="mb-4">
      <Col xs={12}>
        <FilterForm
          groups={groups}
          onFilter={handleFilter}
          initialName={name}
          initialGroupId={groupId}
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
            {name && <p>Имя: "{name}"</p>}
            {groupId && <p>Группа: "{groups.find(g => g.id === groupId)?.name}"</p>}
          </div>
        )}
      </Col>
    </Row>
  );
});
