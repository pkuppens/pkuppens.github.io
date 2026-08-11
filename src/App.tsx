import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import TrainingsPage from './pages/trainings/TrainingsPage'
import EvaluatorPage from './pages/evaluator/EvaluatorPage'
import LinkedInEditorPage from './pages/linkedin-editor/LinkedInEditorPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="trainings" element={<TrainingsPage />} />
          <Route path="evaluator" element={<EvaluatorPage />} />
          {/* Unlinked from nav — maintenance tool, see #90, #97 / scripts/linkedin/README.md */}
          <Route path="linkedin-editor" element={<LinkedInEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
