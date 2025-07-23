import { useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ContactCard } from 'src/components/ContactCard';
import { favoritesStore } from '../app/store/favoritesStore';
import { contactsStore } from '../app/store/contactsStore';

export const FavoritListPage = observer(() => {
  const { contacts: allContacts, loading } = contactsStore;
  const favoriteContactIds = favoritesStore.contactIds;

  const favoriteContacts = useMemo(() => {
    return allContacts.filter(contact => favoriteContactIds.includes(contact.id));
  }, [allContacts, favoriteContactIds]);

  useEffect(() => {
    if (allContacts.length === 0) {
      contactsStore.get();
    }
  }, [allContacts.length]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map(contact => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
