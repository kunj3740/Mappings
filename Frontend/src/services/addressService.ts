import axios from 'axios';
import { AddressInput, Address } from '../types/address';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addressService = {
  async getAllAddresses(): Promise<Address[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/address/all`, {
      headers: { Authorization: token }
    });
    return response.data.addresses;
  },

  async createAddress(address: AddressInput): Promise<{ id: string }> {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/api/address`, address, {
      headers: { Authorization: token }
    });
    return response.data;
  },

  async updateAddress(id: string, address: AddressInput): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE_URL}/api/address/${id}`, address, {
      headers: { Authorization: token }
    });
  },

  async deleteAddress(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/api/address/${id}`, {
      headers: { Authorization: token }
    });
  },

  async setDefaultAddress(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE_URL}/api/address/${id}/default`, {}, {
      headers: { Authorization: token }
    });
  }
};

