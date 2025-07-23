import './App.scss';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/layouts/Layout';
import { ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage } from 'src/pages';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ContactListPage />} />
              <Route path="contact">
                <Route index element={<ContactListPage />} />
                <Route path=":contactId" element={<ContactPage />} />
              </Route>
              <Route path="groups">
                <Route index element={<GroupListPage />} />
                <Route path=":groupId" element={<GroupPage />} />
              </Route>
              <Route path="favorit" element={<FavoritListPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
