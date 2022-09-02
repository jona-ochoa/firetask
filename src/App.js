import { app, messaging } from "./firebase";
import { useState, createContext } from "react";
import Header from "./components/Header";
import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import Shopping from "./components/routes/Shopping";
import Register from "./components/routes/Register";
import { Toaster, toast } from "react-hot-toast";
import { onMessage } from "firebase/messaging";
import Footer from "./components/Footer";
import TaskList from "./components/routes/TaskList";

export const AppContext = createContext(null);

onMessage(messaging, (payload) => {
  console.log("Nueva notificacion en directo", payload);
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="bg-sky-300 p-4 rounded-lg shadow-lg">
        <h1 className="text-lg text-sky-700 font-semibold">
          {payload.notification.title}
        </h1>
        <p className="text-sm text-white font-bold">
          {payload.notification.body}
        </p>
      </div>
    </div>
  ));
});

function App() {
  const [route, setRoute] = useState("home");
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ route, setRoute, user, setUser }}>
      <div className="h-screen">
        <Toaster />
        <Header />
        <main className="px-6 py-24">
          {route === "home" && <Home />}
          {route === "login" && <Login />}
          {route === "register" && <Register />}
          {route === "shopping" && <Shopping />}
          {route === "tasklist" && <TaskList />}
          {/* {user && <p>Usuario Loguado: {user.email}</p>} */}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
