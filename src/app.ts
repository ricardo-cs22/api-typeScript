import express from 'express';
import alunoRoutes from './routes/aluno.routes';
import disciplinaRoutes from './routes/disciplina.routes';
import semestreRoutes from './routes/semestre.routes';
import cors from 'cors'
const url ='http://localhost:5173/'
const app = express();
app.use(express.json());
app.use(cors());

app.use('/alunos', alunoRoutes);
app.use('/semestres', semestreRoutes);
app.use('/disciplinas', disciplinaRoutes);

export default app;
