import { useAuth } from "@/context/useAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { verifyemail } = useAuth();

  useEffect(() => {
    console.log(token);
    if (token && token.length > 0) {
      verifyemail(token);
    }
    setTimeout(() => {
      navigate("/signin");
    }, 5000);
  }, []);

  if (token) {
    return (
      <div>
        <div>
          <h1>You are verified</h1>
          <h4>Redirecting to Login</h4>
        </div>
      </div>
    );
  } else {
    <div>
      <div>
        <h1>Token Not Found</h1>
      </div>
    </div>;
  }
};

export default VerifyEmail;
