import ButtonComponent from "../components/ButtonComponent";

function SignupPageView() {
  return (
    <div className="signup-page">
      <ButtonComponent
        size="large"
        label="Sign Up"
        onClick={() => console.log("Signup button clicked!")}
      />
    </div>
  );
}

export default SignupPageView;
