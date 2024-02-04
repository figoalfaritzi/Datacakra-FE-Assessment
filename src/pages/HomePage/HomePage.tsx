import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Datacakra FE Assessment
      </h1>
      <div>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
};

export default HomePage;
