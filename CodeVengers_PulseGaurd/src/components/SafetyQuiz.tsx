import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ShieldCheck, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

const questions = [
  {
    id: 1,
    question: "You receive a message saying you won a lottery of ₹1 Crore. It asks for a small 'processing fee'. What should you do?",
    options: [
      "Pay the fee immediately to claim the prize.",
      "Block the sender and report it as a scam.",
      "Give them your bank details but don't pay the fee.",
      "Ask your friend if they also got the message."
    ],
    correct: 1,
    explanation: "Real lotteries never ask for a 'processing fee' or 'tax' upfront. This is a classic advance-fee scam."
  },
  {
    id: 2,
    question: "A website URL looks like 'www.amozon-offers.in' instead of 'www.amazon.in'. Is it safe?",
    options: [
      "Yes, it's just a special offer site.",
      "Yes, as long as it has HTTPS (the lock icon).",
      "No, it's a typosquatting phishing site.",
      "Maybe, I should try logging in to see."
    ],
    correct: 2,
    explanation: "Scammers use slightly misspelled domains to trick you. Always check the spelling carefully!"
  },
  {
    id: 3,
    question: "Someone calls claiming to be from your bank and asks for your OTP to 'update your KYC'. What do you do?",
    options: [
      "Give them the OTP so your account isn't blocked.",
      "Ask them to call back later.",
      "Hang up and never share OTP with anyone.",
      "Give them a fake OTP to see what happens."
    ],
    correct: 2,
    explanation: "Banks NEVER ask for OTP, PIN, or passwords over the phone. KYC updates are done via official apps or branches."
  }
];

export function SafetyQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) {
      setScore(s => s + 1);
      toast.success("Correct Answer!");
    } else {
      toast.error("Incorrect. Read the explanation.");
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 glass-panel rounded-[3rem] border border-primary/20 bg-primary/5"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/30">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-3xl font-black mb-2">Quiz Completed!</h3>
        <p className="text-lg text-muted-foreground mb-6">You scored {score} out of {questions.length}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => {
            setCurrent(0);
            setScore(0);
            setCompleted(false);
            setSelected(null);
          }} className="rounded-xl gap-2">
            <RefreshCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <a href="/scanner">Go to Scanner <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </motion.div>
    );
  }

  const q = questions[current];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Question {current + 1} of {questions.length}
        </span>
        <span className="text-sm font-bold text-muted-foreground">Score: {score}</span>
      </div>

      <h3 className="text-2xl font-black leading-tight">{q.question}</h3>

      <div className="grid gap-4">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          const showCorrect = selected !== null && isCorrect;
          const showWrong = isSelected && !isCorrect;

          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
              className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                showCorrect ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' :
                showWrong ? 'border-red-500 bg-red-500/10 text-red-600' :
                isSelected ? 'border-primary bg-primary/10' :
                'border-white/5 bg-black/20 hover:border-white/20'
              }`}
            >
              {opt}
              {showCorrect && <CheckCircle2 className="h-5 w-5" />}
              {showWrong && <XCircle className="h-5 w-5" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-[2rem] bg-secondary/50 border border-white/5"
          >
            <p className="text-sm font-bold text-foreground leading-relaxed">
              <span className="text-primary uppercase tracking-widest text-[10px] block mb-1">Explanation</span>
              {q.explanation}
            </p>
            <Button onClick={nextQuestion} className="mt-6 w-full rounded-xl group">
              {current === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
