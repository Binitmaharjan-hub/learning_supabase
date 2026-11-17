
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {

  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Get students from Supabase
  async function getStudents() {

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.log(error.message)
      return
    }

    setStudents(data)
  }

  // Add a student
  async function addStudent(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('students')
      .insert([
        { name: name, email: email }
      ])

    if (error) {
      alert(error.message)
      return
    }

    setName('')
    setEmail('')

    getStudents()
  }

  // Delete a student
  async function deleteStudent(id) {

    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    getStudents()
  }

  // Load students when page opens
  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className="container">

      <h1>Student Management</h1>

      <form onSubmit={addStudent}>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Add Student
        </button>

      </form>

      <h2>Student List</h2>

      {students.map((student) => (

        <div className="student" key={student.id}>

          <div>
            <strong>{student.name}</strong>
            <p>{student.email}</p>
          </div>

          <button
            onClick={() => deleteStudent(student.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  )
}

export default App
