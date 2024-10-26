import Navbar from "./components/Navbar";
import {useState,useRef,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todos, setTodos] = useState([]);
  const [todoinp,setTodoinp] = useState("");
  const editModeOn = useRef(false);
  const editId = useRef(-1);
  const [showAll, setshowAll] = useState(false);


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString!=null && todoString.length>2){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  
  useEffect(() => {
    saveTodos()
  }, [todos])
  
  

  const saveTodos = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  function onStatusChange(e){
    let ind = todos.findIndex((todo)=>{
      return todo.id===e.target.id;
    })
    let newTodos = [...todos];
    newTodos[ind].isCompleted = !newTodos[ind].isCompleted;
    setTodos(newTodos)
    saveTodos()
  }

  function addTodo(e){
    if(e.target.innerHTML=="Add"){
      todos.push({id:uuidv4(),todo:todoinp,isCompleted:false})
      setTodos(todos)
      setTodoinp("")
    }
    else if(e.target.innerHTML=="Save"){
      let newTodos = [...todos];
      let ind = todos.findIndex((todo)=>{
        return todo.id===editId.current;
      })
      newTodos[ind].todo = todoinp;
      editModeOn.current = false;
      editId.current = -1;
      setTodos(newTodos);
      setTodoinp("")
    }
    saveTodos()
  }

  function deleteTodo(id){
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
  }

  function editTodo(id){
    editModeOn.current = true;
    let todo = todos.filter(item=>{
      return item.id===id;
    })
    editId.current = id;
    setTodoinp(todo[0].todo);
  }

  function showAllitems(){
    setshowAll(!showAll)
  }
  return (
    <>
      <Navbar />
      <div className="container border m-auto rounded-md bg-purple-200 p-5 mb-2">
        <h3 className="bg-purple-400 text-center text-2xl font-bold rounded-md">Todos</h3>
        <div className="addTodo bg-purple-400 rounded-md flex my-2 p-2 justify-between items-center">
          <input className="todoDetails w-1/2 rounded-md p-2 text-lg" type="text" name="todo" id="todo" value={todoinp} onChange={e=>{
            setTodoinp(e.target.value)
          }}/>
          <button className="bg-purple-800 m-1 px-10 py-3 text-white rounded-md" onClick={addTodo}>{editModeOn.current?"Save":"Add"}</button>
        </div>
        <div className="h-5 ml-5 flex gap-5 items-center">
        <input type="checkbox" className="w-5 h-5" onChange={showAllitems} checked={showAll}/> 
        <p className="text-xl">Show Finished todos</p>
        </div>
      </div>
      <div className="container bg-purple-200 rounded-md m-auto h-[calc(100vh-270px)] overflow-auto p-5 todos ">
          {todos.length===0 && <div className="text-xl font-bold m-10">No todos to Display</div>}
          {todos.length!==0 && todos.map(todo=>{
            return(showAll || !todo.isCompleted)&& <div key={todo.id} className="todo bg-purple-400 flex justify-between p-5 rounded-md mb-2">
              <div className="flex gap-5 justify-center">
              <input className="w-5" type="checkbox" name="complete" id={todo.id} checked={todo.isCompleted} onChange={onStatusChange}/>
            {todo.isCompleted?<p className="text-lg line-through break-all pr-10">{todo.todo}</p>:<p className="text-lg break-all pr-10">{todo.todo}</p>}
            </div>
            <div className="buttons flex gap-5">
              <button className="text-xl" onClick={()=>editTodo(todo.id)}><FaEdit /></button>
              <button className="text-xl" onClick={()=>deleteTodo(todo.id)}><MdDelete /></button>
            </div>
          </div>
          })}
      </div>
    </>
  );
}

export default App;
