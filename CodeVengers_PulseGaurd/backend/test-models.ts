import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI('AIzaSyBoyq3AcTGP5bgeEIXjRIPKpbMZRhX-ZRI');

async function testModel(name: string) {
  try {
    const model = genAI.getGenerativeModel({ model: name });
    await model.generateContent('hi');
    console.log(name + ' works');
  } catch (err: any) {
    console.log(name + ' failed: ' + err.status + ' | ' + err.message);
  }
}

async function run() {
  await testModel('gemini-1.5-flash');
  await testModel('gemini-1.5-pro');
  await testModel('gemini-pro');
  await testModel('gemini-2.0-flash-lite');
  await testModel('gemini-2.5-flash');
}
run();
