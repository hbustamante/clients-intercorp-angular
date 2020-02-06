const API_DOMAIN = 'https://clientes-intercorp.firebaseio.com/'; 

export const environment = {
  production: false,
  addresses: {
    clients: {
      postClient: `${API_DOMAIN}/clients.json`,
      putClient: `${API_DOMAIN}/clients/`,
      deleteClient: `${API_DOMAIN}/clients/`,
      getClient: `${API_DOMAIN}/clients/`,
      getClients: `${API_DOMAIN}/clients.json`
    }
  },
};

