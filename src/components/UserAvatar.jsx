const UserAvatar = () => {
    const name = localStorage.getItem('userName');
    
  
    if (!name) return null;
  
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}>Cerrar sesión</button>
      
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginRight: '1rem'
      }}>
        <div style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {initials}
        </div>
        <span>Hola, {name.split(' ')[0]}</span>
      </div>
     
    );
  };
  
  export default UserAvatar;
  