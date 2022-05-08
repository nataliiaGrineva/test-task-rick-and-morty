import { Route, Routes, Navigate } from "react-router-dom";
import FavoritesScreen from "../screens/FavoritesScreen";
import ItemScreen from "../screens/ItemScreen";
import ListScreen from "../screens/ListScreen";

function MainRouter() {
  return (
    <Routes>
      <Route path="/characters" element={<ListScreen />} />
      <Route path="/characters/:id" element={<ItemScreen />} />
      <Route path="/favorites" element={<FavoritesScreen />} />
      <Route path="/" element={<Navigate to="/characters" replace />} />
    </Routes>
  );
}

export default MainRouter;
