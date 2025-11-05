import ButtonComponent from "../components/ButtonComponent";

function LoginPageView() {
  return (
    <div className="login-page">
      <ButtonComponent
        size="large"
        label="Register"
        onClick={() => console.log("Login button clicked!")}
      />
    </div>
  );
}

export default LoginPageView;
