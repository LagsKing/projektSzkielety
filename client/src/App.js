import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Form from "./components/Form"
import Table1 from "./components/Table1"
import UserDetails from "./components/UserDetails"
import EditUser from "./components/EditUser"
import Table2 from "./components/Table2"
import HobbyDetails from "./components/HobbyDetails"
import EditHobby from "./components/EditHobby"
function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/" element={<Navigate replace to="/login" />} />
<Route path="/form/" exact element={<Form/>}/>
<Route path="/table1/*" exact element={<Table1/>}/>
<Route path="/table1/details/:userId" element={<UserDetails />} />
<Route path="/table1/edit/:userId" element={<EditUser />} />
<Route path="/hobbies/*" exact element={<Table2/>}/>
<Route path="/hobbies/details/:hobbyId" element={<HobbyDetails />} />
<Route path="/hobbies/edit/:hobbyId" element={<EditHobby />} />
</Routes>
)
}
export default App