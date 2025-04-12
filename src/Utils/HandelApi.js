import axios from "axios";

const API_BASE = "https://todoappserver-mu.vercel.app"; // ✅ Correct base URL
const getTodo = (setTodo, setLoading) => {
  setLoading(true); // Show loading
  axios.get(API_BASE)
    .then(({ data }) => {
      setTodo(Array.isArray(data) ? data : []);
      setLoading(false); // Hide loading after data is fetched
    })
    .catch((err) => {
      console.error("Error fetching todos:", err);
      setTodo([]); // Fallback to empty array on error
      setLoading(false); // Hide loading on error
    });
};
const addTodo = (text, setText, setTodo, setLoading) => {
  setLoading(true); // Show loading while adding
  axios.post(`${API_BASE}/save`, { text })
    .then(() => {
      getTodo(setTodo, setLoading); // Refresh the todo list
    })
    .catch((err) => console.error("Add error:", err))
    .finally(() => setLoading(false)); // Hide loading once done
  setText(""); // Clear input
};


const updataTodo = (todoid, text, setTodo, setText, setIsUpdateing,setLoading) => {
  setLoading(true); 
    axios
      .put(`${API_BASE}/update/${todoid}`, { _id: todoid, text })
      .then((response) => {
        console.log("Updated Todo:", response.data); // Log the updated todo data
        setText(""); // Clear the input
        setIsUpdateing(false); // Reset updating state
        getTodo(setTodo, setLoading);// Re-fetch todos after update
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
};





  const deleteTodo = (_id, setTodo,setLoading) => {
    setLoading(true); 
    axios
      .delete(`${API_BASE}/delete/${_id}`)
      .then(() => {
        getTodo(setTodo, setLoading); // setTodo pass karna zaroori hai
        console.log("Todo deleted successfully");
      })
      .catch((error) => console.error("Delete error:", error));
  };
  

export { getTodo, addTodo ,deleteTodo,updataTodo};
