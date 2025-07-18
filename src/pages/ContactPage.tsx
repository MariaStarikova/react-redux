import { FC, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { useGetContactsQuery } from '../app/redux/contacts';

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const { data: contacts = [], isLoading: loading } = useGetContactsQuery();
  const contact = useMemo(() => {
    return contacts.find(contact => contact.id === contactId);
  }, [contacts, contactId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!contact) {
    return <Navigate to="/contact" replace />;
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        <ContactCard contact={contact} />
      </Col>
    </Row>
  );
};
