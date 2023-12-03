import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Component/NavBar";
import { Box, Stack } from "@mui/material";
import Home from "./Pages/Home";
import StudentDetails from "./Pages/StudentDetails";
import SideBar from "./Component/SideBar";
import RightBar from "./Component/RightBar";
// import Search from "./Pages/Search";
import Create from "./Pages/Create";
import View from "./Pages/View";
import About from "./Pages/About";
import Update from "./Pages/Update";
import SearchD from "./Pages/SearchD";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <NavBar />
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
          <SideBar />

          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/search" exact element={<SearchD />}></Route>
            <Route path="/create" exact element={<Create />}></Route>
            <Route path="/students" exact element={<StudentDetails />}></Route>
            <Route path="/about" exact element={<About />}></Route>
            <Route path="/update/:id" exact element={<Update />}></Route>
            <Route path="/view/:id" exact element={<View />}></Route>
          </Routes>
          <RightBar />
        </Stack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
