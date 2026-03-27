import { useState } from 'react';

export default function UpdateProfileModal({ user, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: user.name,
    email: user.email,
    dddTelefone: user.dddTelefone,
    numeroTelefone: user.numeroTelefone,
    dddCelular: user.dddCelular,
    numeroCelular: user.numeroCelular,
    cep: '78050',
    siglaUF: '',
    nomeMunicipio: '',
    tipoLogradouro: '',
    logradouro: '',
    numeroLogradouro: '',
    bairro: '',
    complemento: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-update-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-update-title">Atualizar Dados Cadastrais</h2>
          <button className="modal-close-button" title="Fechar" aria-label="Fechar modal de atualização cadastral" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form id="form-atualizar-cadastro" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados Pessoais</legend>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="nome">Nome Completo:</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} maxLength="150" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cpf">CPF:</label>
                  <input type="text" id="cpf" value={user.cpf} readOnly disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} maxLength="115" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dddTelefone">DDD Tel. Fixo:</label>
                  <input type="number" id="dddTelefone" name="dddTelefone" value={formData.dddTelefone} onChange={handleChange} max="99" />
                </div>
                <div className="form-group">
                  <label htmlFor="numeroTelefone">Nº Tel. Fixo:</label>
                  <input type="number" id="numeroTelefone" name="numeroTelefone" value={formData.numeroTelefone} onChange={handleChange} max="999999999" />
                </div>
                <div className="form-group">
                  <label htmlFor="dddCelular">DDD Celular:</label>
                  <input type="number" id="dddCelular" name="dddCelular" value={formData.dddCelular} onChange={handleChange} max="99" required />
                </div>
                <div className="form-group">
                  <label htmlFor="numeroCelular">Nº Celular:</label>
                  <input type="number" id="numeroCelular" name="numeroCelular" value={formData.numeroCelular} onChange={handleChange} max="999999999" required />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Endereço</legend>
              <div className="form-row">
                <div className="form-group cep">
                  <label htmlFor="cep">CEP:</label>
                  <input type="number" id="cep" name="cep" value={formData.cep} onChange={handleChange} max="99999999" required />
                  <button type="button" className="button primary small outlined" aria-label="Buscar endereço pelo CEP">Buscar</button>
                </div>
                <div className="form-group uf">
                  <label htmlFor="siglaUF">UF:</label>
                  <input type="text" id="siglaUF" name="siglaUF" value={formData.siglaUF} maxLength="2" required readOnly />
                </div>
                <div className="form-group municipio">
                  <label htmlFor="nomeMunicipio">Município:</label>
                  <input type="text" id="nomeMunicipio" name="nomeMunicipio" value={formData.nomeMunicipio} maxLength="60" required readOnly />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="tipoLogradouro">Tipo Logradouro:</label>
                  <input type="text" id="tipoLogradouro" name="tipoLogradouro" value={formData.tipoLogradouro} onChange={handleChange} maxLength="26" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group logradouro">
                  <label htmlFor="logradouro">Logradouro:</label>
                  <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} maxLength="80" required />
                </div>
                <div className="form-group numero">
                  <label htmlFor="numeroLogradouro">Número:</label>
                  <input type="text" id="numeroLogradouro" name="numeroLogradouro" value={formData.numeroLogradouro} onChange={handleChange} maxLength="7" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group bairro">
                  <label htmlFor="bairro">Bairro:</label>
                  <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} maxLength="60" required />
                </div>
                <div className="form-group complemento">
                  <label htmlFor="complemento">Complemento:</label>
                  <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} maxLength="150" />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="button secondary outlined" onClick={onClose}>Cancelar</button>
          <button type="submit" form="form-atualizar-cadastro" className="button primary">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}
