import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Explorer } from './pages/Explorer';
import { Workbench } from './pages/Workbench';
import { Recipes } from './pages/Recipes';
import { Encyclopedia } from './pages/Encyclopedia';
import { useBlend } from './hooks/useBlend';

function Navigation() {
  const { components, targetName } = useBlend();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-900">
            Flavor Explorer
          </h1>
          <nav className="flex gap-1">
            <NavLink to="/" className={navLinkClass}>
              Explorer
            </NavLink>
            <NavLink to="/workbench" className={navLinkClass}>
              Workbench
              {components.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                  {components.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/recipes" className={navLinkClass}>
              Recipes
              {targetName && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-500 text-white rounded-full">
                  !
                </span>
              )}
            </NavLink>
            <NavLink to="/encyclopedia" className={navLinkClass}>
              Encyclopedia
            </NavLink>
          </nav>
        </div>

        {/* Quick blend status */}
        {components.length > 0 && (
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{components.length}</span> compounds in blend
            {targetName && (
              <span className="ml-3">
                Matching: <span className="font-medium text-amber-600">{targetName}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-1 p-6 overflow-hidden">
          <Routes>
            <Route path="/" element={<Explorer />} />
            <Route path="/workbench" element={<Workbench />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
