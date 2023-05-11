import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', ( req: Request, res: Response ) => {
    res.send('Pong!')
})

app.get('/courses', ( req: Request, res: Response ) => {
    res.status(200).send(courses);
})

app.get('/courses/search', ( req: Request, res: Response ) => {

    const nome = req.query.q as string
    
    const result = courses.filter((course) => {
        return course.name.toLowerCase().includes(nome.toLowerCase())
    })

    res.status(200).send(result)
})

app.post('/courses', ( req: Request, res: Response ) => {

    const {id, name, lessons, stack} = req.body;

    const newCourse: TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse);

    res.status(201).send('Cadastrado');
})

app.get('/students', ( req: Request, res: Response ) => {
    res.status(200).send(students)
})

app.get('/students/search', ( req: Request, res: Response ) => {

    const stud = req.query.stud as string
    
    const result2 = students.filter((student) => {
        return student.name.toLowerCase().includes(stud.toLowerCase())
    })

    res.status(200).send(result2)
})

app.post('/students', ( req: Request, res: Response ) => {

    const {id, name, age} = req.body;

    const newStudent: TStudent = {
        id,
        name,
        age
    }

    students.push(newStudent);

    res.status(201).send('Estudante cadastrado');
})