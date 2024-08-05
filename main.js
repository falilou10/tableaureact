class App extends React.Component {
  state = {
    etudiants: [],
    idEtudiantAModifier: null,
    etudiantAModifier: null
  };

  ajouterEtudiant = (etudiant) => {
    etudiant.id = this.state.etudiants.length + 1;
    this.setState({
      etudiants: [...this.state.etudiants, etudiant],
      idEtudiantAModifier: null,
      etudiantAModifier: null,
    });
  };

  modifierEtudiant = (etudiant) => {
    this.setState({
      idEtudiantAModifier: etudiant.id,
      etudiantAModifier: etudiant
    });
  };

  mettreAJourEtudiant = (etudiantMisAJour) => {
    this.setState((champs) => ({
      etudiants: champs.etudiants.map(etudiant =>
        etudiant.id === etudiantMisAJour.id ? etudiantMisAJour : etudiant
      ),
      idEtudiantAModifier: null,
      etudiantAModifier: null
    }));
  };

  supprimerEtudiant = (id) => {
    this.setState((champs) => ({
      etudiants: champs.etudiants.filter(etudiant => etudiant.id !== id)
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="text-center mb-4">Gestion des étudiants</h1>
        <AjouterEtudiantForm
          ajouterEtudiant={this.ajouterEtudiant}
          etudiantAModifier={this.state.etudiantAModifier}
          mettreAJourEtudiant={this.mettreAJourEtudiant}
        />
        <TableEtudiants
          etudiants={this.state.etudiants}
          modifierEtudiant={this.modifierEtudiant}
          supprimerEtudiant={this.supprimerEtudiant}
        />
      </div>
    );
  }
}

class AjouterEtudiantForm extends React.Component {
  state = {
    prenom: '',
    nom: '',
    email: '',
    telephone: ''
  };

  composEtud(prevProps) {
    if (this.props.etudiantAModifier !== prevProps.etudiantAModifier) {
      const { prenom, nom, email, telephone } = this.props.etudiantAModifier || {};
      this.setState({
        prenom: prenom || '',
        nom: nom || '',
        email: email || '',
        telephone: telephone || ''
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { prenom, nom, email, telephone } = this.state;
    if (prenom && nom && email && telephone) {
      if (this.props.etudiantAModifier) {
        this.props.mettreAJourEtudiant({ ...this.props.etudiantAModifier, prenom, nom, email, telephone });
      } else {
        this.props.ajouterEtudiant(this.state);
      }
      this.setState({ prenom: '', nom: '', email: '', telephone: '' });
    } else {
      alert('Les champs sont incomplets');
    }
  };

  render() {
    return (
      <div className="formulaire">
        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="text" id="prenom" className="form-control" onChange={this.handleChange} value={this.state.prenom} placeholder="Prénom" />
            </div>
            <div className="form-group col-md-6">
              <input type="text" id="nom" className="form-control" onChange={this.handleChange} value={this.state.nom} placeholder="Nom" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="email" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} placeholder="Email" />
            </div>
            <div className="form-group col-md-6">
              <input type="tel" id="telephone" className="form-control" onChange={this.handleChange} value={this.state.telephone} placeholder="Téléphone" />
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            {this.props.etudiantAModifier ? 'Modifier étudiant' : 'Ajouter'}
          </button>
        </form>
      </div>
    );
  }
}

const TableEtudiants = ({ etudiants, modifierEtudiant, supprimerEtudiant }) => {
  return (
    <div>
      <h2 className="mt-4 text-center">Utilisateurs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(etudiant => (
            <tr key={etudiant.id}>
              <td>{etudiant.prenom}</td>
              <td>{etudiant.nom}</td>
              <td>{etudiant.email}</td>
              <td>{etudiant.telephone}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => modifierEtudiant(etudiant)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => supprimerEtudiant(etudiant.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
