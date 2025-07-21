import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3001/api',

});

// API de Funcionários
export const getFuncionario = async () => {
    const response = await api.get('/funcionario/listar');
    return response.data;
};

// Cria um novo Cliente
export const createFuncionario = async (funcionario) => {
    const response = await api.post('/funcionario/criar', funcionario);
    return response.data;
};

// Atualiza um Cliente existente pelo ID
export const updateFuncionario = async (id, funcionario) => {
    const response = await api.put(`/funcionario/atualizar/${id}`, funcionario);
    return response.data;
};

// Exclui um Cliente pelo ID
export const deleteFuncionario = async (id) => {
    const response = await api.delete(`/funcionario/deletar/${id}`);
    return response.data;
};

// API de Pacientes
export const getPaciente = async () => {
    const response = await api.get('/paciente/listar');
    return response.data;
};

// Cria um novo Cliente
export const createPaciente = async (paciente) => {
    const response = await api.post('/paciente/criar', paciente);
    return response.data;
};

// Atualiza um Cliente existente pelo ID
export const updatePaciente = async (id, paciente) => {
    const response = await api.put(`/paciente/atualizar/${id}`, paciente);
    return response.data;
};

// Exclui um Cliente pelo ID
export const deletePaciente = async (id) => {
    const response = await api.delete(`/paciente/deletar/${id}`);
    return response.data;
};

export default api;