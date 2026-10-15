function App() {
  return (
    <Routes>
      
      <Route path="/Login" element={<Login />} />

      
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/User" element={<User />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}

export default App;


