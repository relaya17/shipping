import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Display,
  Check
} from 'react-bootstrap-icons';

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={16} />;
      case 'dark':
        return <Moon size={16} />;
      case 'auto':
        return <Display size={16} />;
      default:
        return <Display size={16} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Auto';
      default:
        return 'Auto';
    }
  };

  return (
    <Dropdown align="end" className="theme-toggle">
      <Dropdown.Toggle
        variant="outline-secondary"
        id="theme-dropdown"
        className="d-flex align-items-center gap-2 border-0 p-2 theme-toggle-btn"
      >
        {getThemeIcon()}
        <span className="d-none d-lg-inline">{getThemeLabel()}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-lg border-0 p-2" style={{ minWidth: '160px' }}>
        <Dropdown.Item
          onClick={() => setTheme('light')}
          className={`d-flex align-items-center gap-3 py-2 rounded ${theme === 'light' ? 'active' : ''}`}
        >
          <Sun size={16} />
          <span>Light</span>
          {theme === 'light' && <Check size={16} className="ms-auto text-primary" />}
        </Dropdown.Item>
        
        <Dropdown.Item
          onClick={() => setTheme('dark')}
          className={`d-flex align-items-center gap-3 py-2 rounded ${theme === 'dark' ? 'active' : ''}`}
        >
          <Moon size={16} />
          <span>Dark</span>
          {theme === 'dark' && <Check size={16} className="ms-auto text-primary" />}
        </Dropdown.Item>
        
        <Dropdown.Item
          onClick={() => setTheme('auto')}
          className={`d-flex align-items-center gap-3 py-2 rounded ${theme === 'auto' ? 'active' : ''}`}
        >
          <Display size={16} />
          <span>System</span>
          {theme === 'auto' && <Check size={16} className="ms-auto text-primary" />}
        </Dropdown.Item>
      </Dropdown.Menu>

      <style>{`
        .theme-toggle-btn {
          background: var(--bs-body-bg) !important;
          border: 1px solid var(--bs-border-color) !important;
          color: var(--bs-body-color) !important;
          transition: all 0.3s ease !important;
        }
        
        .theme-toggle-btn:hover,
        .theme-toggle-btn:focus {
          background: var(--bs-secondary-bg) !important;
          border-color: var(--bs-border-color-translucent) !important;
          transform: scale(1.05);
        }
        
        .theme-toggle .dropdown-menu {
          background: var(--bs-body-bg) !important;
          border: 1px solid var(--bs-border-color) !important;
        }
        
        .theme-toggle .dropdown-item {
          color: var(--bs-body-color) !important;
          transition: all 0.2s ease !important;
        }
        
        .theme-toggle .dropdown-item:hover {
          background: var(--bs-secondary-bg) !important;
          transform: translateX(5px);
        }
        
        .theme-toggle .dropdown-item.active {
          background: var(--bs-primary-bg-subtle) !important;
          color: var(--bs-primary) !important;
        }
      `}</style>
    </Dropdown>
  );
};

export default ThemeToggle;
