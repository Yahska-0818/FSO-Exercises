const underweight: number = 18.5;
const normal: number = 25.0;
const overweight: number = 30;

const calculateBmi = (height: number, weight: number): number => {
  const bmi = weight/((height/100)*(height/100));
  return(bmi);
}

const bmi = calculateBmi(180,74);

if (bmi < underweight) {
  console.log("Underweight range");
} else if (bmi >= underweight || bmi < normal) {
  console.log("Normal range");
} else if (bmi >= normal || bmi < overweight) {
  console.log("Overweight range");
} else {
  console.log("Obese range")
}