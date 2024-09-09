import backendUrl from "../config/bcakendUrl";

export const fetchUserDetails = async () => {
  
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
  
    const response = await fetch(`${backendUrl}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
  
    return response.json();
  };
  
  export const updateAddress = async (address) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
  
    const response = await fetch(`${backendUrl}/api/users/update-address`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update address');
    }
  
    return response.json();
  };

  export const updateUserInfo = async (userInfo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${backendUrl}/api/users/update-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assuming you're storing JWT in localStorage
        },
        body: JSON.stringify(userInfo),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user information');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  