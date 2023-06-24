import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Form from "./components/Form"
import Table1 from "./components/Table1"
function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/" element={<Navigate replace to="/login" />} />
<Route path="/form" exact element={<Form/>}/>
<Route path="/table1" exact element={<Table1/>}/>
</Routes>
)
}
export default App