import { ContactDto, GroupContactsDto } from './types';

class Api {
  async getContacts(): Promise<ContactDto[]> {
    const data = await this.fetch(
      'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json'
    );

    const response = await data.json();
    return response;
  }

  async getGroups(): Promise<GroupContactsDto[]> {
    const data = await this.fetch(
      'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json'
    );

    const response = await data.json();
    return response;
  }

  async fetch(url: string, config?: RequestInit) {
    return fetch(url, {
      ...config,
      headers: {
        ...config?.headers
      }
    });
  }
}

export const api = new Api();
