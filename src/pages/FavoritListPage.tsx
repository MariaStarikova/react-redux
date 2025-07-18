import React, { memo, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from '../app/redux/hooks';
import { useGetContactsQuery } from '../app/redux/contacts';

export const FavoritListPage = memo(() => {
  const { data: allContacts = [], isLoading: loading } = useGetContactsQuery();
  const favoriteContactIds = useAppSelector(state => state.favorites.contactIds);

  const favoriteContacts = useMemo(() => {
    return allContacts.filter(contact => favoriteContactIds.includes(contact.id));
  }, [allContacts, favoriteContactIds]);

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
