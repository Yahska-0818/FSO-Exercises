interface bmiDimensions {
  height: number;
  weight: number;
}

const underweight: number = 18.5;
const normal: number = 25.0;
const overweight: number = 30;

const calculateBmi = (height: number, weight: number): number => {
  const bmi = weight/((height/100)*(height/100));
  return(bmi);
}

const parseArgs = (args:string[]):bmiDimensions => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const {height,weight} = parseArgs(process.argv);
  const bmi = calculateBmi(height,weight);
  if (bmi < underweight) {
    console.log("Underweight range");
  } else if (bmi >= underweight && bmi < normal) {
    console.log("Normal range");
  } else if (bmi >= normal && bmi < overweight) {
    console.log("Overweight range");
  } else {
    console.log("Obese range")
  }
} catch (error:unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}