import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBoyq3AcTGP5bgeEIXjRIPKpbMZRhX-ZRI");

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hello");
        console.log(result.response.text());
    } catch (err) {
        console.error(err);
    }
}
run();
