import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3001/api',

});


export const getConsulta = async () => {
    const response = await api.get('/consulta/listar');
    return response.data;
};


export const createConsulta = async (consulta) => {
    const response = await api.post('/consulta/criar', consulta);
    return response.data;
};


export const updateConsulta = async (id, consulta) => {
    const response = await api.put(`/consulta/atualizar/${id}`, consulta);
    return response.data;
};


export const deleteConsulta = async (id) => {
    const response = await api.delete(`/consulta/deletar/${id}`);
    return response.data;
};