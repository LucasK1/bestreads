import AuthForm from "components/AuthForm/AuthForm";
import Book from "components/Book/Book";
import Logout from "components/Logout/Logout";
import MainPage from "components/MainPage/MainPage";
import Shelf from "components/Shelf/Shelf";
import NavBar from "components/UI/NavBar/NavBar";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authCheckState } from "store/reducers/authReducer";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="main-container">
        <NavBar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/shelf" exact component={Shelf} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/signup" component={AuthForm} />
          <Route path="/book/:id" exact component={Book} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
