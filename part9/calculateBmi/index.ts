import express from "express";
import { bmiVerdict, calculateBmi } from "./calculateBmi";

const app = express();

app.get('/hello',(_req,res)=> {
  res.send('Hello Full Stack!');
})

app.get('/bmi',(req,res)=> {
  const {height, weight} = req.query;
  if (isNaN(Number(height)) && isNaN(Number(weight))) {
    res.send({error:"malformatted parameter"}).status(400)
  } else {
    const bmi = calculateBmi(Number(height),Number(weight));
    const bmiResult = bmiVerdict(bmi)
    res.send({height,weight,bmi:bmiResult});
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})