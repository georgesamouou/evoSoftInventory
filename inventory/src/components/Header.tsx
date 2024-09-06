import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next';
export default function Header() {
    const [language, setLanguage] = useState('en');
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };
  return (
    <header className="bg-primary text-white py-3">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-md-6">
                <h1 className="mb-0">Stock Management</h1>
            </div>
            <div className="col-md-6 text-md-right">
                <nav className="navbar navbar-expand-md navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                    </li>
                    <li>
                    <select className="form-select" value={i18n.language} onChange={handleLanguageChange}>
                        <option value="en">En</option>
                        <option value="fr">Fr</option>
                    </select>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>
            </div>
        </div>
    </header>

  )
}
