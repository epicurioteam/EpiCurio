import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LabItemForm from "./components/Form/LabItemForm.js";
import NavBar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AuthWrapper from "./components/Auth/Auth"; // AuthWrapper
import CategoryForm from "./components/Form/CategoryForm.js";
import ItemDetails from "./components/Items/ItemDetails/ItemDetails.js";

// what lies in curly braces are JavaScript functions. They can be used the same as HTML mark-up components

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<AuthWrapper />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<LabItemForm />} />
          <Route path="/admin" element={<CategoryForm />} />
          <Route path="/item/:id" element={<ItemDetails />} />{" "}
          {/* Add a new route for item details */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
