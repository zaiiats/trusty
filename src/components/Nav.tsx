import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

function Nav() {
  const {role, loading} = useAuth();
  
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <NavLink to={'/'}>Головна</NavLink>
      {role === 'guest' && <NavLink to={'/Login'}>Login</NavLink>}
    </div>
  )
}

export default Nav
