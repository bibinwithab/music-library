import Register from "./components/Register";

export default function App() {
  return (
    <>
      <h1 className="flex flex-col items-center justify-center italic  text-2xl">
        Hello world!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl">Welcome to your new app!</p>
        <p className="text-xl">Get started by editing this file.</p>
        <Register />
      </div>
    </>
  );
}
