import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Doctors from './pages/Doctors';
import Users from './pages/admin/Users';
import Profile from './pages/doctor/Profile';
import BookApointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorsAdmin from './pages/admin/DoctorsAdmin';
import DoctorAppointment from './pages/doctor/DoctorAppointment';
import AdminHomePage from './pages/admin/AdminHomePage';
import Scheduler from './pages/doctor/Scheduler';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
          <Route path='/admin/homepage' element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>} />
          <Route path='/doctor/schedule' element={
            <ProtectedRoute>
              <Scheduler />
            </ProtectedRoute>} />
          <Route path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path='/notification' element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          } />
          <Route path='/doctors' element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } />
          <Route path='/admin/doctors' element={
            <ProtectedRoute>
              <DoctorsAdmin />
            </ProtectedRoute>
          } />
          <Route path='/admin/users' element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path='/doctor/profile/:id' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/doctor-appointments' element={
            <ProtectedRoute>
              <DoctorAppointment />
            </ProtectedRoute>
          } />


          <Route path='/doctor/book-appointment/:doctorId' element={
            <ProtectedRoute>
              <BookApointment />
            </ProtectedRoute>
          } />

          <Route path='/appointments' element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
