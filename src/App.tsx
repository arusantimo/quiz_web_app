import { ThemeProvider } from "@/components/theme-provider";
import { DialogProvider } from "@/components/alert-provider";
import Header from "@/components/container/Header";
import { AlertDialogComp } from "@/components/combine/Dialog";
import ContentSection from "@/components/container/Content";
import { QuizStateProvider } from "./components/quiz-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DialogProvider>
        <QuizStateProvider>
          <Header />
          <ContentSection />
        </QuizStateProvider>
        <AlertDialogComp />
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
